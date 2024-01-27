import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RestaurantModel } from "./restaurant.model";

@Entity()
export class DishesModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 32 })
    name: string;

    @Column()
    description: string;

    @Column()
    price: string;

    @ManyToOne(() => RestaurantModel, restaurant => restaurant.dishes)
    @JoinColumn({ name: 'restaurantId' })
    restaurantId: RestaurantModel;

    @Column()
    image: string;
}