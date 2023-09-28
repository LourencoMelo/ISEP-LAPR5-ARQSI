import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Repo } from "../../core/infra/Repo";
import { Truck } from "../../domain/truck/Truck";

export default interface ITruckRepo extends Repo<Truck> {
    save(truck: Truck): Promise<Truck>;
    findByDomainId (truckID: UniqueEntityID | string): Promise<Truck>;
    findAll() : Promise<Truck[]>;
    findAllActive() : Promise<Truck[]>;
}
