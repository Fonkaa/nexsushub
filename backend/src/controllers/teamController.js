import db from "../config/db.js";



// GET ALL TEAM MEMBERS

export const getTeamMembers = (req,res)=>{


const sql=`

SELECT *

FROM team_members

ORDER BY id DESC

`;



db.query(sql,(err,result)=>{


if(err){

return res.status(500).json({

message:"Failed to fetch team members"

});

}



res.json(result);


});


};









// CREATE TEAM MEMBER

export const createTeamMember=(req,res)=>{


const {

user_id,
full_name,
phone,
department,
position

}=req.body;




const sql=`

INSERT INTO team_members

(
user_id,
full_name,
phone,
department,
position,
status
)

VALUES(?,?,?,?,?,?)

`;



db.query(

sql,

[
user_id,
full_name,
phone,
department,
position,
"active"
],

(err,result)=>{


if(err){

return res.status(500).json({

message:"Failed to add member"

});

}



res.status(201).json({

message:"Member added successfully",

id:result.insertId

});


}

);


};









// UPDATE TEAM MEMBER

export const updateTeamMember=(req,res)=>{


const {id}=req.params;



const {

full_name,
phone,
department,
position,
status

}=req.body;




const sql=`

UPDATE team_members

SET

full_name=?,

phone=?,

department=?,

position=?,

status=?

WHERE id=?

`;




db.query(

sql,

[

full_name,
phone,
department,
position,
status,
id

],


(err)=>{


if(err){

console.log(err);


return res.status(500).json({

message:"Update failed"

});

}



res.json({

message:"Member updated successfully"

});


}


);


};









// DELETE MEMBER


export const deleteTeamMember=(req,res)=>{


const {id}=req.params;



db.query(

`
DELETE FROM team_members

WHERE id=?

`,

[id],


(err)=>{


if(err){

return res.status(500).json({

message:"Delete failed"

});

}



res.json({

message:"Member deleted"

});


}


);


};