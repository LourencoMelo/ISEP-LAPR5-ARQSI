import { ITruckPersistence } from '../../dataschema/ITruckPersistence';
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema(
    {
        domainId: {type:String,unique : true},
        designation: {type:String,unique : true},
        tara: {type:Number,unique : false},
        cargoCapacity: {type:Number,unique : false},
        maxBattery: {type:Number,unique : false},
        autonomy: {type:Number,unique : false},
        chargingTime: {type:Number,unique : false},
        active: {type:Boolean,unique : false},
    },
    { timestamps: true },
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);
