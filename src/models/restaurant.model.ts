import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DishesModel } from "./dishes.model";

@Entity()
export class RestaurantModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64 })
    name: string;

    @Column()
    phone: string;

    @Column({ length: 120 })
    address: string;

    @Column()
    image: string;

    @OneToMany(() => DishesModel, dishes => dishes.restaurantId)
    dishes: DishesModel[];
}