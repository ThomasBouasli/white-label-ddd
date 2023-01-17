export class RegisterUserDTO {
  name: string;
  email: string;
  password: string;
  roleId: string;
}

export class LoginDTO {
  email: string;
  password: string;
}
