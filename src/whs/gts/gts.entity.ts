import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    } from 'typeorm';
import { UsersEntity } from '../../users/users.entity';
@Entity('gts')
export class GtsEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text')
    message: string;
    @ManyToOne(() => UsersEntity, (user) => user.gts)
    user: UsersEntity;
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
