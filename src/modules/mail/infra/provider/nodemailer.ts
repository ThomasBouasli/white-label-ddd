import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

import { MailProvider } from './interface';

@Injectable()
export class NodeMailerMailProvider implements MailProvider {
  private transporter: Transporter;
  private transportOptions = {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE === 'true',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  };

  constructor() {
    this.transporter = createTransport(this.transportOptions);
  }

  async sendEmailConfirmation(to: string, token: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject: 'Welcome to the system!',
      html: `
        <p>
          Welcome to the system!
        </p>
        <p>
          <a href="${process.env.APP_WEB_URL}/verify-email?token=${token}">
            Confirm your email
          </a>
        </p>
      `,
    });
  }
}
