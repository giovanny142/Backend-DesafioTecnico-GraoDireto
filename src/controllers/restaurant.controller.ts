import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DishesModel } from "src/models/dishes.model";
import { RestaurantModel } from "src/models/restaurant.model";
import { RestaurantSchema } from "src/schemas/restaurant.schema";
import { Repository } from "typeorm";

@Controller('/restaurant')
export class RestaurantController {
    constructor(@InjectRepository(RestaurantModel)
    private restaurantModel: Repository<RestaurantModel>,
        @InjectRepository(DishesModel)
        private dishesModel: Repository<DishesModel>,
    ) { }

    @Post()
    public async create(@Body() body: RestaurantSchema): Promise<RestaurantModel> {
        const restaurantCreated = await this.restaurantModel.save(body)
        return restaurantCreated
    }

    @Get()
    public async getAllRestaurant(): Promise<RestaurantModel[]> {
        const listRestaurant = await this.restaurantModel.find();
        return listRestaurant;
    }


    @Get('/dishes')
    public async getSearchBar(@Query('search') value: string): Promise<any> {

        const result = await this.restaurantModel.createQueryBuilder('restaurantModel')
            .innerJoinAndSelect('restaurantModel.dishes', 'dishesModel')
            .where('LOWER(restaurantModel.name) LIKE LOWER(:restaurantName)', { restaurantName: `%${value}%` })
            .orWhere('LOWER(dishesModel.name) LIKE LOWER(:dishesName)', { dishesName: `%${value}%` })
            .orWhere('LOWER(dishesModel.description) LIKE LOWER(:description)', { description: `%${value}%` })
            .groupBy('restaurantModel.name')
            .getMany();

        return result
    }

    @Get(':id')
    public async getRestaurantById(@Param('id', ParseIntPipe) id: number): Promise<RestaurantModel> {
        const restaurantDetails = await this.restaurantModel.findOne({ where: { id } })

        if (!restaurantDetails) throw new NotFoundException('Restaurante não encontrado.');

        return restaurantDetails
    }
}