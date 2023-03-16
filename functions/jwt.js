import jwt from "jsonwebtoken";

const generateToken = (payload, expiredTime) => {
  return jwt.sign(payload, process.env.apikey, {
    expiresIn: expiredTime,
  });
};

export { generateToken };
