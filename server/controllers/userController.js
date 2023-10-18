import User from "../models/userSchema.js";
import EmailVerToken from "../models/emailVerificationToken.js";
import {
  generateOTP,
  generateMailTransporter,
  generateRandomByte,
} from "../utils/mail.js";
import { isValidObjectId } from "mongoose";
import passwordResetToken from "../models/passwordResetToken.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(500).json("This email is already in use!");
    }
    const newUser = new User({ name, email, password });
    await newUser.save();

    // generate 6 digit otp
    let OTP = generateOTP();

    // store otp inside our db
    try {
      const newEmailVerificationToken = new EmailVerToken({
        owner: newUser._id,
        token: OTP,
      });

      await newEmailVerificationToken.save();
    } catch (error) {
      res.status(400).json(error)
    }

    // send that otp to our user

    const transport = await generateMailTransporter();
    try {
      transport.sendMail({
        from: "shankarjadav980@gmail.com",
        to: newUser.email,
        subject: "Email Verification",
        html: `
      <p>You verification OTP</p>
      <h1>${OTP}</h1>
    `,
      });
    } catch (error) {
      res.status(400).json(error);
    }

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isVerified: newUser.isVerified
      },
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "error in create user section", error });
  }
};

// verify email
export const verifyEmail = async (req, res) => {
  try {
    const { userId, OTP } = req.body;

    // console.log(req.body);

    if (!isValidObjectId(userId)) return res.json({ error: "Invalid user!" });

    const user = await User.findById(userId);
    if (!user) return res.json({ error: "User not found!" });

    if (user.isVerified)
      return res.json({ error: "User is already verified!" });

    const token = await EmailVerToken.findOne({ owner: userId });

    if (!token) return res.json({ error: "token not found!" });

    const isMatched = await token.compareToken(OTP);

    if (!isMatched) return res.json({ error: "please submit a valid OTP" });

    user.isVerified = true;
    await user.save();

    await EmailVerToken.findByIdAndDelete(token._id);

    const transport = await generateMailTransporter();

    transport.sendMail({
      from: "verification@reviewapp.com",
      to: user.email,
      subject: "Welcome Email",
      html: `
    <h1>Wlecome to our app and thanks for choosing us</h1>`,
    });

    const { _id, name, email, isVerified } = user;

    const jwtToken = await jwt.sign({ userId: _id }, process.env.Secret_Key);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: jwtToken,
        role: user.role,
        isVerified : isVerified
      },
      message: "Your email is verified.",
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "error in verifyemail section", error: error.message });
  }
};

// resend email token
export const resendEmailVerToken = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.json({ error: "user not found!" });

    if (user.isVerified)
      return res.json({ error: "This email id already verified" });

    const alreadyHadtoken = await EmailVerToken.findOne({ owner: userId });

    if (alreadyHadtoken)
      return res.json({
        error: "Only after 30minutes you can request for another OTP",
      });

    let OTP = generateOTP();

    const newEmailVerToken = new EmailVerToken({
      owner: user._id,
      token: OTP,
    });

    await newEmailVerToken.save();

    const transport = generateMailTransporter();
    transport.sendMail({
      from: "verification@reviewapp.com",
      to: user.email,
      subject: "Email Verification",
      html: `
      <p>You verification OTP</p>
      <h1>${OTP}</h1>
    `,
    });

    res.json({
      message: "New OTP has been sent to your registered email accout.",
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "error in resendEmailVerToken", error: error.message });
  }
};

// forget password

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: "Email is missing" });

    const oldUser = await User.findOne({ email });

    if (!oldUser) return res.status(400).json({ error: "User not found!" });

    const alreadyHadtoken = await passwordResetToken.findOne({
      owner: oldUser._id,
    });

    if (alreadyHadtoken)
      return res.status(400).json({
        error: "you can request after 30minutes to reset password!",
      });

    const token = await generateRandomByte();

    const newPassResetToken = await passwordResetToken({
      owner: oldUser._id,
      token,
    });

    await newPassResetToken.save();

    const resetPasswordUrl = `http://localhost:5173/reset-password?token=${token}&id=${oldUser._id}`;

    const transport = generateMailTransporter();

    transport.sendMail({
      from: "security@reviewapp.com",
      to: oldUser.email,
      subject: "Reset Password Link",
      html: `
      <p>Click here to reset password</p>
      <a href='${resetPasswordUrl}'>Change Password</a>
    `,
    });

    res.json({ message: "Link sent to your email!" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "error in forgot password", error: error.message });
  }
};

export const sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

// ?passwpord reset

export const resetPassword = async (req, res) => {
  try {
    const { newpassword, userId } = req.body;
    const user = await User.findById(userId);
    const matched = await user.comparePassword(newpassword);

    if (matched)
      return res
        .status(400)
        .json({ error: "New password must be different from old password!" });

    user.password = newpassword;
    await user.save();

    try {
      await passwordResetToken.findByIdAndDelete(req.resetToken._id);
    } catch (error) {
      res.status(400).json(error)
    }
    const transport = generateMailTransporter();

    transport.sendMail({
      from: "security@reviewapp.com",
      to: user.email,
      subject: "Password Reset Successfully",
      html: `<h1>Password Reset Successfully</h1>
    <p>Now you can use new password.</p>`,
    });

    res.status(200).json({
      message: "password reset successfully, now you can use new password",
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong while resetiing password",
      error: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Email/password not matching!" });

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword)
      return res.status(400).json({ error: "Email/password mismatch!" });

    const jwtToken = jwt.sign({ userId: user._id }, process.env.Secret_Key);

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: jwtToken,
        role: user.role,
        isVerified : user.isVerified
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Email/password mismatch!", error: error.message });
  }
};

export const notFound = (req, res) => {
  res.status(404).json(`
  <h1>Page Not Found</h1`);
};
