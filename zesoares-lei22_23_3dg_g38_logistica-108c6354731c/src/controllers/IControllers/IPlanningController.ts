import { Request, Response, NextFunction } from 'express';

export default interface IPlanningController  {
  getPlanning(req:Request, res: Response, next:NextFunction);
  getAllViagens(req:Request, res:Response, next:NextFunction);
}
