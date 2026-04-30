export {};

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      userId: string;
      name: string;
      role: string;
    };
  }
}
