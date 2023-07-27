import jwt from "jsonwebtoken";

export type JwtPayload = {
  id: string;
};

const createToken = (payload: JwtPayload) => {
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string
  );

  return { accessToken };
};

const verifyToken = (token: string) => {
  if (!token) return { isValid: false, user: null };

  const payload = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string
  ) as JwtPayload;

  const user = { id: payload.id };

  return { isValid: true, user };
};

export default { createToken, verifyToken };
