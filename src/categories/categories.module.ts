import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
//import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from './categories.entity';
//import { PostsController } from './users.controller.ts/posts/posts.controller';
//import { UsersController } from './users/users.controller';
import { CategoriesController } from './categories.controller';
@Module({
providers: [CategoriesService],
exports: [CategoriesService],
controllers: [CategoriesController],
imports: [TypeOrmModule.forFeature([CategoriesEntity])],
})
export class CategoriesModule {}
