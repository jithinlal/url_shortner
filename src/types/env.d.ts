declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DOMAIN: string;
      PORT: string;
      NODE_ENV: string;
      API_VERSION: string;
      SHORT_URL_BASE: string;
    }
  }
}

export {}
