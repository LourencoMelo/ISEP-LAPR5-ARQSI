import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface TaraProps{
    value : number;
}

export class Tara extends ValueObject<TaraProps>{

    
    /**
     * Returns the value of the tara object
     */
    get value() : number {
        return this.props.value;
    }

       /**
     * Private constructor to create tara
     * @param props tara data
     */
    private constructor (props : TaraProps){
        super(props);
    }

    
    /**
     * Static method to transform a number to a tara object
     * @param tara tara value
     * @returns Result<Tara> if succeeds or null if fails
     */
    public static create(tara : number) : Result<Tara> {

        const guardResult = Guard.againstNullOrUndefined(tara, 'tara');
        if (!guardResult.succeeded || tara < 0) {                       //Verifies if distance isn't null or undefined or negative
            return Result.fail<Tara>(guardResult.message);
        } else {
            return Result.ok<Tara>(new Tara({ value: tara }))
        }
           
    }

}