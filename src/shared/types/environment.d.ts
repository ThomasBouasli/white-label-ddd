declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      DATABASE_URL: string;
      MAIL_HOST: string;
      MAIL_PORT: string;
      MAIL_SECURE: string;
      MAIL_USER: string;
      MAIL_PASS: string;
      MAIL_FROM: string;
      APP_WEB_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
