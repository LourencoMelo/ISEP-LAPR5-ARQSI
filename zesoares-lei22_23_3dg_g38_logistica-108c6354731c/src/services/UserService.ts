import IUserRepo from "./IRepos/IUserRepo";
import { Service, Inject } from 'typedi';
import config from "../../config";
import { IUserDTO } from '../dto/IUserDTO';
import { Result } from "../core/logic/Result";
import { UserMap } from "../mappers/UserMap";
import { User } from "../domain/user/User";
import { PhoneNumber } from "../domain/user/PhoneNumber";
import { Email } from "../domain/user/Email";
import IUserService from "./IServices/IUserService";


@Service()
export default class UserService implements IUserService {

    //Injects dependecy to repository interface where methods to be implemented are defined
    constructor(@Inject(config.repos.user.name) private userRepo: IUserRepo) { }

    public async getUser(userId: string): Promise<Result<IUserDTO>> {
        try {
            const user = await this.userRepo.findByDomainId(userId);

            if (user === null) {
                return Result.fail<IUserDTO>("User not found");
            }
            else {
                const userDTOResult = UserMap.toDTO(user) as IUserDTO;
                return Result.ok<IUserDTO>(userDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async getUserByEmail(userEmail: string): Promise<Result<IUserDTO>> {
        try {
            const user = await this.userRepo.findByEmail(userEmail);

            if (user === null) {
                return Result.fail<IUserDTO>("User not found");
            }
            else {
                const userDTOResult = UserMap.toDTO(user) as IUserDTO;
                return Result.ok<IUserDTO>(userDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async getAllUsers(): Promise<Result<IUserDTO[]>> {
        try {
            const users = await this.userRepo.findAll();

            if (users === null) {
                return Result.fail<IUserDTO[]>("Users not found");
            } else {
                let listUsersDTOResult: IUserDTO[] = [];
                users.forEach(user => {
                    listUsersDTOResult.push(UserMap.toDTO(user) as IUserDTO);
                });
                return Result.ok<IUserDTO[]>(listUsersDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async createUser(userDTO: IUserDTO): Promise<Result<IUserDTO>> {
        try {
            const userOrError = await User.create(userDTO);

            if (userOrError.isFailure) {
                return Result.fail<IUserDTO>(userOrError.errorValue());
            }
            const userResult = userOrError.getValue();

            await this.userRepo.save(userResult);

            const userDTOResult = UserMap.toDTO(userResult) as IUserDTO;
            return Result.ok<IUserDTO>(userDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async updateUser(userDTO: IUserDTO): Promise<Result<IUserDTO>> {
        try {
            const user = await this.userRepo.findByDomainId(userDTO.domainId);

            if (user === null) {
                return Result.fail<IUserDTO>("User not found");
            }
            else {
                user.firstName = userDTO.firstName;
                user.lastName = userDTO.lastName;
                user.userName = userDTO.userName;
                user.phoneNumber = PhoneNumber.create(userDTO.phoneNumber).getValue();
                user.email = Email.create(userDTO.email).getValue();
                user.role = userDTO.role;

                await this.userRepo.save(user);

                const userDTOResult = UserMap.toDTO(user) as IUserDTO;
                return Result.ok<IUserDTO>(userDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async deactivateUser(userDTO: IUserDTO): Promise<Result<IUserDTO>> {
        try{
            const user = await this.userRepo.findByDomainId(userDTO.domainId);

            if(user == null){
                return Result.fail<IUserDTO>("User not found");
            }
            else{
                const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                const length = 13;
                const length2 = 5;
                
                let randomStr = "";
                let randomStr2 = "";

                /**
                 * First part of the email generator
                 */
                for(let i=0; i < length; i++){
                    const randomNum = Math.floor(Math.random() * characters.length);
                    randomStr += characters[randomNum];
                }

                /**
                 * Part after the @ 
                 */
                for(let j=0; j < length2; j++){
                    const randomNum2 = Math.floor(Math.random() * characters.length);
                    randomStr2 += characters[randomNum2];
                }

                const emailGenerated = randomStr + "@" + randomStr2 + ".aaa";

                user.firstName = userDTO.firstName;
                user.lastName = userDTO.lastName;
                user.userName = userDTO.userName;

                user.phoneNumber = PhoneNumber.create(userDTO.phoneNumber).getValue();

                user.email = Email.create(emailGenerated).getValue();
                user.role = userDTO.role;
                user.active = false;

                await this.userRepo.save(user);

                const userDTOResult = UserMap.toDTO(user) as IUserDTO;
                
                return Result.ok<IUserDTO>(userDTOResult)
            }
        }catch(error){
            throw error;
        }
    }
}