import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface Path_TimeProps{
    value : number;
}

export class Path_Time extends ValueObject<Path_TimeProps>{

    /**
     * Returns the value of the Path_Time object
     */
    get value() : number {
        return this.props.value;
    }

    /**
     * Private constructor to create Path time
     * @param props path time data
     */
    private constructor (props : Path_TimeProps){
        super(props);
    }

    /**
     * Static method to transform a number to a Path_Time object
     * @param energy path time's value
     * @returns Result<Path_Time> if succeeds or null if fails
     */
    public static create(time : number) : Result<Path_Time> {

        //Guarantees that the parameter received isn´t null or undefined
        const guardResult = Guard.againstNullOrUndefined(time, 'time');

        //If the result of the above verification is false and the path time isn't negative, it returns Result<Path_Time>. Otherwise, returns error
        if (!guardResult.succeeded || time < 0) {                       
            return Result.fail<Path_Time>(guardResult.message);
        } else {
            return Result.ok<Path_Time>(new Path_Time({ value: time }))
        }
           
    }
}