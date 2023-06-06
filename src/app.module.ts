import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhsModule } from './whs/whs.module';
import { GtsModule } from './whs/gts/gts.module';
import { MailModule } from './mail/mail.module';
import { UsersModule }  from './users/users.module';
import { CategoriesModule }  from './categories/categories.module';
// const app = await NestFactory.create<NestExpressApplication>(AppModule);

//   // Сообщим приложению, где искать наши views.
//   app.setBaseViewsDir(join(__dirname, '../views'));
//app.setBaseViewsDir(join(__dirname, '../views'));
console.log('__dirname ', __dirname);
const dirname1 = join(__dirname, '../', 'views');
console.log('dirname1 ', dirname1);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1312',
      database: 'my_news_blog',
      entities: ["dist/**/*.entity{.ts, .js}"],
      synchronize: true,
      autoLoadEntities: true,
    }),
    
    ServeStaticModule.forRoot({
      
      rootPath: join(__dirname, '../', 'public'),
    }),
    WhsModule,
    MailModule,
    UsersModule,
    CategoriesModule,
    GtsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
//AppModule.setBaseViewsDir(join(__dirname, '../views'));
export class AppModule {}
