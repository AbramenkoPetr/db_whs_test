import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as expressHbs from 'express-handlebars';
import * as hbs from 'hbs';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// const dirnameViev = join(__dirname, '../..', 'views');
// console.log('dirnameViev ', dirnameViev);
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.setBaseViewsDir(join(__dirname, '../', 'views'));
  ///home/petr/VScode/whs
  console.log('main __dirname', __dirname);
  console.log('main base veiw dir', join(__dirname, '../', 'views'));
  app.engine(
    'hbs',
    expressHbs({
      layoutsDir: join(__dirname, '../', 'views/layouts'),
      defaultLayout: 'layout',
      extname: 'hbs',
    }),
  );
  hbs.registerPartials(join(__dirname, '../', '/views/partials'));
    console.log(join(__dirname, '../', '/views/partials'));
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
