// app.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { RouterModule } from './router/router.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    RouterModule,
  ],
})
export class AppModule {}