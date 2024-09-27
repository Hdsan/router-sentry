import { Column, Model, Table, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { User } from './user.entity';
@Table
export class History extends Model<History> {

    @ForeignKey(() => User)
    @Column
    userId: string; 

    @BelongsTo(() => User)
    user: User;

    @Column
    date: string;
}
