import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  Render
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { GtsService } from './gts.service';
import { CreateGtsDto } from './dtos/create-gts-dto';
import { EditGtsDto } from './dtos/edit-gts-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { HelperFileLoader } from '../../utils/HelperFileLoader';

const PATH_NEWS = '/whs-static/';
HelperFileLoader.path = PATH_NEWS;
//GtsService.create1()
@Controller('gts')
export class GtsController {
  constructor(private readonly gtsService: GtsService) {}
  
  @Get('create/gts')
  @Render('create-gts')
  async createView() {
    return {};
  }
  @Post('/api/:idWhs')
  //@Render('create-gts')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
  create(
    @Param('idWhs') idWhs: string,
    @Body() gts: CreateGtsDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    if (avatar?.filename) {
      gts.avatar = PATH_NEWS + avatar.filename;
    }
    const idWhsInt = parseInt(idWhs);
    return this.gtsService.create(idWhsInt, gts);
  }

  @Put('/api/:idWhs/:idGts')
  edit(
    @Param('idWhs') idWhs: string,
    @Param('idGts') idGts: string,
    @Body() gts: EditGtsDto,
  ) {
    const idWhsInt = parseInt(idWhs);
    const idGtsInt = parseInt(idGts);
    return this.gtsService.edit(idWhsInt, idGtsInt, gts);
  }

  @Get('/api/details/:idWhs')
  @Render('gts-list')
  get(@Param('idWhs') idWhs: string) {
    const idWhsInt = parseInt(idWhs);
    //console.log('/api/details/:idWhs', this.gtsService.find(idWhsInt));
    const gts = this.gtsService.find(idWhsInt);
    return /*this.gtsService.find(idWhsInt)*/{gts};
  }

  @Delete('/api/details/:idWhs/:idGts')
  remove(
    @Param('idWhs') idWhs: string,
    @Param('idGts') idGts: string,
  ) {
    const idWhsInt = parseInt(idWhs);
    const idGtsInt = parseInt(idGts);
    return this.gtsService.remove(idWhsInt, idGtsInt);
  }
}
