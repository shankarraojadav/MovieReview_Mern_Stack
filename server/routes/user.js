import express from "express";
import { createUser, forgetPassword,notFound, resendEmailVerToken, resetPassword, sendResetPasswordTokenStatus, signIn, verifyEmail } from "../controllers/userController.js";
import { userValidtor, signInValidator, validatePassword } from "../middlewares/validator.js";
import { verifyResetPassToken } from "../middlewares/user.js";
import {Auth} from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", userValidtor, createUser);
router.post("/verifyemail", verifyEmail);
router.post("/resendemailtoken", resendEmailVerToken);
router.post("/forget-pass", forgetPassword);
router.post("/verify-pass-reset-token", verifyResetPassToken, sendResetPasswordTokenStatus);
router.post("/reset-password", validatePassword, resetPassword)
router.post("/login",signInValidator, signIn);
router.get('/isAuthVerify',Auth, (req, res) => {
    const {user} = req;
    res.status(200).json({ user: {
        id: user._id, name:user.name,
        email: user.email,
        isVerified : user.isVerified,
        role: user.role
    } })
});
router.get("/*", notFound)



export default router;
