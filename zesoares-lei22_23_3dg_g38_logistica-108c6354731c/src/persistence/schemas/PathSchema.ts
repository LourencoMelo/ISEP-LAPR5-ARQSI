import mongoose from "mongoose";
import { IPathPersistence } from "../../dataschema/IPathPersistence";

const PathSchema = new mongoose.Schema(

    {
        domainId :{
            type : String,
            unique : false
        },

        id_warehouse1 : {
            type : String,
            unique : false
        },
        id_warehouse2 : {
            type : String,
            unique : false
        },
        distance : {
            type : Number,
            unique : false
        },
        path_time : {
            type : Number,
            unique : false
        },
        energy : {
            type : Number,
            unique : false
        },
        extra_time : {
            type : Number,
            unique : false
        },
    },  
    {
    timestamps : true
    }

);

export default mongoose.model<IPathPersistence & mongoose.Document>('Path', PathSchema);

