import nodemailer from "nodemailer";
import crypto from "crypto";

export const generateOTP = (otp_length = 6) => {
   try {
     let OTP = "";
     for (let i = 1; i <= otp_length; i++) {
       const randomVal = Math.round(Math.random() * 9);
       OTP += randomVal;
     }
     return OTP;
   } catch (error) {
    console.log(error)
   }
};

export const generateMailTransporter = () => {
 try {
  return nodemailer.createTransport({
     host: "sandbox.smtp.mailtrap.io",
     port: 2525,
     auth: {
       user: process.env.Mail_Env,
       pass: process.env.Mail_Env_Pass,
     },
   });
 } catch (error) {
  console.log(error)
 }
};

export const generateRandomByte = () => {
  return new Promise((resolve, reject) => {
     crypto.randomBytes(30, (err, buff) => {
       if (err) return console.log(err);
       const buffString = buff.toString("hex");

       resolve(buffString)
     });
  })
}