import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Connection } from "mongoose";

@ValidatorConstraint({name: 'IsUnique', async: true})
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {

    constructor(@InjectConnection() private readonly conn: Connection) {}

    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
        const [ collection ] = args.constraints
        let ret = false

        try {
            const record = await this.conn.models[collection].find({username: value}).exec()
            if (! record.length) { ret = true }
        } catch (error) {}

        return ret
    }

    defaultMessage?(args?: ValidationArguments): string {
        return `${args.property} is invalid.`
    }

}

export function IsUnique(collection: string, validationOptions? : ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsUnique',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [collection],
            validator: IsUniqueConstraint
        })
    }
}