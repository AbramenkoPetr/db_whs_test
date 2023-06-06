import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { CategoriesEntity } from '../categories/categories.entity';

 import { UsersEntity } from '../users/users.entity';
 import { GtsEntity } from './gts/gts.entity';
@Entity('whs')
export class WhsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    cod_whs: string;

    @Column('text')
    name_whs: string;

    @Column('text')
    cod_okato: string;

    @Column('text', { nullable: true })
    dateInput: string;

    @Column('text', { nullable: true })
    cover: string;

    // @Column('text'/*, { nullable: true }*/)
    // cover: string;
    // @OneToMany(() => GtsEntity, (commets) => commets.user)
    // gts: GtsEntity;
     @ManyToOne(() => CategoriesEntity, (category) => category.whs)
     category: CategoriesEntity;

     @ManyToOne(() => UsersEntity, (user) => user.whs)
     user: UsersEntity;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column('text', { nullable: true })
    categoryId: number;

    @Column('text', { nullable: true })
    userId: number;

}
