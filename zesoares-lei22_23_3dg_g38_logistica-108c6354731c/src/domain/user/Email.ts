import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EmailProps {
    value: string;
}

export class Email extends ValueObject<EmailProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: EmailProps) {
        super(props);
    }

    public static create(email: string): Result<Email> {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i;
        const result: boolean = expression.test(email);

        const guardResult = Guard.againstNullOrUndefined(email, 'email');
        if (!guardResult.succeeded || !result) {
            return Result.fail<Email>(guardResult.message);
        } else {
            return Result.ok<Email>(new Email({ value: email }))
        }
    }
}