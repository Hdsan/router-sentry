import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RouterService } from './router/router.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Obtendo o serviço RouterService através da injeção de dependência
  const routerService = app.get(RouterService);

  // Chamando o método verifyRouter do RouterService
  routerService.verifyRouter();

  await app.listen(3000);
}

bootstrap();
