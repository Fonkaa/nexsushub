import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
// ==========================
// REGISTER USER
// ==========================

export const register = async (req, res) => {

try {

const {
name,
username,
email,
password
} = req.body;


if(!name || !username || !email || !password){

return res.status(400).json({
message:"Please fill all fields"
});

}



const checkUser = `

SELECT *
FROM users
WHERE email=$1 OR username=$2

`;


const existingUser = await db.query(
checkUser,
[
email,
username
]
);



if(existingUser.rows.length > 0){

return res.status(409).json({

message:"Email or username already exists"

});

}



const hashedPassword =
bcrypt.hashSync(password,10);



const sql = `

INSERT INTO users
(
name,
username,
email,
password,
role
)

VALUES
($1,$2,$3,$4,$5)

`;



await db.query(

sql,

[
name,
username,
email,
hashedPassword,
"viewer"
]

);



res.status(201).json({

message:"User created successfully"

});



}catch(error){

console.log(error);

res.status(500).json({

message:"Registration failed"

});

}


};




// ==========================
// LOGIN USER
// ==========================


export const login = async(req,res)=>{

    console.log("========== LOGIN CONTROLLER CALLED ==========");
try{


const {
email,
password
}=req.body;



const result = await db.query(

`
SELECT *
FROM users
WHERE email=$1
`,
[
email
]

);



if(result.rows.length===0){

return res.status(404).json({

message:"User not found"

});

}



const user=result.rows[0];


console.log("Email entered:", email);
console.log("Password entered:", password);
console.log("User from DB:", user.email);
console.log("Stored hash:", user.password);

const validPassword = bcrypt.compareSync(password, user.password);

console.log("Password Match:", validPassword);

if (!validPassword) {
    return res.status(401).json({
        message: "Wrong password"
    });
}



const token = jwt.sign(

{
id:user.id,
role:user.role
},

process.env.JWT_SECRET,

{
expiresIn:"1d"
}

);



res.json({

message:"Login successful",

token,


user:{

id:user.id,
name:user.name,
username:user.username,
email:user.email,
role:user.role,
first_login:user.first_login

}

});



}catch(error){

console.log("LOGIN ERROR:", error);

res.status(500).json({

message:error.message

});

}


};
// ==========================
// FORGOT PASSWORD
// ==========================

export const forgotPassword = async(req,res)=>{

try{


const {email}=req.body;



const result = await db.query(

`
SELECT *
FROM users
WHERE email=$1
`,
[email]

);



if(result.rows.length===0){

return res.status(404).json({

message:"User not found"

});

}



const user=result.rows[0];



// Generate 6 digit OTP

const otp = Math.floor(
100000 + Math.random()*900000
).toString();




// OTP expires after 10 minutes

const expireTime =
new Date(Date.now()+10*60*1000);




// Save OTP

await db.query(

`
UPDATE users

SET reset_otp=$1,
reset_otp_expire=$2

WHERE id=$3

`,

[
otp,
expireTime,
user.id
]

);





// Send OTP email

await sendEmail({

email:user.email,

subject:"NexusHub Password Reset OTP",

message:`

<h2>NexusHub Password Reset</h2>

<p>Hello ${user.name}</p>


<p>
Your password reset OTP is:
</p>


<h1>
${otp}
</h1>


<p>
This OTP expires in 10 minutes.
</p>

`

});




res.json({

message:"OTP sent successfully"

});



}catch(error){

console.log(
"FORGOT PASSWORD ERROR:",
error
);


res.status(500).json({

message:"Server error"

});


}

};
export const verifyOTP = async(req,res)=>{

try{


const {
email,
otp
}=req.body;



const result = await db.query(

`
SELECT *
FROM users
WHERE email=$1
AND reset_otp=$2
AND reset_otp_expire > NOW()
`,

[
email,
otp
]

);



if(result.rows.length===0){

return res.status(400).json({

message:"Invalid or expired OTP"

});

}



// OTP is correct

res.json({

message:"OTP verified successfully"

});



}catch(error){

console.log(
"VERIFY OTP ERROR:",
error
);


res.status(500).json({

message:"OTP verification failed"

});


}


};
export const resetPassword = async(req,res)=>{

try{

const {
email,
password
}=req.body;
console.log("LOGIN DATA:", email, password);

const userResult = await db.query(
`
SELECT *
FROM users
WHERE email=$1
`,
[email]
);


if(userResult.rows.length===0){

return res.status(404).json({
message:"User not found"
});

}


const user=userResult.rows[0];


const hashedPassword =
bcrypt.hashSync(password,10);



await db.query(

`
UPDATE users
SET password=$1,
reset_otp=NULL,
reset_otp_expire=NULL
WHERE id=$2
`,

[
hashedPassword,
user.id
]

);



res.json({

message:"Password updated successfully"

});



}catch(error){

console.log(
"RESET PASSWORD ERROR:",
error
);


res.status(500).json({

message:"Reset failed"

});


}

};