import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * Url of Planning Module
   */
  planningURL: process.env.planningURL || "http://localhost:8000",

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb+srv://admin:Pinguins1@cluster0.1c3bjmr.mongodb.net/test?retryWrites=true&w=majority",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    path: {
      name: "PathController",
      path: "../controllers/PathController"
    },
    truck: {
      name: "TruckController",
      path: "../controllers/TruckController"
    },
    planning: {
      name: "PlanningController",
      path: "../controllers/PlanningController"
    },
    role: {
      name: "RoleController",
      path: "../controllers/RoleController"
    },
    user: {
      name: "UserController",
      path: "../controllers/UserController"
    }

  },

  repos: {
    path: {
      name: "PathRepo",
      path: "../repos/PathRepo"
    },
    truck: {
      name: "TruckRepo",
      path: "../repos/truckRepo"
    },
    role: {
      name: "RoleRepo",
      path: "../repos/RoleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/UserRepo"
    },
    planning: {
      name: "PlanningRepo",
      path: "../repos/PlanningRepo"
    }
  },

  services: {
    path: {
      name: "PathService",
      path: "../services/PathService"
    },
    truck: {
      name: "TruckService",
      path: "../services/TruckService"
    },
    planning: {
      name: "PlanningService",
      path: "../services/PlanningService"
    },
    role: {
      name: "RoleService",
      path: "../services/RoleService"
    },
    user: {
      name: "UserService",
      path: "../services/UserService"
    }
  },
};
