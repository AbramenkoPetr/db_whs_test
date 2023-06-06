import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
//import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
//import { PostsController } from './users.controller.ts/posts/posts.controller';
//import { UsersController } from './users/users.controller';
import { UsersController } from './users.controller';
@Module({
providers: [UsersService],

controllers: [UsersController],
imports: [TypeOrmModule.forFeature([UsersEntity])],
exports: [UsersService, TypeOrmModule.forFeature([UsersEntity])],
})
export class UsersModule {}

