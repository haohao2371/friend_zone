import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlagDto } from './dto/create-flag.dto';
import { UpdateFlagDto } from './dto/update-flag.dto';
import { Flag } from './entities/flag.entity';

@Injectable()
export class FlagsService {
  private readonly flags: Flag[] = [
    {
      id: 1,
      code: 'trusted',
      description: 'Marks a trusted friend profile.',
      severity: 'low',
    },
  ];

  create(createFlagDto: CreateFlagDto) {
    const flag: Flag = {
      id: this.getNextId(),
      ...createFlagDto,
    };

    this.flags.push(flag);
    return flag;
  }

  findAll() {
    return this.flags;
  }

  findOne(id: number) {
    return this.findById(id);
  }

  update(id: number, updateFlagDto: UpdateFlagDto) {
    const flag = this.findById(id);
    Object.assign(flag, updateFlagDto);
    return flag;
  }

  remove(id: number) {
    const index = this.flags.findIndex((flag) => flag.id === id);
    if (index === -1) {
      throw new NotFoundException('Flag not found');
    }

    return this.flags.splice(index, 1)[0];
  }

  private findById(id: number) {
    const flag = this.flags.find((item) => item.id === id);
    if (!flag) {
      throw new NotFoundException('Flag not found');
    }

    return flag;
  }

  private getNextId() {
    return Math.max(...this.flags.map((flag) => flag.id), 0) + 1;
  }
}
