import { IPlanningPersistence } from '../../dataschema/IPlanningPersistence';
import mongoose from 'mongoose';

const PlanningSchema = new mongoose.Schema(
    {
        domainId: {type:String,unique : true},
        idCamiao: {type:String,unique : false},
        entregas: { type: [String], unique: true },
        caminho: { type: [String], unique: false },
        tempo: {type:Number,unique : false},
    },
    {timestamps : true },
);

export default mongoose.model<IPlanningPersistence & mongoose.Document>('Planning',PlanningSchema);

  