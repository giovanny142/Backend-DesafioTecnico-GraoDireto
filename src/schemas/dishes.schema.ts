import { IsString, MaxLength } from 'class-validator'
import { RestaurantModel } from 'src/models/restaurant.model';

export class DishesSchema {
    name: string;
    description: string;
    price: string;
    restaurantId: RestaurantModel;
    image: string; 
}