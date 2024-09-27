import { Module } from '@nestjs/common';
import { RouterService } from './router.service';
import { RouterController } from './router.controller';
import { UserService } from 'src/user/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.entity';
import { History } from 'src/user/entities/history.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, History])],
  controllers: [RouterController],
  providers: [RouterService, UserService],
})
export class RouterModule {}
