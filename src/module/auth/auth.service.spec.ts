import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from '@module/user/domain/user/user';
import { MockUserRepository } from '@module/user/providers/user-repository/mock-user-repository';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let module: TestingModule;
  let service: AuthService;

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
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login to user', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    await module.get<MockUserRepository>('UserRepository').create(user);

    const result = await service.login({
      email: 'john.doe@gmail.com',
      password: '123456',
    });

    expect(result).toBeDefined();
  });
});
