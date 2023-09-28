import { User } from "../../domain/user/User";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Repo } from "../../core/infra/Repo";

export default interface IUserRepo extends Repo<User> {
    save(user: User): Promise<User>;
    exists(user: User): Promise<boolean>;
    findByDomainId (userID: UniqueEntityID | string): Promise<User>;
    findAll() : Promise<User[]>;
    findAllActive() : Promise<User[]>;
    findByEmail(userEmail: string) : Promise<User>;
}
