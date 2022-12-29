export interface TokenProvider {
  generateToken(payload: any): Promise<string>;
  verifyToken(token: string): Promise<any>;
}
