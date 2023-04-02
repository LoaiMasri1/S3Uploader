declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string;
      AWS_ACCESS_KEY_ID?: string;
      AWS_SECRET_ACCESS_KEY?: string;
      AWS_BUCKET_URL?: string;
      AWS_BUCKET_NAME?: string;
    }
  }
}
export {};
