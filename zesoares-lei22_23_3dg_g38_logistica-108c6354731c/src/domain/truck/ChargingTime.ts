import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface ChargingTimeProps{
    value : number;
}

export class ChargingTime extends ValueObject<ChargingTimeProps>{

      /**
     * Returns the value of the charging time object
     */
    get value() : number {
        return this.props.value;
    }

       /**
     * Private constructor to create ChargingTime
     * @param props chargingtime data
     */
    private constructor (props : ChargingTimeProps){
        super(props);
    }

     /**
     * Static method to transform a number to a ChargingTime object
     * @param chargingTime ChargingTime value
     * @returns Result<ChargingTime> if succeeds or null if fails
     */
    public static create(chargingTime : number) : Result<ChargingTime> {

        const guardResult = Guard.againstNullOrUndefined(chargingTime, 'ChargingTime');
        if (!guardResult.succeeded || chargingTime < 0) {                       //Verifies if distance isn't null or undefined or negative
            return Result.fail<ChargingTime>(guardResult.message);
        } else {
            return Result.ok<ChargingTime>(new ChargingTime({ value: chargingTime }))
        }
           
    }

}