import { Service, Inject } from "typedi";
import { IUserPersistence } from "../dataschema/IUserPersistence";
import { Document, FilterQuery, Model } from 'mongoose';
import { User } from "../domain/user/User";
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { UserMap } from "../mappers/UserMap";
import IUserRepo from "../services/IRepos/IUserRepo";

@Service()
export default class userRepo implements IUserRepo {
    private models: any;

    constructor(
        @Inject('UserSchema') private userSchema: Model<IUserPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(user: User): Promise<boolean> {
        const idX = user.id instanceof UniqueEntityID ? (<UniqueEntityID>user.id).toValue() : user.id;

        const query = { domainId: idX };

        const userDocument = await this.userSchema.findOne(query as FilterQuery<IUserPersistence & Document>);

        return !!userDocument === true;
    }


    public async save(user: User): Promise<User> {
        const query = { domainId: user.id.toString() };

        const userDocument = await this.userSchema.findOne(query);

        try {
            if (userDocument === null) {
                const rawUser: any = UserMap.toPersistence(user);

                const userCreated = await this.userSchema.create(rawUser);

                return UserMap.toDomain(userCreated);
            } else {
                userDocument.firstName = user.firstName;
                userDocument.lastName = user.lastName;
                userDocument.userName = user.userName;
                userDocument.phoneNumber = user.phoneNumber.value;
                userDocument.email = user.email.value;
                userDocument.password = user.password.value;
                userDocument.role = user.role;
                userDocument.active = user.active;

                await userDocument.save();

                return user;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(userID: UniqueEntityID | string): Promise<User> {
        const query = { domainId: userID };
        const userRecord = await this.userSchema.findOne(query as FilterQuery<IUserPersistence & Document>);

        if (userRecord != null) {
            return UserMap.toDomain(userRecord);
        }
        else
            return null;
    }

    public async findAll(): Promise<User[]> {
        try {
            var userList: User[] = [];
            const list = await this.userSchema.find();
            list.forEach(user => {
                userList.push(UserMap.toDomain(user));
            });
            return userList;
        }
        catch (e) {
            throw e;
        }
    }

    public async findAllActive(): Promise<User[]> {
        try {
            const query = { active: true };
            var userList: User[] = [];

            const list = await this.userSchema.find(query as FilterQuery<IUserPersistence & Document>);
            list.forEach(user => {
                userList.push(UserMap.toDomain(user));
            });
            return userList;
        }
        catch (e) {
            throw e;
        }
    }

    public async findByEmail(userEmail: string): Promise<User> {
        const query = { email: userEmail };
        const userRecord = await this.userSchema.findOne(query as FilterQuery<IUserPersistence & Document>);

        if (userRecord != null) {
            return UserMap.toDomain(userRecord);
        }
        else
            return null;
    }
}