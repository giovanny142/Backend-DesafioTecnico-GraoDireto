import { IsString, MaxLength } from 'class-validator'

export class RestaurantSchema {
    @IsString()
    @MaxLength(64)
    name: string;
    @IsString()
    phone: string;
    @IsString()
    @MaxLength(120)
    address: string;
    image: string;
}