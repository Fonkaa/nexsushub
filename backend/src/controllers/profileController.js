import db from "../config/db.js";
import bcrypt from "bcrypt";




// GET PROFILE

export const getProfile = async(req,res)=>{


try{


const result = await db.query(`


SELECT

id,
name,
username,
email,
role,
first_login,
created_at,
profile_image


FROM users

WHERE id=$1


`,
[
req.user.id
]

);



if(result.rows.length===0){

return res.status(404).json({

message:"User not found"

});

}



res.json(result.rows[0]);



}catch(error){


console.log(error);


res.status(500).json({

message:"Database error"

});


}


};







// UPDATE PROFILE


export const updateProfile = async(req,res)=>{


try{


const {
name,
username,
email
}=req.body;



await db.query(`


UPDATE users

SET

name=$1,
username=$2,
email=$3


WHERE id=$4


`,
[
name,
username,
email,
req.user.id
]

);



res.json({

message:"Profile updated successfully"

});



}catch(error){


console.log(error);


res.status(500).json({

message:"Profile update failed"

});


}


};







// UPDATE PROFILE IMAGE


export const updateProfileImage = async(req,res)=>{


try{


if(!req.file){

return res.status(400).json({

message:"No image selected"

});

}



await db.query(`

UPDATE users

SET profile_image=$1

WHERE id=$2

`,
[
req.file.path,
req.user.id
]
);



res.json({

message:"Profile image updated successfully",

image:req.file.filename

});



}catch(error){


console.log(error);


res.status(500).json({

message:"Image update failed"

});


}


};







// CHANGE PASSWORD


export const changePassword = async(req,res)=>{


try{


const {
oldPassword,
newPassword
}=req.body;



const result = await db.query(`


SELECT password

FROM users

WHERE id=$1


`,
[
req.user.id
]

);



const user=result.rows[0];



const match =
await bcrypt.compare(
oldPassword,
user.password
);



if(!match){

return res.status(400).json({

message:"Current password is incorrect"

});

}



const hashed =
await bcrypt.hash(
newPassword,
10
);



await db.query(`


UPDATE users

SET

password=$1,

first_login=false


WHERE id=$2


`,
[
hashed,
req.user.id
]

);



res.json({

message:"Password changed successfully"

});



}catch(error){


console.log(error);


res.status(500).json({

message:"Password update failed"

});


}


};
