import jwt from "jsonwebtoken";

const generateToken = (payload, expiredTime) => {
  return jwt.sign(payload, process.env.apiKey, {
    expiresIn: expiredTime,
  });
};

export { generateToken };
