import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the API overview', () => {
      expect(appController.getOverview()).toEqual({
        name: 'friend_zone',
        description:
          'NestJS backend for friends, zones, flags, and relationships',
        modules: ['friends', 'zones', 'flags', 'relationship'],
        healthCheck: '/health',
      });
    });

    it('should return the health payload', () => {
      expect(appController.getHealth()).toEqual({
        status: 'ok',
        service: 'friend_zone',
      });
    });
  });
});
