import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RouterService } from './router/router.service'
;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const routerService = app.get(RouterService);
  routerService.verifyRouter();
  await app.listen(3000);
}
bootstrap();
