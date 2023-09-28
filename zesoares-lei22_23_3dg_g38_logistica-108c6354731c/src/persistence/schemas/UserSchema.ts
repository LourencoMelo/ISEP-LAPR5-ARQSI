import { IUserPersistence } from '../../dataschema/IUserPersistence';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        domainId: {type:String,unique : true},
        firstName: {type:String,unique : false},
        lastName: {type:String,unique : false},
        userName: {type:String,unique : true},
        phoneNumber: {type:Number,unique : false},
        email: {type:String,unique : true},
        password: {type:String,unique : false}, 
        role: {type:String,unique : false},
        active: {type:Boolean,unique : false},
    },
    { timestamps: true },
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', UserSchema);