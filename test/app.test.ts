/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type INestApplication, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type TestingModule, Test } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('Token API (End-to-End)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);

    const user_id = 'febb25f9-008c-452b-aacf-e15f053c0373';
    const email = 'example@gmail.com';
    const payload = {
      user_id,
      email,
    };
    authToken = jwtService.sign(payload);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 401 if token is missing', () =>
    request(app.getHttpServer())
      .get('/category')
      .expect(HttpStatus.UNAUTHORIZED));

  it('should return 401 if token is invalid', () =>
    request(app.getHttpServer())
      .get('/category')
      .set('Authorization', 'Bearer invalid_token')
      .expect(HttpStatus.UNAUTHORIZED));

  it('should return 200 if token is valid', () =>
    request(app.getHttpServer())
      .get('/category')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(HttpStatus.OK));
});
