import config from "../../config";
import { Inject, Service } from "typedi";
import ITruckController from "./IControllers/ITruckController";
import ITruckService from "../services/IServices/ITruckService";
import { Request, Response, NextFunction } from 'express';
import { ITruckDTO } from "../dto/ITruckDTO";
import { Result } from "../core/logic/Result";

@Service()
export default class TruckController implements ITruckController {

  constructor(@Inject(config.services.truck.name) private truckServiceInstance: ITruckService) { }

  public async createTruck(req: Request, res: Response, next: NextFunction) {

    try {
      const truckOrError = await this.truckServiceInstance.createTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(402).send();
      }

      const truckDTO = truckOrError.getValue();

      return res.json(truckDTO).status(201);
    } catch (error) {
      return next(error);
    }
  }

  public async getAllTrucks(req: Request, res: Response, next: NextFunction) {
    try {
      const trucksOrError = await this.truckServiceInstance.getAllTrucks() as Result<ITruckDTO[]>;
      if (trucksOrError.isFailure) {
        return res.status(404).send();
      }
      const trucksDto = trucksOrError.getValue();
      return res.status(201).json(trucksDto);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllActiveTrucks(req: Request, res: Response, next: NextFunction) {
    try {
      const trucksOrError = await this.truckServiceInstance.getAllActiveTrucks() as Result<ITruckDTO[]>;
      if (trucksOrError.isFailure) {
        return res.status(404).send();
      }
      const trucksDto = trucksOrError.getValue();
      return res.status(201).json(trucksDto);
    } catch (e) {
      return next(e);
    }
  }


  public async getTruckById(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.getTruck(req.params.id) as Result<ITruckDTO>;
      if (truckOrError.isFailure) {
        return res.status(404).send();
      }
      const truckDTO = truckOrError.getValue();
      return res.status(201).json(truckDTO);

    } catch (error) {
      return next(error);
    }
  }

  public async updateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const domainId = req.params.id;
      const designation = req.body.designation;
      const autonomy = req.body.autonomy;
      const cargoCapacity = req.body.cargoCapacity;
      const chargingTime = req.body.chargingTime;
      const maxBattery = req.body.maxBattery;
      const tara = req.body.tara;

      const truckOrError = await this.truckServiceInstance.updateTruck({ domainId, designation, tara, cargoCapacity, maxBattery, autonomy, chargingTime } as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(201).json(truckDTO);
    }
    catch (e) {
      return next(e);
    }
  }

  public async inactivateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.getTruck(req.params.id);
      const truckDTOAux = truckOrError.getValue();
      const truckOrErrorFinal = await this.truckServiceInstance.inactivateTruck(truckDTOAux);

      if (truckOrErrorFinal.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrErrorFinal.getValue();
      return res.status(201).json(truckDTO);
    }
    catch (e) {
      return next(e);
    }
  }

  public async activateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.getTruck(req.params.id);
      const truckDTOAux = truckOrError.getValue();
      const truckOrErrorFinal = await this.truckServiceInstance.activateTruck(truckDTOAux);

      if (truckOrErrorFinal.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrErrorFinal.getValue();
      return res.status(201).json(truckDTO);
    }
    catch (e) {
      return next(e);
    }
  }
}