import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { History } from './history.entity';
@Table
export class User extends Model<User> {
    @Column
    name: string;

    @Column
    ip: string;

    @Column
    mac: string;

    @HasMany(() => History) 
    history: History[];
}
