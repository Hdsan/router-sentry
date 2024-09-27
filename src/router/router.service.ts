import { Injectable } from '@nestjs/common';
import { CreateRouterDto } from './dto/create-router.dto';
import { UpdateRouterDto } from './dto/update-router.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { exec } from 'child_process';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RouterService {
  constructor(private readonly userService: UserService) { }

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    this.verifyRouter();
  }

  verifyRouter() {
    console.log("router")
    exec('arp -a', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar o comando: ${error.message}`);
        return [];
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }

      const regex = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+([a-fA-F0-9\-]{17})/g;
      let match;
      const resultArray = [];

      while ((match = regex.exec(stdout)) !== null) {
        resultArray.push(`${match[1]} ${match[2]}`);
      }

      console.log(resultArray);
      this.userService.checkIpActivity(resultArray);
    });
  }

  create(createRouterDto: CreateRouterDto) {
    return 'This action adds a new router';
  }

  findAll() {
    return `This action returns all router`;
  }

  findOne(id: number) {
    return `This action returns a #${id} router`;
  }

  update(id: number, updateRouterDto: UpdateRouterDto) {
    return `This action updates a #${id} router`;
  }

  remove(id: number) {
    return `This action removes a #${id} router`;
  }
}

