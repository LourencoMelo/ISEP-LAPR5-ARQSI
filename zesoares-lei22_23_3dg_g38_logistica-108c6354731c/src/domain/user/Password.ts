/*import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import * as bcrypt from 'bcrypt-nodejs';

interface PasswordProps {
  value: string;
}

export class Password extends ValueObject<PasswordProps> {

  get value(): string {
    return this.props.value;
  }

  private constructor(props) {
    super(props)
  }

  public static async hashPassword(plaintextPassword) {
    bcrypt
      .hash(plaintextPassword, 10)
      .then(hash => {
       return hash;
      })
      .catch(err => console.error(err.message))
  }

  // compare password
  public async comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
  }

  public static create(password: string): Result<Password> {
    console.log(password);
    //const expression: RegExp = /^.*[~!@#$%^*\-_=+[{\]}\/;:,.?]{1}$/m //It has to contain special character
    const expression1: RegExp = /^\S{5,15}$/m  // At least 5 characters (and up to 15 characters):
    //const result: boolean = expression.test(password);
    const result1: boolean = expression1.test(password);
    console.log("ola");
    const pass = this.hashPassword(password);
    const guardResult = Guard.againstNullOrUndefined(pass, 'password');
    console.log(pass);
    if (!guardResult.succeeded || !result1) {
      return Result.fail<Password>(guardResult.message);
    } else {
      return Result.ok<Password>(new Password({ value: pass }))
    }

  }
}*/

import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import * as bcrypt from 'bcrypt-nodejs';

interface PasswordProps {
  value: string;
}

export class Password extends ValueObject<PasswordProps> {
  
  get value (): string {
    return this.props.value;
  }

  private constructor (props) {
    super(props)
  }

  public static create(password : string) : Result<Password> {
    //const expression: RegExp = /^.*[~!@#$%^*\-_=+[{\]}\/;:,.?]{1}$/m //It has to contain special character
    const expression1: RegExp = /^\S{5,15}$/m  // At least 5 characters (and up to 15 characters):
    //const result: boolean = expression.test(password);
    const result1: boolean = expression1.test(password);
    const guardResult = Guard.againstNullOrUndefined(password, 'password');
    if (!guardResult.succeeded || !result1) { 
        return Result.fail<Password>(guardResult.message);
    } else {
        return Result.ok<Password>(new Password({ value: password }))
    }
       
}
}
