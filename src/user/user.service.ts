import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { History } from './entities/history.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User,
    @InjectModel(History)
    private readonly historyRepository: typeof History,
  ) { }

  async create(createUserDto: CreateUserDto) {
    await this.userRepository.create(createUserDto);
  }

  async checkIpActivity(devices: string[]) {
    for (let i = 1; i < devices.length; i++) {
      const [ip, mac] = devices[i].split(' ', 2);
      const device = { ip, mac };
      await this.registerOrCheckIn(device);
    }
  }

  async registerOrCheckIn(device) {
    try {
      const blacklist = ['224', '239', '255', '172']
      if (
        blacklist.includes(device.ip.split('.')[0])
      ) {
        return
      }
      const existentUser = await this.userRepository.findOne({
        where: { ip: device.ip },
      });

      const activity = await this.historyRepository.create({
        userId: existentUser?.id,
        date: new Date().toString(),
      });

      if (!existentUser) {
        const newUser = await this.userRepository.create({
          name: '',
          ip: device.ip,
          mac: device.mac,
        });

        await activity.update({ userId: newUser.id });
      }
    } catch (err) {
      console.error(err);
    }
  }

  findAll() {
    return this.userRepository.findAll({ include: [History] });
  }

  findOne(ip: number) {
    return this.userRepository.findOne({
      where: { ip },
      include: [History],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findByPk(id);
    if (user) {
      await user.update(updateUserDto);
    }
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (user) {
      await user.destroy();
    }
  }
}
