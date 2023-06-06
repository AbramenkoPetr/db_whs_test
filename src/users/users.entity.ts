import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
UpdateDateColumn,
OneToMany,
ManyToOne,
} from 'typeorm';
import { WhsEntity } from '../whs/whs.entity';
import { GtsEntity } from '../whs/gts/gts.entity';
@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text')
    firstName: string;
    @Column('text')
    lastName: string;
    @Column('text')
    email: string;
    @Column('text')
    role: string;

    @OneToMany(() => WhsEntity, (whs) => whs.user)
    whs: WhsEntity[];
    
    @ManyToOne(() => GtsEntity, (gts) => gts.user)
    gts: GtsEntity[];
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
