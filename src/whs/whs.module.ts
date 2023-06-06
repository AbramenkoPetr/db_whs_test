import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhsController } from './whs.controller';
import { WhsService } from './whs.service';
//import { UsersService } from 'src/users/users.service';
import { GtsModule } from './gts/gts.module';
import { MailModule } from '../mail/mail.module';
import { WhsEntity } from './whs.entity';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';
console.log('whsmod __dirname ',  __dirname)
@Module({
  controllers: [WhsController],
  providers: [WhsService],
  imports: [
  //  /*forwardRef(() =>*/ GtsModule/*) */,
    
    TypeOrmModule.forFeature([WhsEntity]),  
    GtsModule,
    MailModule,
    UsersModule,
    CategoriesModule
  ],
  //exports: [WhsService],
})
export class WhsModule {}
