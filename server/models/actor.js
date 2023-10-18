import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ActorSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  about: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    trim: true,
    required: true,
  },
  avatar: {
    type: Object,
    url: String,
    public_id: String
  }
}, {timesStamps: true});

ActorSchema.index({ name: "text" });

const Actor = mongoose.model("actor", ActorSchema);

export default Actor;
