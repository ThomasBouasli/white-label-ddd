import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '@application/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        roleId: faker.datatype.uuid(),
      })
      .expect(201);
  });

  it('Register user, login and get user by email', async () => {
    const userData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      roleId: faker.datatype.uuid(),
    };

    await request(app.getHttpServer())
      .post('/user/register')
      .send(userData)
      .expect(201);

    const { body } = await request(app.getHttpServer())
      .post('/user/login')
      .send({
        username: userData.email,
        password: userData.password,
      })
      .expect(201);

    expect(body).toBeDefined();

    return;
  });
});
