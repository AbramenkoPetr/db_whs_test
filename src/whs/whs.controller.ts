import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  Res,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Render,
} from '@nestjs/common';
import { Express } from 'express';
import { Whs, WhsEdit, WhsService } from './whs.service';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { GtsService } from './gts/gts.service';
import { renderWhsAll } from '../views/whs/whs-all';
import { renderTemplate } from '../views/template';
import { renderWhsDetail } from '../views/whs/whs-detail';
import { CreateWhsDto } from './dtos/create-whs-dto';
import { EditWhsDto } from './dtos/edit-whs-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from '../utils/HelperFileLoader';
import { MailService } from '../mail/mail.service';
import { Console } from 'console';
import { WhsEntity } from './whs.entity';
import { isNumber } from 'class-validator';
import { Script } from 'vm';
//import { WhsCreateDto } from '../users/dto/user-create.dto'

const PATH_NEWS = '/whs-static/';
HelperFileLoader.path = PATH_NEWS;

@Controller('whs')
export class WhsController {
  constructor(
    private readonly whsService: WhsService,
    /*private readonly gtsService: GtsService,*/
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('cover'))
  async create1(
    @Body() whs: CreateWhsDto,
    
    @UploadedFile() cover: Express.Multer.File    ) {
      //console.log('controller cover ', cover);
      //const cover = '';
      const userId = Number(1);//** */
      const categoryId = Number(1);//** */
    // Поиск пользователя по его ID
    const _user = await this.usersService.getuser(/*whs.cod_okatoId*/userId);
    // if (!_user) {
    // throw new HttpException(
    // 'Не существует такого автора',
    // HttpStatus.BAD_REQUEST,
    // );
    // }
    // Поиск категории по её ID
    const _category = await this.categoriesService.findById(/*whs.*/categoryId);
    // if (!_category) {
    // throw new HttpException(
    // 'Не существует такой категории',
    // HttpStatus.BAD_REQUEST,
    // );
    // }
    const _whsEntity = new WhsEntity();
     
    // console.log('whs ', whs);
    // console.log('whs.cover ', whs.cover);
    if (cover?.originalname) {
      console.log('controller cover.filename ', cover.originalname);
    _whsEntity.cover = PATH_NEWS + cover.originalname;
    }
    //_whsEntity.cover = whs.cover;
    _whsEntity.cod_whs = whs.cod_whs;
    _whsEntity.name_whs = whs.name_whs;
    _whsEntity.cod_okato = whs.cod_okato;
    _whsEntity.dateInput = whs.dateInput;
    //const dateInput = String(categoryId);
    //_whsEntity.categoryId = dateInput;
    // Добавление пользователя в связь
    _whsEntity.user = _user;
    // Добавление категории в связь
    _whsEntity.category = _category;
    //console.log('whs controller _whsEntity ', _whsEntity);
    const _whs = await this.whsService.create(_whsEntity);
    //console.log('whs controller _whs ', _whs);
    // await this.mailService.sendNewWhsForAdmins(
    // ['abram1312@yandex.ru'],
    // _whs,
    //);
    //console.log('whs conroller return ');
    return _whs;
    // @Render('whs-list') 
       
    // {const whs = await this.whsService.findAll();
    // //console.log('whs ', whs);
    // return { whs, cod_whs: 'Список новостей!' };}
    //location.href = '/whs/all';
    //fetch("http://localhost:3000/whs/all");
     }

  @Get('/api/detail/:id')
  @Render('whs-detail')
  get(@Param('id') id: string) {
    var _whsEntity = new WhsEntity();
    const idInt = parseInt(id);
    const whs =  this.whsService.findById(idInt);
    whs.then((x) => {
      console.log('then ', x); // 'originalResult'
      return {x};
  });
    console.log("whs-detailwhs", whs);
    //_whsEntity.cod_whs =  whs.then
    const whsThen = whs.then;
    console.log("whs-detail", _whsEntity);
    console.log("whsThen", whsThen);
    
    //const gts = this.gtsService.find(idInt);
    //console.log("gts", gts);
    // return {
    //   //...whs,
    //   //gts,
    // };
  }

  @Get('/api/all')
  async getAll()/*: Whs[]*/ {
    console.log('getAll');
    const whs = await this.whsService.findAll();
    //console.log(whs);
    return whs;
  }

  @Get('/all') 
  @Render('whs-list')
  async getAllView() {
    const whs = await this.whsService.findAll();
    const userId = Number(1);
    const _user = await this.usersService.getuser(/*whs.cod_okatoId*/userId);
    //whs[1].user = _user;
    whs.forEach(async (value, key) => {
      const _user = await this.usersService.getuser(/*whs.cod_okatoId*/userId);
      whs[key].user = _user;
      console.log('controller get/all whs.id ', value.id);
    });
    console.log('controller get/all whs ', whs);
    //console.log('controller get/all whs.user ', whs[1].user.firstName);
    return { whs, title: 'Список ВХС' };
  }
  @Get('/detail/:id')
  @Render('whs-detail')
  async getid(@Param('id') id: string) {
    const idInt = parseInt(id);
    const whs = await this.whsService.findById(idInt);
    console.log('detailwhs ', whs);
    return  whs ;
  }

