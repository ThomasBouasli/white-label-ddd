import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from '@module/user/domain/user/user';
import { MockUserRepository } from '@module/user/providers/user-repository/mock-user-repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let module: TestingModule;
  let controller: AuthController;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        {
          provide: 'UserRepository',
          useClass: MockUserRepository,
        },
        AuthService,
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login a user', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    await module.get<MockUserRepository>('UserRepository').create(user);

    const result = await controller.login({
      user: {
        email: 'john.doe@gmail.com',
        password: '123456',
      },
    });

    console.log(result);

    expect(result).toBeDefined();
  });
});
