import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesEntity } from './categories.entity';
@Injectable()
export class CategoriesService {
constructor(
@InjectRepository(CategoriesEntity)
private readonly categoriesRepository: Repository<CategoriesEntity>,
) {}
async create(name: string) {
return await this.categoriesRepository.save({ name });
}
//Найти категорию по id
async findById(id: number): Promise<CategoriesEntity> {
    //const id = 1;
    const cats = await this.categoriesRepository.find();
    const cat = cats.find(el => el.id == id);
    console.log('cat ',cat);
return cat //await this.categoriesRepository.findOne({ id });
}
// async getuser() {
//     const id = 1;
    
//     const users = await this.categoriesRepository.find();
//     const user = users.find(el => el.id == id);
//     //console.log('user ', user);
//     return user;
// }
}
