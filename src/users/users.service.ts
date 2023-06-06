import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Serializable } from 'child_process';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
@Injectable()
export class UsersService {
constructor(
@InjectRepository(UsersEntity)
private readonly usersRepository: Repository<UsersEntity>,
) {}
// Возвращаемое значение может быть Promise<UsersEntity|undefined>
// Озвучить устно, что необходимо отработать крайний случай на уровне выше, если запись не произошла
async create(user) {
const userEntity = new UsersEntity();
userEntity.firstName = user.firstName;
userEntity.lastName = user.lastName;
userEntity.email = user.email;
userEntity.role = user.role;
return await this.usersRepository.save(userEntity);
}
async getuser(id) {
    //const id = 1;
    
    const users = await this.usersRepository.find();
    const user = users.find(el => el.id == id);
    //console.log('user ', user);
    return user;
}
// findOne(id: string): Promise<UsersEntity> {
//     return this.usersRepository.find().findById(id);
//   }
}
