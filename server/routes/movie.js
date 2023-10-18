import express from "express";
import {
  createMovie,
  uploadTrailer,
  updateMovieWithoutPoster,
  updateMovie,
  removeMovie,
} from "../controllers/movieController.js";
import { Auth, isAdmin } from "../middlewares/auth.js";
import { uploadVideo, uploadImage } from "../middlewares/multer.js";
import { parseData } from "../utils/helper.js";
import { validate, validateMovie } from "../middlewares/validator.js";


const router = express.Router();

router.post('/upload-trailer', Auth, isAdmin, uploadVideo.single('video') ,uploadTrailer);
router.post('/create', Auth, isAdmin, uploadImage.single("poster"), parseData, validateMovie, validate ,createMovie)
router.patch("/update-movie-without-poster/:id", Auth, isAdmin, parseData, validateMovie, validate, updateMovieWithoutPoster)
router.post("/update-movie",Auth, isAdmin,parseData,validateMovie, validate  ,updateMovie);
router.post(
  "/update-movie",
  Auth,
  isAdmin,
  parseData,
  validateMovie,
  validate,
  updateMovie
);

router.delete("/remove-movie", Auth, isAdmin, removeMovie)

export default router;