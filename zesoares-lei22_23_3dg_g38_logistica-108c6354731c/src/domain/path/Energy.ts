import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EnergyProps{
    value : number;
}

export class Energy extends ValueObject<EnergyProps>{

    /**
     * Returns the value of the energy object
     */
    get value() : number {
        return this.props.value;
    }

    /**
     * Private constructor to create Energy
     * @param props energy data
     */
    private constructor (props : EnergyProps){
        super(props);
    }

    /**
     * Static method to transform a number to a Energy object
     * @param energy energy's value
     * @returns Result<Energy> if succeeds or null if fails
     */
    public static create(energy : number) : Result<Energy> {

        //Guarantees that the parameter received isn´t null or undefined
        const guardResult = Guard.againstNullOrUndefined(energy, 'energy');

        //If the result of the above verification is false and the energy isn't negative, it returns Result<Energy>. Otherwise, returns error
        if (!guardResult.succeeded || energy < 0) {                       
            return Result.fail<Energy>(guardResult.message);
        } else {
            return Result.ok<Energy>(new Energy({ value: energy }))
        }
           
    }
}