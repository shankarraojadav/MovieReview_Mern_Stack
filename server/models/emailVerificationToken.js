import mongoose from "mongoose";
import bcrypt from "bcrypt";

const EmailVerificationToken =new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type:String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 1800,
    default: Date.now()
  },
});



EmailVerificationToken.pre("save", async function (next) {
    if(this.isModified("token")) {
        const hashedToken = await bcrypt.hash(this.token, 10);
        this.token = hashedToken;
    }
    next()
});

EmailVerificationToken.methods.compareToken = async function (token) {
 const result = await bcrypt.compare(token, this.token);
 return result;
}

const EmailVerToken = mongoose.model("evToken", EmailVerificationToken);
export default EmailVerToken;