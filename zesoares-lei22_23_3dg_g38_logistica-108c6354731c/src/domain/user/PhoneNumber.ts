import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PhoneNumberProps{
    value : number;
}

export class PhoneNumber extends ValueObject<PhoneNumberProps>{

    
    /**
     * Returns the value of the phoneNumber object
     */
    get value() : number {
        return this.props.value;
    }

       /**
     * Private constructor to create tara
     * @param props phoneNumber data
     */
    private constructor (props : PhoneNumberProps){
        super(props);
    }

    
    /**
     * Static method to transform a number to a phone object
     * @param phoneNumber phoneNumber value
     * @returns Result<PhoneNumber> if succeeds or null if fails
     */
    public static create(phoneNumber : number) : Result<PhoneNumber> {

        const guardResult = Guard.againstNullOrUndefined(phoneNumber, 'phoneNumber');
        if (!guardResult.succeeded || phoneNumber < 100000000 || phoneNumber > 999999999) {          
            return Result.fail<PhoneNumber>(guardResult.message);
        } else {
            return Result.ok<PhoneNumber>(new PhoneNumber({ value: phoneNumber }))
        }
           
    }

}