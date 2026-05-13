import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Zone } from './entities/zone.entity';

@Injectable()
export class ZonesService {
  private readonly zones: Zone[] = [
    {
      id: 1,
      name: 'Main Hangout',
      description: 'Primary space for close friends.',
      visibility: 'public',
    },
  ];

  create(createZoneDto: CreateZoneDto) {
    const zone: Zone = {
      id: this.getNextId(),
      ...createZoneDto,
    };

    this.zones.push(zone);
    return zone;
  }

  findAll() {
    return this.zones;
  }

  findOne(id: number) {
    return this.findById(id);
  }

  update(id: number, updateZoneDto: UpdateZoneDto) {
    const zone = this.findById(id);
    Object.assign(zone, updateZoneDto);
    return zone;
  }

  remove(id: number) {
    const index = this.zones.findIndex((zone) => zone.id === id);
    if (index === -1) {
      throw new NotFoundException('Zone not found');
    }

    return this.zones.splice(index, 1)[0];
  }

  private findById(id: number) {
    const zone = this.zones.find((item) => item.id === id);
    if (!zone) {
      throw new NotFoundException('Zone not found');
    }

    return zone;
  }

  private getNextId() {
    return Math.max(...this.zones.map((zone) => zone.id), 0) + 1;
  }
}
