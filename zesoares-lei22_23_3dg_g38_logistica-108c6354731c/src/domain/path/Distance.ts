import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface DistanceProps{
    value : number;
}

export class Distance extends ValueObject<DistanceProps>{

    /**
     * Returns the value of the distance object
     */
    get value() : number {
        return this.props.value;
    }

    /**
     * Private constructor to create Distance
     * @param props distance data
     */
    private constructor (props : DistanceProps){
        super(props);
    }

    /**
     * Static method to transform a number to a Distance object
     * @param distance distance's value
     * @returns Result<Distance> if succeeds or null if fails
     */
    public static create(distance : number) : Result<Distance> {

        //Guarantees that the parameter received isn´t null or undefined
        const guardResult = Guard.againstNullOrUndefined(distance, 'distance');

        //If the result of the above verification is false and the distance isn't negative, it returns Result<Distance>. Otherwise, returns error
        if (!guardResult.succeeded || distance < 0) {                       
            return Result.fail<Distance>(guardResult.message);
        } else {
            return Result.ok<Distance>(new Distance({ value: distance }))
        }
           
    }
}