import { Inject, Service } from "typedi";
import IPathController from "./IControllers/IPathController";
import config from "../../config";
import IPathService from "../services/IServices/IPathService";
import { Request, Response, NextFunction } from 'express';
import IPathDTO from "../dto/IPathDTO";
import { Result } from "../core/logic/Result";


@Service()
export default class PathController implements IPathController{

    constructor(@Inject(config.services.path.name) private pathServiceInstance : IPathService) {}

    public async createPath(req : Request, res : Response, next : NextFunction){

        try{

            const pathOrError = await this.pathServiceInstance.createPath(req.body as IPathDTO) as Result<IPathDTO>;

            if(pathOrError.isFailure){
                return res.status(402).send();
            }

            
            const pathDTO = pathOrError.getValue();

            return res.json(pathDTO).status(201);
        }catch (error){
            return next(error);
        }
    }


    public async getAllPaths(req : Request, res : Response, next : NextFunction){
        try {
            const pathsOrError = await this.pathServiceInstance.getAllPaths() as Result<IPathDTO[]>;

            if (pathsOrError.isFailure) {
              return res.status(404).send();
            }
            const pathsDto = pathsOrError.getValue();
            return res.status(201).json(pathsDto);
        } catch (e) {
            return next(e);
        }
    }

    public async getPathById(req : Request, res : Response, next : NextFunction){
        try{
            const pathOrError = await this.pathServiceInstance.getPath(req.params.id) as Result<IPathDTO>;

            if(pathOrError.isFailure){
                return res.status(404).send();
            }

            const pathDTO = pathOrError.getValue();

            return res.status(201).json(pathDTO);

        }catch(error){
            return next(error);
        }
    }

    public async updatePath(req : Request, res : Response, next : NextFunction){
        try{

            const id = req.params.id;
            const id_warehouse1 = req.body.id_warehouse1;
            const id_warehouse2 = req.body.id_warehouse2;
            const distance = req.body.distance;
            const path_time = req.body.path_time;
            const energy = req.body.energy;
            const extra_time = req.body.extra_time;


            
            const pathOrError = await this.pathServiceInstance.updatePath({id,id_warehouse1,id_warehouse2,distance,path_time,energy,extra_time} as IPathDTO) as Result<IPathDTO>;

            if(pathOrError.isFailure){
                return res.status(404).send();
            }

            const pathDTO = pathOrError.getValue();

            return res.status(201).json(pathDTO);
        }catch(error){
            return next(error);
        }
    }
}