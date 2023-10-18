import Actor from "../models/actor.js";
import cloudinary from "../cloud/index.js"
import { isValidObjectId } from "mongoose";


export const createActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;

  newActor.avatar = { url: secure_url, public_id };
  if (file) {
    const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
      file.path,
      { gravity: "face", height: 500, width: 500, crop: "thumb" }
    );
    const newActor = new Actor({ name, about, gender });
  }

  await newActor.save();
  res.status(200).json({
    id: newAcotr._id,
    name,
    about,
    gender,
    avatar: newActor.avatar?.url,
  });
};

export const updateActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;
  const { actorId } = req.params;
  if (!isValidObjectId(actorId))
    return res.status(400).json("Invalid request!");

  // remove older image
  const actor = await Actor.findById(actorId);
  if (!actor) return res.status(400).json("Invalid request, record not found!");

  const public_id = actor.avatar?.public_id;

  if (public_id && file) {
    const { result } = await cloudinary.uploader.destroy(public_id);
    if (result !== ok) {
      return res.status(400).json("couldnot remove image from cloud!");
    }
  }

  // upload new Image
  if (file) {
    const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
      file.path,
      { gravity: "face", height: 500, width: 500, crop: "thumb" }
    );
    actor.avatar = new Actor({ name, about, gender });
  }

  actor.name = name;
  actor.about = about;
  actor.gender = gender;

  res.status(200).json({
    id: actor._id,
    name,
    about,
    gender,
    avatar: actor.avatar?.url,
  });
};

export const removeActor = async (req, res) => {
  const { actorId } = req.params;
  if (!isValidObjectId(actorId))
    return res.status(400).json("Invalid request!");

  // remove older image
  const actor = await Actor.findById(actorId);
  if (!actor) return res.status(400).json("Invalid request, record not found!");

  if (public_id) {
    const { result } = await cloudinary.uploader.destroy(public_id);
    if (result !== ok) {
      return res.status(400).json("couldnot remove image from cloud!");
    }
  }

  await Actor.findByIdAndDelete(actorId);
  res.status(200).json({message: 'Record removed successfully'});
};


export const searchActor =async (req, res) => {
    const {query} = req;
    query.name;
    const result = await Actor.find({ $text: { $search: `"${query.name}"` } });

    res.status(200).json(result);
};

export const getLatestActors =async (req, res) => {
    const result = await Actor.find().sort({ createdAt: '-1' }).limit(12);
    res.status(200).json(result);
}

export const getSingleActor =async (req, res) => {
    const {actorId} = req.params;

    if(!isValidObjectId(actorId)) return res.status(400).json("Invalid Request!");

    const result = await Actor.findById(actorId);

    if(!result) return res.status(400).json("Invalid Request, Actor not found!")

    res.status(200).json(result);
}