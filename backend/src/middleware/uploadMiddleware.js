import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


const storage = new CloudinaryStorage({

    cloudinary: cloudinary,

    params: {
        folder: "nexushub/profile",
        allowed_formats: [
            "jpg",
            "jpeg",
            "png"
        ]
    }

});


const upload = multer({

    storage: storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    }

});


export default upload;