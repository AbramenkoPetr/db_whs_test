import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { WhsEntity } from '../whs/whs.entity';

@Entity('categories')
export class CategoriesEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text')
    name: string;
     @OneToMany(() => WhsEntity, (whs) => whs.category)
     whs: WhsEntity[];
}
