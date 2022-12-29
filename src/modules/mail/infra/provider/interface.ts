export interface MailProvider {
  sendEmailConfirmation(to: string, token: string): Promise<void>;
}
