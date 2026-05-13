import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getOverview() {
    return {
      name: 'friend_zone',
      description:
        'NestJS backend for friends, zones, flags, and relationships',
      modules: ['friends', 'zones', 'flags', 'relationship'],
      healthCheck: '/health',
    };
  }

  getHealth() {
    return {
      status: 'ok',
      service: 'friend_zone',
    };
  }
}
