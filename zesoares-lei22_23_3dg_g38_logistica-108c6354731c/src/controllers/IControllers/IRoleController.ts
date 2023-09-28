import { Request, Response, NextFunction } from 'express';

export default interface IRoleController  {
  createRole(req: Request, res: Response, next: NextFunction);
  updateRole(req: Request, res: Response, next: NextFunction);
  getRole(req: Request, res: Response, next: NextFunction);
  getAll(req:Request, res:Response, next:NextFunction);
  getByName(req:Request, res:Response, next:NextFunction);
}