  @Get('/edit/:id')
  @Render('whs-edit')
  async edit(@Param('id') id: string) {
    const idInt = parseInt(id);
    const whs = await this.whsService.findById(idInt);
    console.log('controller whs detailwhs ', whs);
    return  {whs} ;
  }

  @Post('/edit')
  @UseInterceptors(FileInterceptor('cover'))
  async editWhs(
    @Body() whs: EditWhsDto,
    
    @UploadedFile() cover: Express.Multer.File    ) {
      console.log('controller whs cover ', cover);
      //const cover = '';
      const userId = Number(1);//** */
      const categoryId = Number(1);//** */
    // Поиск пользователя по его ID
    const _user = await this.usersService.getuser(/*whs.cod_okatoId*/userId);
    // if (!_user) {
    // throw new HttpException(
    // 'Не существует такого автора',
    // HttpStatus.BAD_REQUEST,
    // );
    // }
    // Поиск категории по её ID
    const _category = await this.categoriesService.findById(/*whs.*/categoryId);
    // if (!_category) {
    // throw new HttpException(
    // 'Не существует такой категории',
    // HttpStatus.BAD_REQUEST,
    // );
    // }
    const _whsEntity = new WhsEntity();
     
    // console.log('whs ', whs);
    // console.log('whs.cover ', whs.cover);
    if (cover?.originalname) {
      console.log('controller cover.filename ', cover.originalname);
    _whsEntity.cover = PATH_NEWS + cover.originalname;
    }
    //_whsEntity.cover = whs.cover;
    _whsEntity.id = Number(whs.id);
    _whsEntity.cod_whs = whs.cod_whs;
    _whsEntity.name_whs = whs.name_whs;
    _whsEntity.cod_okato = whs.cod_okato;
    _whsEntity.dateInput = whs.dateInput;
    //const dateInput = String(categoryId);
    //_whsEntity.categoryId = dateInput;
    // Добавление пользователя в связь
    _whsEntity.user = _user;
    // Добавление категории в связь
    _whsEntity.category = _category;
    console.log('whs controller _whsEntity ', _whsEntity);
    const _whs = await this.whsService.edit(_whsEntity);
    console.log('whs controller _whs ', _whs);
    // await this.mailService.sendNewWhsForAdmins(
    // ['abram1312@yandex.ru'],
    // _whs,
    //);
    //console.log('whs conroller return ');
    return _whs;
    // @Render('whs-list') 
       
    // {const whs = await this.whsService.findAll();
    // //console.log('whs ', whs);
    // return { whs, cod_whs: 'Список новостей!' };}
    //location.href = '/whs/all';
    //fetch("http://localhost:3000/whs/all");
     }

  @Get('create/whs')
  @Render('create-whs')
  
  async createView() {
    console.log('create/new(get)');
    return {};
  }

  // async createView(
  //   @Body() whs: CreateWhsDto,
  //   @UploadedFile() cover: Express.Multer.File,
  //   ) {
  //     console.log('create/new(get)');
  //   // Поиск пользователя по его ID
  //   const _user = await this.usersService.getuser(whs.cod_okatoId);
  //   if (!_user) {
  //   throw new HttpException(
  //   'Не существует такого автора',
  //   HttpStatus.BAD_REQUEST,
  //   );
  //   }
  //   // Поиск категории по её ID
  //   const _category = await this.categoriesService.findById(whs.categoryId);
  //   if (!_category) {
  //   throw new HttpException(
  //   'Не существует такой категории',
  //   HttpStatus.BAD_REQUEST,
  //   );
  //   }
  //   const _whsEntity = new WhsEntity();
  //   if (cover?.filename) {
  //   _whsEntity.cover = PATH_NEWS + cover.filename;
  //   }
  //   _whsEntity.cod_whs = whs.cod_whs;
  //   _whsEntity.name_whs = whs.name_whs;
  //   // Добавление пользователя в связь
  //   _whsEntity.user = _user;
  //   // Добавление категории в связь
  //   _whsEntity.category = _category;
  //   const _whs = await this.whsService.create(_whsEntity);
  //   // await this.mailService.sendNewWhsForAdmins(
  //   // ['snezhkinv@yandex.ru', 'snezhkinv20@gmail.com'],
  //   // _whs,
  //   // );
  //   return _whs;
  //   }

  // @Get('/detail/:id')
  // getDetailView(@Param('id') id: string) {
  //   const inInt = parseInt(id);
  //   const whs = this.whsService.find(inInt);
  //   const gts = this.gtsService.find(inInt);
    
  //   const content = renderWhsDetail(whs, gts);

  //   return renderTemplate(content, {
  //     cod_whs: whs.cod_whs,
  //     name_whs: whs.name_whs,
  //   });
  // }

