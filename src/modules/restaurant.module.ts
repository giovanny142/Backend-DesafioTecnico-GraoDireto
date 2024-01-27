import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm";
import { DishesController } from "src/controllers/dishes.controller";
import { RestaurantController } from "src/controllers/restaurant.controller";
import { DishesModel } from "src/models/dishes.model";
import { RestaurantModel } from "src/models/restaurant.model";

@Module({
    imports: [TypeOrmModule.forFeature([RestaurantModel, DishesModel])],
    controllers: [RestaurantController, DishesController],
})

export class RestaurantModule {

}