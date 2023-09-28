import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CargoCapacityProps{
    value : number;
}

export class CargoCapacity extends ValueObject<CargoCapacityProps>{

    /**
     * Returns the value of the cargocapacity object
     */
    get value() : number {
        return this.props.value;
    }

        /**
     * Private constructor to create Cargocapacity
     * @param props cargocapacity data
     */
    private constructor (props : CargoCapacityProps){
        super(props);
    }

    /**
     * Static method to transform a number to a Cargo capacity object
     * @param cargoCapacity cargocapacity value
     * @returns Result<CargoCapacity> if succeeds or null if fails
     */
    public static create(cargoCapacity : number) : Result<CargoCapacity> {

        const guardResult = Guard.againstNullOrUndefined(cargoCapacity, 'Cargo Capacity');
        if (!guardResult.succeeded || cargoCapacity < 0) {                       //Verifies if distance isn't null or undefined or negative
            return Result.fail<CargoCapacity>(guardResult.message);
        } else {
            return Result.ok<CargoCapacity>(new CargoCapacity({ value: cargoCapacity }))
        }
           
    }

}