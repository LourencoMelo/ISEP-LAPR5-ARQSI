import { Mapper } from "../core/infra/Mapper";

import {ITruckDTO} from "../dto/ITruckDTO";

import { Document, Model } from 'mongoose';
import { Truck } from "../domain/truck/Truck";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { ITruckPersistence } from '../dataschema/ITruckPersistence';

export class TruckMap extends Mapper<Truck> {

    /**
     * Static method that receives truck object and transforms it in dto object
     * @param truck truck to transform
     * @returns dto object with truck info
     */
    public static toDTO( truck: Truck): ITruckDTO {
        return {
            //extracting primitive type values
            domainId: truck.id.toString(),
            designation: truck.designation,
            tara: truck.tara.value,
            cargoCapacity: truck.cargoCapacity.value,
            maxBattery: truck.maxBattery.value,
            autonomy: truck.autonomy.value,
            chargingTime: truck.chargingTime.value,
            active : truck.active
        } as ITruckDTO;
    }

     /**
     * Static method that receives truck of any type and transforms it in domain object
     * @param truck truck to transform
     * @returns domain object 
     */
    public static toDomain (truck: any | Model<ITruckPersistence & Document> ): Truck {
        //Creates truck object with received data and saves it in truckOrError constant
        const truckOrError = Truck.create(
          truck,
          new UniqueEntityID(truck.domainId),
        );

        truckOrError.getValue().active = truck.active;
        
        //Verifies if constant defined above was succeded or else prints a console error with the error
        truckOrError.isFailure ? console.log(truckOrError.error) : '';
            
    //Returns the truck value if the creation was succeeded. Otherwise returns null object
        return truckOrError.isSuccess ? truckOrError.getValue() : null;
    }

    /**
     * Static method to transform truck of any type in a persistence object to save in the database
     * @param truck truck to persist
     * @returns persistence object
     */
    public static toPersistence (truck: Truck): any {
        return {
            domainId: truck.id.toString(),
            designation: truck.designation,
            tara: truck.tara.value,
            cargoCapacity: truck.cargoCapacity.value,
            maxBattery: truck.maxBattery.value,
            autonomy: truck.autonomy.value,
            chargingTime: truck.chargingTime.value,
            active: truck.active
        }
    }
}