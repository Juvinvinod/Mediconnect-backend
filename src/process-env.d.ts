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
      RAZORPAY_KEY: string;
      RAZORPAY_SECRET: string;
      NM_EMAIL: string;
      NM_PASS: string;
      // add more environment variables and their types here
    }
  }
}

export {};
