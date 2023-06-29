import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../service/auth.service.js";
import User from "../entity/user.entity.js";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) return res.sendStatus(401);

  const payload = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string
  ) as JwtPayload;

  req.user = { id: payload.id } as User;
  next();
};

export default { authenticateToken };
