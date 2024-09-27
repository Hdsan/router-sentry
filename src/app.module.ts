// app.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RouterModule } from './router/router.module';
import { UserModule } from './user/user.module';
import { dataBaseConfig } from './database/database.config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot(dataBaseConfig),
    UserModule,
    RouterModule],
})
export class AppModule {}