  @Post('/api')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )


  //test() {console.log('postapi');}

  async create(
    @Body() whs: CreateWhsDto,
    @UploadedFile() cover,
  ): Promise<Whs> {
    const fileExtension = cover.originalname.split('.').reverse()[0];
    if (!fileExtension || !fileExtension.match(/(jpg|jpeg|png|gif)$/)) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Неверный формат данных',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (cover?.filename) {
      whs.cover = PATH_NEWS + cover.filename;
    }

         const userId = Number(1);//** */
      const categoryId = Number(1);//** */
    // Поиск пользователя по его ID
    const _user = await this.usersService.getuser(/*whs.cod_okatoId*/userId);
    if (!_user) {
    throw new HttpException(
    'Не существует такого автора',
    HttpStatus.BAD_REQUEST,
    );
    }
    // Поиск категории по её ID
    const _category = await this.categoriesService.findById(/*whs.*/categoryId);
    if (!_category) {
    throw new HttpException(
    'Не существует такой категории',
    HttpStatus.BAD_REQUEST,
    );
    }

    const _whsEntity = new WhsEntity();
    _whsEntity.cod_whs = whs.cod_whs;
    _whsEntity.name_whs = whs.name_whs;
    // const dateInput = String(whs.categoryId);
    // _whsEntity.categoryId = whs.categoryId;
   // _whsEntity.user = _user;
    //_whsEntity.category = _category;
    _whsEntity.cover = whs.cover;
    console.log('whs conroller _whsEntity ', _whsEntity);

    const createdWhs = await this.whsService.create(/*whs*/_whsEntity);
    // await this.mailService.sendNewWhsForAdmins(
    //   [
    //     'abram1312@yandex.ru',
                
    //     ],
    //   createdWhs,
    // );
    console.log('whs conroller return ');
    return createdWhs;
  }

  // async create(
  //   @Body() whs: CreateWhsDto,
  //   @UploadedFile() cover: Express.Multer.File,
  //   ) {
  //     //console.log('создаём пустую entity-схему');
  //   const _whsEntity = new WhsEntity(); // создаём пустую entity-схему
  //   if (cover?.filename?.length > 0) {
  //   _whsEntity.cover = PATH_NEWS + cover.filename; // записываем в поле cover-значения
  //   }
  //   _whsEntity.cod_whs = whs.cod_whs; // записываем в поле cod_whs-значения
  //   _whsEntity.name_whs = whs.name_whs; // записываем в поле name_whs-значения
  //   _whsEntity.cod_okato = whs.cod_okato;
  //   // Обращаемся к методу сервиса и передаём созданную схему
  //   const _whs = await this.whsService.create(_whsEntity);
  //   //console.log('_whs', _whs);
  //   // await this.mailService.sendNewWhsForAdmins(
  //   // ['abram1312@yandex.ru'],
  //   // _whs,
  //   //);
  //   return _whs;
  //   }
 

  // @Put('/api/:id')
  // edit(@Param('id') id: string, @Body() whs: EditWhsDto): Whs {
  //   const idInt = parseInt(id);



  //   const whsOld = this.whsService.whs.find((whs) => whs.id === idInt)
  //   // console.log('whsOld ', whsOld)
  //   // if(whs.cod_okato) {console.log('whs ', whsOld.cod_okato, ' ',whs.cod_okato)}
  //   // if(whs.name_whs) {console.log('whs ', whsOld.name_whs, ' ',whs.name_whs)}
  //   // if(whs.cod_whs) {console.log('whs ', whsOld.cod_whs, ' ',whs.cod_whs)}
  //   var message = '';
  //   if(whs.cod_okato) {message = message + 'автор было: ' + whsOld.cod_okato + ' стало: '+ whs.cod_okato +'      ' +"\r\n"}
  //   if(whs.name_whs) {message = message + 'содержание было: ' + whsOld.name_whs + ' стало: '+ whs.name_whs +'      ' + "\r\n"}
  //   if(whs.cod_whs) {message = message + 'заголовок было: ' + whsOld.cod_whs + ' стало: '+ whs.cod_whs +'      ' + "\r\n"}
  //   //console.log(message);

  //    this.mailService.sendEdit('abram1312@yandex.ru', message);

  //   return this.whsService.edit(idInt, whs);
  // }

  @Get('/api/:id')
  @Render('whs-delete')
  async remove(@Param('id') id: string) {
    console.log('controller delete id = ', id);
    const idInt = parseInt(id);
    
    const whs =  await this.whsService.findById(idInt);
    const isRemoved = this.whsService.remove(idInt);
    console.log('controller delete whs ', whs);
      return whs;
    //return isRemoved ? 'ВХС удалена' : 'Передан неверный идентификатор';
    //'<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>    <script> alert("ВХС удалена");window.location.href = "whs/all";</script>'
    // : '<script> alert("Передан неверный идентификатор");window.location.href = "whs/all";</script>';
  }
}
