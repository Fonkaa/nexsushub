import db from "../config/db.js";



// ==========================
// GET ALL RESOURCES
// ==========================

export const getResources = async(req,res)=>{


try{


const result = await db.query(`

SELECT *

FROM resources

ORDER BY id DESC

`);



res.json(result.rows);



}catch(error){


console.log(error);


res.status(500).json({

message:"Failed to fetch resources"

});


}


};







// ==========================
// CREATE RESOURCE
// ==========================

export const createResource = async(req,res)=>{


try{


const {
name,
category,
quantity
}=req.body;



const result = await db.query(`


INSERT INTO resources

(
name,
category,
quantity,
available
)


VALUES
($1,$2,$3,$4)


RETURNING id


`,
[
name,
category,
quantity,
true
]

);



res.status(201).json({

message:"Resource created successfully",

id:result.rows[0].id

});



}catch(error){


console.log(error);


res.status(500).json({

message:"Resource creation failed"

});


}


};









// ==========================
// UPDATE AVAILABILITY
// ==========================

export const updateResource = async(req,res)=>{


try{


const {id}=req.params;

const {available}=req.body;



await db.query(`


UPDATE resources

SET available=$1

WHERE id=$2


`,
[
available,
id
]

);



res.json({

message:"Availability updated"

});



}catch(error){


console.log(error);


res.status(500).json({

message:"Availability update failed"

});


}


};









// ==========================
// EDIT RESOURCE DETAILS
// ==========================

export const editResource = async(req,res)=>{


try{


const {id}=req.params;


const {
name,
category,
quantity
}=req.body;



await db.query(`


UPDATE resources

SET

name=$1,

category=$2,

quantity=$3


WHERE id=$4


`,
[
name,
category,
quantity,
id
]

);



res.json({

message:"Resource updated successfully"

});



}catch(error){


console.log(error);


res.status(500).json({

message:"Resource edit failed"

});


}


};









// ==========================
// DELETE RESOURCE
// ==========================

export const deleteResource = async(req,res)=>{


try{


const {id}=req.params;



await db.query(`


DELETE FROM resources

WHERE id=$1


`,
[
id
]

);



res.json({

message:"Resource deleted"

});



}catch(error){


console.log(error);


res.status(500).json({

message:"Delete failed"

});


}


};