import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface AutonomyProps{
    value : number;
}

export class Autonomy extends ValueObject<AutonomyProps>{

    /**
     * Returns the value of the autonomy object
     */
    get value() : number {
        return this.props.value;
    }

    /**
     * Private constructor to create Autonomy
     * @param props autonomy data
     */
    private constructor (props : AutonomyProps){
        super(props);
    }

    /**
     * Static method to transform a number to a Autonomy object
     * @param autonomy autonomy value
     * @returns Result<Autonomy> if succeeds or null if fails
     */
    public static create(autonomy : number) : Result<Autonomy> {
        //Guarantees that the parameter received isnt null or undefined
        const guardResult = Guard.againstNullOrUndefined(autonomy, 'Autonomy');
        //Retruns Result<Autonomy>
        if (!guardResult.succeeded || autonomy < 0) {                       
            return Result.fail<Autonomy>(guardResult.message);
        } else {
            return Result.ok<Autonomy>(new Autonomy({ value: autonomy }))
        }
           
    }

}