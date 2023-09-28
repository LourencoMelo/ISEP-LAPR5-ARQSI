import { Inject, Service } from "typedi";
import config from "../../config";
import { Request, Response, NextFunction } from 'express';
import { Result } from "../core/logic/Result";
import IPlanningService from "../services/IServices/IPlanningService";
import IPlanningDTO from "../dto/IPlanningDTO";
import IPlanningController from "./IControllers/IPlanningController";


@Service()
export default class PlanningController implements IPlanningController{
    

    //Injection of dependencies. Relates to specific service
    constructor(@Inject(config.services.planning.name) private planningServiceInstance : IPlanningService) {}


    public async getPlanning(req : Request, res : Response, next : NextFunction){
        try {

            const plannigOrError = await this.planningServiceInstance.getPlanning() as Result<IPlanningDTO>;

            if(plannigOrError.isFailure){
                return res.status(404).send();
            }

            const planningDTO = plannigOrError.getValue();

            return res.status(201).json(planningDTO);
        } catch (error) {
            return next(error);
        }
    }


    public async getAllViagens(req: Request, res: Response, next: NextFunction) {
        try {
          const viagemOrError = await this.planningServiceInstance.getAllViagens() as Result<IPlanningDTO[]>;
          if (viagemOrError.isFailure) {
            return res.status(404).send();
          }
          const viagemDTO = viagemOrError.getValue();
          return res.status(201).json(viagemDTO);
        } catch (e) {
          return next(e);
        }
      }
}