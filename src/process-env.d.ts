declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      CLOUDINARY_USER_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      // add more environment variables and their types here
    }
  }
}

export {};
