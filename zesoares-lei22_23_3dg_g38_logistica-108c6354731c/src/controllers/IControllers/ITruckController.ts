import { Request, Response, NextFunction } from 'express';

export default interface ITruckController  {
  getTruckById(req:Request, res: Response, next:NextFunction);
  createTruck(req: Request, res: Response, next: NextFunction);
  updateTruck(req: Request, res: Response, next: NextFunction);
  inactivateTruck(req: Request, res: Response, next: NextFunction);
  activateTruck(req: Request, res: Response, next: NextFunction);
  getAllTrucks(req:Request, res:Response, next:NextFunction);
  getAllActiveTrucks(req:Request, res:Response, next:NextFunction);
}
