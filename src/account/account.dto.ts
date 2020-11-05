import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateAccountDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(new RegExp('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$'),
        { message: 'password must contain at least one letter, at least one number, and must be longer than six characters.' })
    password: string;
}
