import multer from "multer";
import path from "path";


const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"uploads");

    },


    filename:(req,file,cb)=>{


        cb(
            null,
            Date.now()+"-"+file.originalname
        );


    }


});



const upload = multer({

    storage:storage,

    limits:{
        fileSize:5 * 1024 * 1024
    },

    fileFilter:(req,file,cb)=>{


        const allowed = [
            "image/jpeg",
            "image/png",
            "image/jpg"
        ];


        if(allowed.includes(file.mimetype)){

            cb(null,true);

        }else{

            cb(
                new Error("Only jpg and png images allowed"),
                false
            );

        }


    }


});


export default upload;