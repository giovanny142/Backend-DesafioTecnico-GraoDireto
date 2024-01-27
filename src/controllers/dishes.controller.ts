import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DishesModel } from "src/models/dishes.model";
import { RestaurantModel } from "src/models/restaurant.model";
import { DishesSchema } from "src/schemas/dishes.schema";
import { Repository } from "typeorm";

@Controller('/dishes')
export class DishesController {
    constructor(@InjectRepository(DishesModel)
    private dishesModel: Repository<DishesModel>,
    ) { }

    @Post()
    public async create(@Body() body: DishesSchema): Promise<DishesModel> {

        const disheCreated = await this.dishesModel.save(body)

        if (!disheCreated) throw new NotFoundException('Erro ao cadastrar prato.')

        return disheCreated
    }

    @Get(':id')
    public async listMenuByRestaurantId(@Param('id') id: RestaurantModel): Promise<DishesModel[]> {
        const listMenu = await this.dishesModel
            .createQueryBuilder("dishesModel")
            .where("dishesModel.restaurantId = :id", { id: id })
            .getMany();


        if (!listMenu) throw new NotFoundException('Menu do restaurante não encontrado.');

        return listMenu;
    }
}