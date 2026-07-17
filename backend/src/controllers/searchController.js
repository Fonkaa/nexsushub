import db from "../config/db.js";



export const globalSearch = async(req,res)=>{


try{


const {q}=req.query;



if(!q){

return res.json([]);

}



const search=`%${q}%`;



const result = await db.query(`


SELECT

id,

name AS title,

'User' AS type

FROM users

WHERE name ILIKE $1



UNION ALL



SELECT

id,

title,

'Request' AS type

FROM work_requests

WHERE title ILIKE $1



UNION ALL



SELECT

id,

name AS title,

'Resource' AS type

FROM resources

WHERE name ILIKE $1



UNION ALL



SELECT

id,

full_name AS title,

'Team Member' AS type

FROM team_members

WHERE full_name ILIKE $1



ORDER BY title

LIMIT 30


`,
[
search
]

);



res.json(result.rows);



}catch(error){


console.log(
"SEARCH ERROR:",
error
);



res.status(500).json({

message:"Search failed"

});


}


};