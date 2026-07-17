import db from "../config/db.js";
import createNotification from "../utils/createNotification.js";




// ==========================
// GET ALL WORK REQUESTS
// ==========================

export const getWorkRequests = async(req,res)=>{


try{


let query = `


SELECT


work_requests.*,


users.name AS requester_name,


team_members.full_name AS assigned_name



FROM work_requests



JOIN users

ON work_requests.requester_id = users.id



LEFT JOIN team_members

ON work_requests.assigned_to = team_members.id



`;



let values=[];



if(req.user.role !== "admin"){

query += `

WHERE 
work_requests.requester_id=$1
OR 
work_requests.assigned_to IN (

SELECT id 
FROM team_members
WHERE user_id=$1

)

`;

values.push(req.user.id);

}



query += `

ORDER BY work_requests.created_at DESC

`;




const result = await db.query(

query,

values

);



res.json(result.rows);



}catch(error){


console.log(
"GET REQUEST ERROR:",
error
);



res.status(500).json({

message:error.message

});


}


};









// ==========================
// CREATE WORK REQUEST
// ==========================

export const createWorkRequest = async(req,res)=>{


try{


const {

title,
description,
priority

}=req.body;



const result = await db.query(`


INSERT INTO work_requests

(
title,
description,
requester_id,
priority,
status,
assigned_to
)


VALUES

($1,$2,$3,$4,$5,$6)


RETURNING id


`,
[

title,

description,

req.user.id,

priority,

"Pending",

null

]

);





// GET ADMINS

const admins = await db.query(`


SELECT id

FROM users

WHERE role='admin'


`);






// SEND NOTIFICATIONS

admins.rows.forEach(admin=>{


createNotification(

admin.id,

req.user.id,

"New work request submitted",

"request"

);


});







res.status(201).json({

message:"Work request created successfully",

id:result.rows[0].id

});



}catch(error){


console.log(
"CREATE REQUEST ERROR:",
error
);



res.status(500).json({

message:error.message

});


}


};









// ==========================
// DELETE WORK REQUEST
// ==========================

export const deleteWorkRequest = async(req,res)=>{


try{


if(req.user.role !== "admin"){


return res.status(403).json({

message:"Only admin can delete requests"

});


}



const {id}=req.params;



await db.query(`


DELETE FROM work_requests

WHERE id=$1


`,
[
id
]

);



res.json({

message:"Request deleted successfully"

});



}catch(error){


console.log(error);


res.status(500).json({

message:error.message

});


}


};









// ==========================
// ASSIGN REQUEST
// ==========================

export const assignRequest = async(req,res)=>{

try{


const {id}=req.params;

const {assigned_to}=req.body;


await db.query(
`
UPDATE work_requests
SET assigned_to=$1
WHERE id=$2
`,
[
assigned_to,
id
]
);



const member = await db.query(
`
SELECT user_id
FROM team_members
WHERE id=$1
`,
[
assigned_to
]
);



if(member.rows.length > 0){

await createNotification(

member.rows[0].user_id,

req.user.id,

"You have been assigned a new work request",

"assignment"

);

}



res.json({

message:"Request assigned successfully"

});


}catch(error){

console.log(
"ASSIGN ERROR:",
error
);


res.status(500).json({

message:error.message

});


}

};









// ==========================
// UPDATE REQUEST STATUS
// ==========================

export const updateWorkRequest = async(req,res)=>{


try{


if(req.user.role !== "admin"){


return res.status(403).json({

message:"Only admin can update request status"

});


}



const {id}=req.params;

const {status}=req.body;





await db.query(`


UPDATE work_requests

SET status=$1

WHERE id=$2


`,
[
status,
id
]

);







// FIND REQUEST OWNER


const request = await db.query(`


SELECT

requester_id,

title


FROM work_requests

WHERE id=$1


`,
[
id
]

);






if(request.rows.length > 0){



createNotification(

request.rows[0].requester_id,

req.user.id,

`Your request "${request.rows[0].title}" was ${status.toLowerCase()}`,

"request_status"

);



}







res.json({

message:"Request status updated successfully"

});



}catch(error){


console.log(
"UPDATE REQUEST ERROR:",
error
);


res.status(500).json({

message:"Failed to update request"

});


}


};