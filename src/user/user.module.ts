import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { History } from 'src/user/entities/history.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, History])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
