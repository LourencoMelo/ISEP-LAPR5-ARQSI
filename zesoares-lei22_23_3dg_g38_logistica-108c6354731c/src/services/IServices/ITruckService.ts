import { Result } from "../../core/logic/Result";
import { ITruckDTO } from "../../dto/ITruckDTO";

export default interface ITruckService  {
    getTruck(truckID: string): Promise<Result<ITruckDTO>>;
    createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
    updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
    inactivateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
    activateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
    getAllTrucks(): Promise<Result<ITruckDTO[]>>;
    getAllActiveTrucks(): Promise<Result<ITruckDTO[]>>;
  }
  