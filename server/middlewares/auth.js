import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const Auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    const trimmedToken = token?.trim();

    if (!token) return res.status(400).json("Invalid token!");
    const jwtToken = trimmedToken.split("Bearer")[1]?.trim();
    
    if (!jwtToken) return res.status(400).json("Token not found!");
    const decode = jwt.verify(jwtToken, process.env.Secret_Key);
    
    const { userId } = decode;
    const user = await User.findById({ _id: userId });
    
    if (!user) return res.status(400).json("Token related user not found");
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const isAdmin = (req, res, next) => {
  const { user } = req;
  if (user.role !== "admin")
    return res.status(400).json("Unauthorized Access!");

  next();
};
