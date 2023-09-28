import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Tara } from "./Tara";
import { MaxBattery } from "./MaxBattery";
import { ChargingTime } from "./ChargingTime";
import { CargoCapacity } from "./CargoCapacity";
import { Autonomy} from "./Autonomy";
import {Result} from "../../core/logic/Result";

import { ITruckDTO } from "../../dto/ITruckDTO";

interface TruckProps {
    designation : string; // Truck designation "name"
    tara : Tara; // Weight of the truck completly empty
    cargoCapacity : CargoCapacity; // Maximum capacity of the truck
    maxBattery : MaxBattery; // Maximum energy of the both batterys combined
    autonomy : Autonomy; // Truck autonomy with full weight and maximum battery
    chargingTime : ChargingTime; // Time that takes the battery to charge from 20% to 80%
    active : boolean; // Sets the truck active or inactive
}

export class Truck extends AggregateRoot<TruckProps>{

    /** 
     * Returns the unique id of the truck
     */
    get id() : UniqueEntityID{
        return this._id;
    }

    /**
     * Returns the designation of the truck
     */
    get designation() : string {
        return this.props.designation;
    }

    /**
     * Sets the designation of the truck
     * @param designation new designation
     */

    set designation( designation: string){
        this.props.designation = designation;
    }

    /**
     * Gets the tara of the truck
     */
    get tara() : Tara {
        return this.props.tara;
    }

    /**
     * Sets the tara of the truck
     * @param tara new tara
     */
    set tara(tara : Tara){
        this.props.tara = tara;
    }

    /** 
     * Gets the cargo capacity of the truck
     */
    get cargoCapacity() : CargoCapacity {
        return this.props.cargoCapacity;
    }

    /**
     * Sets the cargo capacity of the truck
     * @param cargoCapacity new cargo capacity
     */
    set cargoCapacity(cargoCapacity: CargoCapacity){
        this.props.cargoCapacity = cargoCapacity;
    }

    /**
     * Gets the max battery of the truck
     */
    get maxBattery() : MaxBattery {
        return this.props.maxBattery;
    }

    /** Sets the max battery of the truck 
     * @param maxBattery new max battery
    */
    set maxBattery(maxBattery: MaxBattery){
        this.props.maxBattery = maxBattery;
    }

    /**
     * Gets the truck autonomy
     */
    get autonomy() : Autonomy {
        return this.props.autonomy;
    }

    /**
     *  Sets the truck autonomy
     * @param autonomy new autonomy
     */
    set autonomy(autonomy: Autonomy){
        this.props.autonomy = autonomy;
    }

    /**
     * Gets the charging time of the battery
     */
    get chargingTime() : ChargingTime {
        return this.props.chargingTime;
    }

    /**
     * Sets the charging time of the battery
     * @param chargingTime new charging time
     */
    set chargingTime(chargingTime: ChargingTime){
        this.props.chargingTime = chargingTime;
    } 

    /**
     * Gets the variable active 
     */
    get active() : boolean{
        return this.props.active;
    }

    /**
     * Sets the active variable
     * @param active new active
     */
    set active(active: boolean){
        this.props.active = active;
    }

    /**
     * Private constructor
     * @param props truck data
     * @param id  unique id
     */
    private constructor (props : TruckProps, id? : UniqueEntityID){
        super(props, id);
    }

    /**
     * Static method to create a Truck object through a dto object
     * @param truckDTO dto with truck parameters
     * @param id unique id
     * @returns Returns error if  error is found or Result<Truck> when succeed
     */
    public static create(truckDTO: ITruckDTO, id?: UniqueEntityID) : Result<Truck> {
        
        //Extracting truck data from the dto object. Value objects must be created because dto only transports primitive type data

        const designation = truckDTO.designation;
        const tara = Tara.create(truckDTO.tara).getValue();
        const cargoCapacity = CargoCapacity.create(truckDTO.cargoCapacity).getValue();
        const maxBattery = MaxBattery.create(truckDTO.maxBattery).getValue();
        const autonomy = Autonomy.create(truckDTO.autonomy).getValue();
        const chargingTime = ChargingTime.create(truckDTO.chargingTime).getValue();
        const active = true;

        // new truck
        const truck = new Truck({designation : designation,tara : tara,cargoCapacity : cargoCapacity,maxBattery : maxBattery,autonomy : autonomy, chargingTime : chargingTime, active : active}, id);
        // Returns the new truck 
        return Result.ok<Truck>(truck);
    }

}
