import { Test, TestingModule } from '@nestjs/testing';
import { RouterController } from './router.controller';
import { RouterService } from './router.service';

describe('RouterController', () => {
  let controller: RouterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RouterController],
      providers: [RouterService],
    }).compile();

    controller = module.get<RouterController>(RouterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
