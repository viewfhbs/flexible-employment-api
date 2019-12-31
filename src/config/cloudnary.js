import multer from "multer";
import rand_name from "rand-token";
import cloudinary from "cloudinary";
import cloudinary_storage from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "findforhad",
  api_key: process.env.cloudnary_api_key,
  api_secret: process.env.cloudnary_api_secret
});

const storage = cloudinary_storage({
  cloudinary,
  folder: "employement",
  allowed_formats: ["jpg", "png", "gif", "jpeg"],
  filename: (req, file, cb) => {
    cb(null, rand_name.uid(8));
  }
});

export default multer({ storage });
