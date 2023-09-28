import config from "../../config";
import { Inject, Service } from "typedi";
import { Request, Response, NextFunction } from 'express';
import { Result } from "../core/logic/Result";
import IUserService from "../services/IServices/IUserService";
import { IUserDTO } from "../dto/IUserDTO";
import IUserController from "./IControllers/IUserController";

@Service()
export default class UserController implements IUserController {

    constructor(@Inject(config.services.user.name) private userServiceInstance: IUserService) { }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userOrError = await this.userServiceInstance.createUser(req.body as IUserDTO) as Result<IUserDTO>;

            if (userOrError.isFailure) {
                return res.status(402).send();
            }

            const userDTO = userOrError.getValue();

            return res.json(userDTO).status(201);
        } catch (error) {
            return next(error);
            
        }
    }

    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const userOrError = await this.userServiceInstance.getAllUsers() as Result<IUserDTO[]>;
            if (userOrError.isFailure) {
                return res.status(404).send();
            }
            const usersDto = userOrError.getValue();
            return res.status(201).json(usersDto);
        } catch (e) {
            return next(e);
        }
    }

    public async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
          const userOrError = await this.userServiceInstance.getUserByEmail(req.params.email) as Result<IUserDTO>;
          if (userOrError.isFailure) {
            return res.status(404).send();
          }
          const userDTO = userOrError.getValue();
          return res.status(201).json(userDTO);
    
        } catch (error) {
          return next(error);
        }
      }

      public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
          const domainId = req.params.id;
          const firstName = req.body.firstName;
          const lastName = req.body.lastName;
          const userName = req.body.userName;
          const phoneNumber = req.body.phoneNumber;
          const email = req.body.email;
          const role = req.body.role;

          const userOrError = await this.userServiceInstance.updateUser({ domainId, firstName, lastName, userName, phoneNumber, email,role } as IUserDTO) ;
    
          if (userOrError.isFailure) {
            return res.status(404).send();
          }
    
          const userDTO = userOrError.getValue();
          return res.status(201).json(userDTO);
        }
        catch (e) {
          return next(e);
        }
      }

      public async deactivateUser(req: Request, res: Response, next: NextFunction) {
        try{ 
          const domainId = req.params.id;

          const user = (await this.userServiceInstance.getUser(domainId)).getValue();

          
          const firstName = "AAAAAAAA";
          const lastName = "AAAAAAAA";
          const userName = user.userName;
          const phoneNumber = 999999999;
          const email = "AAAAAAAA@AAAAA.com";
          const role = user.role;

          const userOrError = await this.userServiceInstance.deactivateUser({domainId, firstName, lastName, userName, phoneNumber, email,role} as IUserDTO);

          if (userOrError.isFailure) {
            return res.status(404).send();
          }
    
          const userDTO = userOrError.getValue();
          return res.status(201).json(userDTO); 

        }catch(error){
          return next(error);
        }
      }

}