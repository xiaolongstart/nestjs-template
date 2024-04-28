import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class AppDto {
    @IsString()
    name!: string;

    @IsNumber()
    @IsNotEmpty()
    age!: number;
}