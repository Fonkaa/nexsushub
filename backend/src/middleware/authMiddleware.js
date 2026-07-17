import jwt from "jsonwebtoken";


const verifyToken = (req,res,next)=>{

    console.log("========== VERIFY TOKEN ==========");

    const authHeader = req.headers.authorization;


    console.log(
        "Authorization Header:",
        authHeader
    );


    if(!authHeader){

        return res.status(401).json({

            message:"No token provided"

        });

    }


    const token = authHeader.split(" ")[1];


    try{


        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );


        console.log(
            "Decoded User:",
            decoded
        );


        req.user = decoded;


        next();



    }catch(error){


        console.log(
            "TOKEN ERROR:",
            error.message
        );


        return res.status(403).json({

            message:"Invalid token"

        });


    }


};


export default verifyToken;