import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface MaxBatteryProps{
    value : number;
}

export class MaxBattery extends ValueObject<MaxBatteryProps>{

    /**
     * Returns the value of the maxBattery object
     */
    get value() : number {
        return this.props.value;
    }

     /**
     * Private constructor to create maxBattery
     * @param props maxBattery data
     */
    private constructor (props : MaxBatteryProps){
        super(props);
    }

        /**
     * Static method to transform a number to a maxBattery object
     * @param maxBattery maxBattery value
     * @returns Result<MaxBattery> if succeeds or null if fails
     */
    public static create(maxBattery : number) : Result<MaxBattery> {

        const guardResult = Guard.againstNullOrUndefined(maxBattery, 'Maximum Battery');
        if (!guardResult.succeeded || maxBattery < 0) {                       //Verifies if distance isn't null or undefined or negative
            return Result.fail<MaxBattery>(guardResult.message);
        } else {
            return Result.ok<MaxBattery>(new MaxBattery({ value: maxBattery }))
        }
           
    }

}