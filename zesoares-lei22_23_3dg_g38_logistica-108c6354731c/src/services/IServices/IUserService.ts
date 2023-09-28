import { IUserDTO } from "../../dto/IUserDTO";
import { Result } from "../../core/logic/Result";

export default interface IUserRepo {
    getUser(userId: string): Promise<Result<IUserDTO>>;
    getUserByEmail(userEmail: string): Promise<Result<IUserDTO>>;
    getAllUsers(): Promise<Result<IUserDTO[]>>;
    createUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
    updateUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
    deactivateUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
}