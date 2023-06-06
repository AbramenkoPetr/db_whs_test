import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
console.log('appcontr _dirname', __dirname);
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) { }
@Get()
@Render('start-list')
root() {
console.log('appcontr getstart');
  return {
    //messages: [{ message: 'Hello', author: 'Vlad' }, { message: 'World', author: 'Vlad' }],
  };
}

// @Controller('/app')
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get('/hello')
//   getHello(): string {
//     return this.appService.getHello();
//   }

  // @Get()
  // @Render('index')
  // root() {
  //   return {
  //     messages: [{ message: 'Hello', author: 'Vlad' }, { message: 'World' }],
  //   };
  // }
}
