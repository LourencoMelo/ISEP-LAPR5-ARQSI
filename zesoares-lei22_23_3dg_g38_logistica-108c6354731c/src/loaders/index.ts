import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';;

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const PathSchema = {
    name: 'PathSchema',
    schema: '../persistence/schemas/PathSchema'
  }

  const truckSchema = {
    name: 'truckSchema',
    schema: '../persistence/schemas/truckSchema'
  }

  const RoleSchema = {
    name: 'RoleSchema',
    schema: '../persistence/schemas/RoleSchema'
  }

  const UserSchema = {
    name: 'UserSchema',
    schema: '../persistence/schemas/UserSchema'
  }

  const PlanningSchema = {
    name : 'PlanningSchema',
    schema: '../persistence/schemas/PlanningSchema'
  } 

  const pathController = {
    name : config.controllers.path.name,
    path : config.controllers.path.path
  }

  const truckController = {
    name : config.controllers.truck.name,
    path : config.controllers.truck.path
  }

  const planningController = {
    name : config.controllers.planning.name,
    path : config.controllers.planning.path
  }

  const roleController = {
    name : config.controllers.role.name,
    path : config.controllers.role.path
  }

  const userController = {
    name : config.controllers.user.name,
    path : config.controllers.user.path
  }

  const pathRepo = {
    name : config.repos.path.name,
    path : config.repos.path.path
  }

  const truckRepo = {
    name : config.repos.truck.name,
    path : config.repos.truck.path
  }

  const roleRepo = {
    name : config.repos.role.name,
    path : config.repos.role.path
  }

  const userRepo = {
    name : config.repos.user.name,
    path : config.repos.user.path
  }

  const planningRepo = {
    name : config.repos.planning.name,
    path : config.repos.planning.path
  }

  const pathService = {
    name : config.services.path.name,
    path : config.services.path.path
  }

  const truckService = {
    name : config.services.truck.name,
    path : config.services.truck.path
  }

  const planningService = {
    name : config.services.planning.name,
    path : config.services.planning.path
  }

  const roleService = {
    name : config.services.role.name,
    path : config.services.role.path
  }

  const userService = {
    name : config.services.user.name,
    path : config.services.user.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      PathSchema,
      truckSchema,
      RoleSchema,
      UserSchema,
      PlanningSchema
    ],
    controllers: [
      pathController,
      truckController,
      planningController,
      roleController,
      userController
    ],
    repos: [
      pathRepo,
      truckRepo,
      roleRepo,
      userRepo,
      planningRepo
    ],
    services: [
      pathService,
      truckService,
      planningService,
      roleService,
      userService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
