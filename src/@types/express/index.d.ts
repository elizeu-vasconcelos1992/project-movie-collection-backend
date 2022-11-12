import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PGPORT: number | undefined;
    }
  }
}

export {};
