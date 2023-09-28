import { Request, Response, NextFunction } from 'express';

export default interface IUserController  {
    createUser(req: Request, res: Response, next: NextFunction);
    getAllUsers(req: Request, res: Response, next: NextFunction);
    getUserByEmail(req: Request, res: Response, next: NextFunction);
    updateUser(req: Request, res: Response, next: NextFunction);
    deactivateUser(req:Request, res:Response, next: NextFunction);
}