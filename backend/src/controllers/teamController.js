import db from "../config/db.js";
import bcrypt from "bcrypt";




// ==========================
// GET ALL TEAM MEMBERS
// ==========================

export const getTeamMembers = async(req,res)=>{


try{


const result = await db.query(`

SELECT *

FROM team_members

ORDER BY id DESC

`);



res.json(result.rows);



}catch(error){


console.log(error);


res.status(500).json({

message:"Failed to fetch team members"

});


}


};









// ==========================
// CREATE TEAM MEMBER
// ==========================

export const createTeamMember = async(req,res)=>{


try{


const {

full_name,
username,
email,
phone,
department,
position

}=req.body;



if(
!full_name ||
!username ||
!email ||
!phone ||
!department ||
!position
){


return res.status(400).json({

message:"Please fill all fields"

});


}






// CHECK DUPLICATE USER

const checkUser = await db.query(`


SELECT *

FROM users

WHERE email=$1 OR username=$2


`,
[
email,
username
]

);



if(checkUser.rows.length > 0){


return res.status(409).json({

message:"Email or username already exists"

});


}







// CREATE TEMP PASSWORD

const temporaryPassword =
"Nexus@" + Math.floor(10000 + Math.random()*90000);



const hashedPassword =
bcrypt.hashSync(
temporaryPassword,
10
);







// CREATE USER ACCOUNT

const userResult = await db.query(`


INSERT INTO users

(
name,
username,
email,
password,
role,
first_login
)


VALUES
($1,$2,$3,$4,$5,$6)


RETURNING id


`,
[
full_name,
username,
email,
hashedPassword,
"employee",
true
]

);



const userId =
userResult.rows[0].id;









// CREATE TEAM PROFILE


await db.query(`


INSERT INTO team_members

(
user_id,
full_name,
phone,
department,
position,
status
)


VALUES
($1,$2,$3,$4,$5,$6)


`,
[
userId,
full_name,
phone,
department,
position,
"Active"
]

);





res.status(201).json({

message:"Team member created successfully",

temporaryPassword

});





}catch(error){

console.log("GET TEAM ERROR:", error.message);

res.status(500).json({

message:error.message

});

}


};











// ==========================
// UPDATE TEAM MEMBER
// ==========================

export const updateTeamMember = async(req,res)=>{


try{


const {id}=req.params;



const {

full_name,
phone,
department,
position,
status

}=req.body;




await db.query(`


UPDATE team_members

SET

full_name=$1,

phone=$2,

department=$3,

position=$4,

status=$5


WHERE id=$6


`,
[

full_name,

phone,

department,

position,

status,

id

]

);





res.json({

message:"Member updated successfully"

});




}catch(error){


console.log(error);


res.status(500).json({

message:"Update failed"

});


}


};









// ==========================
// DELETE TEAM MEMBER
// ==========================

export const deleteTeamMember = async(req,res)=>{


try{


const {id}=req.params;



await db.query(`


DELETE FROM team_members

WHERE id=$1


`,
[
id
]

);



res.json({

message:"Member deleted"

});



}catch(error){


console.log(error);


res.status(500).json({

message:"Delete failed"

});


}


};