import { isValidObjectId } from "mongoose";
import passwordResetToken from "../models/passwordResetToken.js";

export const verifyResetPassToken =async (req, res, next) => {
    const { token, userId} = req.body;
    if (!token || !token.trim() || !isValidObjectId(userId))
      return res.status(400).json({ error: "Invalid request" });
    const resetToken = await passwordResetToken.findOne({ owner: userId });
    if(!resetToken) return res.status(400).json({ error: "unauthorized request, invalid request!" });

    const matched = await resetToken.compareToken(token) 
    if(!matched) return res
      .status(400)
      .json({ error: "unauthorized request, invalid request!" });

    req.resetToken = resetToken;
    next();
};