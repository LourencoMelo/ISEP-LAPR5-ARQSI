import { Inject, Service } from "typedi";
import ITruckService from "./IServices/ITruckService";
import config from "../../config";
import ITruckRepo from "./IRepos/ITruckRepo";
import { Result } from "../core/logic/Result";
import { ITruckDTO } from "../dto/ITruckDTO";
import { TruckMap } from "../mappers/TruckMap";
import { Truck } from "../domain/truck/Truck";
import { Tara } from "../domain/truck/Tara";
import { CargoCapacity } from "../domain/truck/CargoCapacity";
import { MaxBattery } from "../domain/truck/MaxBattery";
import { Autonomy } from "../domain/truck/Autonomy";
import { ChargingTime } from "../domain/truck/ChargingTime";


@Service()
export default class TruckService implements ITruckService {

      //Injects dependecy to repository interface where methods to be implemented are defined
    constructor( @Inject(config.repos.truck.name) private truckRepo : ITruckRepo){}

    /**
     * async method to get a specific truck
     * @param truckID unique identifier of truck
     * @returns truck found dto
     */  
    public async getTruck(truckID : string) : Promise<Result<ITruckDTO>> {

        try {
            const truck = await this.truckRepo.findByDomainId(truckID);

            if( truck === null ) {
                return Result.fail<ITruckDTO>("Truck not found");
            }else {
                const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;

                return Result.ok<ITruckDTO>(truckDTOResult);
            }

        } catch (error) {
            throw error;
        }
    }

    /**
     * async method to create a truck
     * @param truckDTO dto with truck's data
     * @returns truck's result dto
     */
    public async createTruck(truckDTO : ITruckDTO) : Promise<Result<ITruckDTO>> {

        try {
            const truckOrError = await Truck.create(truckDTO);

            if (truckOrError.isFailure){
                return Result.fail<ITruckDTO>(truckOrError.errorValue());
            }

            const truckResult = truckOrError.getValue();

            await this.truckRepo.save(truckResult);

            const truckDTOResult = TruckMap.toDTO(truckResult) as ITruckDTO;

            return Result.ok<ITruckDTO>(truckDTOResult);

        } catch (error){
            throw error;   
        }

    }
  
   /**
     * async method to get all trucks in database
     * @returns  list of truck's dtos founded
     */
    public async getAllTrucks(): Promise<Result<ITruckDTO[]>> {
        try {
          const trucks = await this.truckRepo.findAll();
    
          if (trucks === null) {
            return Result.fail<ITruckDTO[]>("Trucks not found");
          } else {
            let listTrucksDTOResult: ITruckDTO[] = [];
            trucks.forEach(truck => {
                listTrucksDTOResult.push(TruckMap.toDTO(truck) as ITruckDTO);
            });
            return Result.ok<ITruckDTO[]>(listTrucksDTOResult);
          }
        } catch (e) {
          throw e;
        }
    }


    public async getAllActiveTrucks(): Promise<Result<ITruckDTO[]>> {
      try {
        const trucks = await this.truckRepo.findAllActive();
  
        if (trucks === null) {
          return Result.fail<ITruckDTO[]>("Trucks not found");
        } else {
          let listTrucksDTOResult: ITruckDTO[] = [];
          trucks.forEach(truck => {
              listTrucksDTOResult.push(TruckMap.toDTO(truck) as ITruckDTO);
          });
          return Result.ok<ITruckDTO[]>(listTrucksDTOResult);
        }
      } catch (e) {
        throw e;
      }
    }

    
      /**
       * async method to update data from an existing truck
       * @param truckDTO dto with truck's data
       * @returns trucks result dto
       */
    public async updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
        try {
          const truck = await this.truckRepo.findByDomainId(truckDTO.domainId);
          if (truck === null) {
            return Result.fail<ITruckDTO>("Truck not found");
          }else {
            truck.designation = truckDTO.designation;
            truck.autonomy = Autonomy.create(truckDTO.autonomy).getValue();
            truck.cargoCapacity = CargoCapacity.create(truckDTO.cargoCapacity).getValue();
            truck.chargingTime = ChargingTime.create(truckDTO.chargingTime).getValue();
            truck.maxBattery = MaxBattery.create(truckDTO.maxBattery).getValue();
            truck.tara = Tara.create(truckDTO.tara).getValue();
            //truck.active = truckDTO.active.valueOf();

            await this.truckRepo.save(truck);
    
            const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
            return Result.ok<ITruckDTO>(truckDTOResult)
          }
        } catch (e) {
          throw e;
        }
      }

        /**
       * async that inactivates a truck
       * @param truckDTO dto with truck's data
       * @returns trucks result dto
       */
    public async inactivateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
      try {
        const truck = await this.truckRepo.findByDomainId(truckDTO.domainId);
        if (truck === null) {
          return Result.fail<ITruckDTO>("Truck not found");
        }else {
          truck.active = false;
          await this.truckRepo.save(truck);
  
          const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
          return Result.ok<ITruckDTO>(truckDTOResult)
        }
      } catch (e) {
        throw e;
      }
    }

     /**
       * async that inactivates a truck
       * @param truckDTO dto with truck's data
       * @returns trucks result dto
       */
     public async activateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
      try {
        const truck = await this.truckRepo.findByDomainId(truckDTO.domainId);
        if (truck === null) {
          return Result.fail<ITruckDTO>("Truck not found");
        }else {
          truck.active = true;
          await this.truckRepo.save(truck);
  
          const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
          return Result.ok<ITruckDTO>(truckDTOResult)
        }
      } catch (e) {
        throw e;
      }
    }


}