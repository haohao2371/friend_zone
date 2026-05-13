import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Friend Zone API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({
        name: 'friend_zone',
        description:
          'NestJS backend for friends, zones, flags, and relationships',
        modules: ['friends', 'zones', 'flags', 'relationship'],
        healthCheck: '/health',
      });
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer()).get('/health').expect(200).expect({
      status: 'ok',
      service: 'friend_zone',
    });
  });

  it('/friends (GET) returns seeded data', async () => {
    const response = await request(app.getHttpServer())
      .get('/friends')
      .expect(200);

    expect(response.body).toEqual([
      {
        id: 1,
        name: 'Avery',
        favoriteZoneId: 1,
        flagIds: [1],
        relationshipId: 1,
      },
    ]);
  });

  it('/zones (GET) returns seeded data', async () => {
    const response = await request(app.getHttpServer())
      .get('/zones')
      .expect(200);

    expect(response.body).toEqual([
      {
        id: 1,
        name: 'Main Hangout',
        description: 'Primary space for close friends.',
        visibility: 'public',
      },
    ]);
  });

  it('/flags (GET) returns seeded data', async () => {
    const response = await request(app.getHttpServer())
      .get('/flags')
      .expect(200);

    expect(response.body).toEqual([
      {
        id: 1,
        code: 'trusted',
        description: 'Marks a trusted friend profile.',
        severity: 'low',
      },
    ]);
  });

  it('/relationship (GET) returns seeded data', async () => {
    const response = await request(app.getHttpServer())
      .get('/relationship')
      .expect(200);

    expect(response.body).toEqual([
      {
        id: 1,
        friendId: 1,
        zoneId: 1,
        kind: 'best_friend',
        isActive: true,
      },
    ]);
  });

  it('/friends supports create, update, and delete', async () => {
    const created = await request(app.getHttpServer())
      .post('/friends')
      .send({
        name: 'Blake',
        favoriteZoneId: 1,
        flagIds: [1],
        relationshipId: 1,
      })
      .expect(201);

    expect(created.body).toEqual({
      id: 2,
      name: 'Blake',
      favoriteZoneId: 1,
      flagIds: [1],
      relationshipId: 1,
    });

    const updated = await request(app.getHttpServer())
      .patch('/friends/2')
      .send({ name: 'Blake Updated' })
      .expect(200);

    expect(updated.body).toEqual({
      id: 2,
      name: 'Blake Updated',
      favoriteZoneId: 1,
      flagIds: [1],
      relationshipId: 1,
    });

    await request(app.getHttpServer())
      .delete('/friends/2')
      .expect(200)
      .expect({
        id: 2,
        name: 'Blake Updated',
        favoriteZoneId: 1,
        flagIds: [1],
        relationshipId: 1,
      });
  });

  it('/zones supports create', async () => {
    const response = await request(app.getHttpServer())
      .post('/zones')
      .send({
        name: 'Quiet Corner',
        description: 'A private zone for deep conversations.',
        visibility: 'private',
      })
      .expect(201);

    expect(response.body).toEqual({
      id: 2,
      name: 'Quiet Corner',
      description: 'A private zone for deep conversations.',
      visibility: 'private',
    });
  });

  it('/flags supports create', async () => {
    const response = await request(app.getHttpServer())
      .post('/flags')
      .send({
        code: 'favorite',
        description: 'Highlights a favorite profile.',
        severity: 'medium',
      })
      .expect(201);

    expect(response.body).toEqual({
      id: 2,
      code: 'favorite',
      description: 'Highlights a favorite profile.',
      severity: 'medium',
    });
  });

  it('/relationship supports create', async () => {
    const response = await request(app.getHttpServer())
      .post('/relationship')
      .send({
        friendId: 1,
        zoneId: 1,
        kind: 'close_friend',
        isActive: true,
      })
      .expect(201);

    expect(response.body).toEqual({
      id: 2,
      friendId: 1,
      zoneId: 1,
      kind: 'close_friend',
      isActive: true,
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
