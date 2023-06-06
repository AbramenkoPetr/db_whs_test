import { Injectable } from '@nestjs/common';
import { Gts } from './gts/gts.service';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WhsEntity } from './whs.entity';
import { CreateWhsDto } from './dtos/create-whs-dto';
import { UsersEntity } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';


export interface Whs {
  id?: number;
  cod_whs: string;
  name_whs: string;
  cod_okato: string;
  dateInput?: string;
  categoryId?: number;
  countView?: number;
  createdAt?: Date;
  cover?: string;
  gts?: Comment[];
  
}

export interface WhsEdit {
  cod_whs?: string;
  name_whs?: string;
  cod_okato?: string;
  countView?: number;
  cover?: string;
  dateInput?: string;
}

export function getRandomInt(min = 1, max = 9999): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

// class whsRepository{//*/
// constructor(
//   @InjectRepository(WhsEntity)
//   private readonly whsRepository: Repository<WhsEntity>,
//   ) {}
// }//*/


@Injectable()


export class WhsService {

  constructor(
    @InjectRepository(WhsEntity)
    private  whsRepository: Repository<WhsEntity>,
    //@InjectRepository(UsersEntity)
    private usersService: UsersService,
    ) {}

    private readonly whs: Whs[] = [
    //{id: 1...},
    ];

  //   whs: Whs[] = [
  //   {
  //     id: 1,
  //     cod_whs: 'Наша первая новость',
  //     name_whs: 'Содержание новости',
  //     cod_okato: 'Петр',
  //     createdAt: '2023-02-16',
  //     countView: 12,
  //     cover: '/whs-static/cat1.gif',
  //      gts: [
  //     //   {message: 'Отличная новость',
  //     //   cod_okato: 'Аноним'},
  //      ],
     
  //   },
  // ];
    
  // create(whs: Whs): Whs {
  //   const id = getRandomInt(0, 99999);
  //   const finalWhs = {
  //     ...whs,
  //     id: id,
  //   };

  //   this.whs.push(finalWhs);
  //   return finalWhs;
  // }

  // async create(whs: WhsEntity) {
  //   //console.log('whs ',whs);
  //   return await this.whsRepository.save(whs);
  // }

  async create(whs: CreateWhsDto): Promise<WhsEntity>  {  //создать ВХС

    const whsEntity = new WhsEntity();
    whsEntity.cod_whs = whs.cod_whs;
    whsEntity.name_whs =whs.name_whs;
    whsEntity.cover = whs.cover;
    whsEntity.cod_okato =whs.cod_okato;
    whsEntity.dateInput =whs.dateInput;
    //const _user = await this.usersService.getuser(whs.userId)
    //whsEntity.user = _user;
    whsEntity.userId =Number(1);
    whsEntity.categoryId =Number(1);
    // console.log('whs service whs ', whs);
    // console.log('whs service whsEntity ', whsEntity);
    return await this.whsRepository.save(whsEntity);
  }

  find(id: Whs['id']): Whs | undefined {  //найти ВХС по id
    return this.whs.find((whs) => whs.id === id);
  }

  async findById(id): Promise<WhsEntity> {  //найти ВХС по id в БД
    const whs1s = await this.whsRepository.find({});
    const whs1 = whs1s.find(el => el.id == id);
    if(!whs1){alert('ВХС уже удалена')}
    console.log('whsservice findById whs1 ', whs1);
    return whs1;
    }

  getAll(): Whs[] {
    return this.whs;
  }

  async findAll(): Promise<WhsEntity[]> {
    const whs1 = await this.whsRepository.find({});
    //console.log('whs1 ', whs1);
    return whs1;
    }

  // edit(id: number, whs: WhsEdit): Whs | undefined {
  //   const indexEditableWhs = this.whs.findIndex((whs) => whs.id === id);
  //   if (indexEditableWhs !== -1) {
  //     this.whs[indexEditableWhs] = {
  //       ...this.whs[indexEditableWhs],
  //       ...whs,
  //     };

  //     return this.whs[indexEditableWhs];
  //   }
  //   return undefined;
  // }

  // remove(id: Whs['id']): boolean {
  //   const indexRemoveWhs = this.whs.findIndex((whs) => whs.id === id);
  //   if (indexRemoveWhs !== -1) {
  //     this.whs.splice(indexRemoveWhs, 1);
  //     return true;
  //   }
  //   return false;
  // }

  async edit(/*id: number*/_whs) {
    const id = _whs.id;
    //const _whs = await this.findById(id);
    console.log('whsservice edit _whs ', _whs);
    return await this.whsRepository.update(id, _whs);
    }

  async remove(id: number) {
    const _whs = await this.findById(id);
    return await this.whsRepository.remove(_whs);
    }

}

