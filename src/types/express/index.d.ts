import User from "../../entity/user.entity.ts";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
