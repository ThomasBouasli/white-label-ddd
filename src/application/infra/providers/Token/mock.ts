import { TokenProvider } from './interface';

export class MockTokenProvider implements TokenProvider {
  async generateToken(payload: any): Promise<string> {
    return Buffer.from(JSON.stringify(payload)).toString('base64');
  }

  async verifyToken(token: string): Promise<any> {
    return JSON.parse(Buffer.from(token, 'base64').toString('ascii'));
  }
}
