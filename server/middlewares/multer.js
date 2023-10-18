import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
    if(!file.mimetype.startsWith('image')) {
        cb("Supported only image files!", false)
    }
    cb(null, true)
};

const videoFileFilter = (req, file, cb) => {
    if(!file.mimetype.startsWith("video")) {
        cb("Supported only mp4 files")
    }
     cb(null, true);
}

export const uploadImage = multer({storage, fileFilter});
export const uploadVideo = multer({ storage, fileFilter: videoFileFilter });