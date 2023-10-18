import express from "express";
import { createActor, getLatestActors, getSingleActor ,removeActor, searchActor, updateActor } from "../controllers/ActorController.js";
import { uploadImage } from "../middlewares/multer.js";
import { actorInfoValidator } from "../middlewares/validator.js";
import { Auth, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", Auth, isAdmin ,uploadImage.single('avatar'), actorInfoValidator ,createActor)
router.post("/update/:id", uploadImage.single("avatar"), actorInfoValidator, updateActor)
router.delete("/:id", removeActor);
router.get("/search", searchActor);
router.get("/latest-uploads", getLatestActors);
router.get("/single/:id", getSingleActor);

export default router;