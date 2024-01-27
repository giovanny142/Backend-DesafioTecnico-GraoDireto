import { Module } from '@nestjs/common';
import { RestaurantModule } from './modules/restaurant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CorsModule } from '@nestjs/platform-express';

@Module({
  imports: [RestaurantModule, TypeOrmModule.forRoot({
    database: "./db.sql",
    type: "sqlite",
    synchronize: true,
    entities: ["dist/**/*.model.js"]
  }),
  // CorsModule.forRoot({
  //   origin: false, // Isso desativa o CORS
  // })
],
})
export class AppModule { }
