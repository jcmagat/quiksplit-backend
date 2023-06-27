import jwt from "jsonwebtoken";

type Payload = {
  id: string;
};

const createToken = (payload: Payload) => {
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string
  );

  return { accessToken };
};

export default { createToken };
