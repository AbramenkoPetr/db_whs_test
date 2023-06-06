import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { WhsService } from '../whs/whs.service';
@Controller('users')
export class UsersController {
constructor(private readonly usersService: UsersService,
    private readonly whsService: WhsService   )

 {}

@Post()
async create(@Body() user: UserCreateDto): Promise<UsersEntity> {
return this.usersService.create(user);
}
@Get()
//@Render('create-whs')
getAllView() {
    //const whs = this.whsService.getAll();
    console.log('whs');
    //return { whs, title: 'Список новостей!' };
  }
}
