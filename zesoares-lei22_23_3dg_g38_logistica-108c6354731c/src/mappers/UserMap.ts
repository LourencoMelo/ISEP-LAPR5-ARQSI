import { Mapper } from "../core/infra/Mapper";
import { IUserDTO } from "../dto/IUserDTO";
import { Document, Model } from 'mongoose';
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { User } from "../domain/user/User";
import { IUserPersistence } from "../dataschema/IUserPersistence";

export class UserMap extends Mapper<User> {

    public static toDTO(user: User): IUserDTO {
        return {
            domainId: user.id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            phoneNumber: user.phoneNumber.value,
            email: user.email.value,
            password: user.password.value,
            role: user.role,
            active: user.active
        } as IUserDTO;
    }

    public static toDomain (user: any | Model<IUserPersistence & Document> ): User {

        //Creates user object with received data and saves it in userOrError constant
        const userOrError = User.create(
          user,
          new UniqueEntityID(user.domainId),
        );

        userOrError.getValue().active = user.active;
        
        //Verifies if constant defined above was succeded or else prints a console error with the error
        userOrError.isFailure ? console.log(userOrError.error) : '';
            
    //Returns the user value if the creation was succeeded. Otherwise returns null object
        return userOrError.isSuccess ? userOrError.getValue() : null;
    }

    public static toPersistence (user: User): any {
        return {
            domainId: user.id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            phoneNumber: user.phoneNumber.value,
            email: user.email.value,
            password: user.password.value,
            role: user.role,
            active: user.active
        }
    }

}