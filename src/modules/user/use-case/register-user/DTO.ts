import { IsNotEmpty } from 'class-validator';

export class RegisterUserRequest {
  @IsNotEmpty({
    message: 'Nome é obrigatório',
  })
  name: string;

  @IsNotEmpty({
    message: 'Email é obrigatório',
  })
  email: string;

  @IsNotEmpty({
    message: 'Senha é obrigatória',
  })
  password: string;
}

export class RegisterUserResponse {}
