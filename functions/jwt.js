import jwt from "jsonwebtoken";

const generateToken = (payload, expiredTime) => {
  return jwt.sign(payload, process.env.api_key, {
    expiresIn: expiredTime,
  });
};
console.log(
  "🚀 ~ file: jwt.js:5 ~ generateToken ~ process.env.api_key:",
  process.env.api_key
);

export { generateToken };
