import jwt from "jsonwebtoken";

const generateToken = (payload, expiredTime) => {
  return jwt.sign(payload, process.env.api_key, {
    expiresIn: expiredTime,
  });
};

export { generateToken };
