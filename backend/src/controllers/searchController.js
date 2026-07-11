import db from "../config/db.js";


export const globalSearch = (req,res)=>{


const {q}=req.query;


if(!q){

    return res.json([]);

}



const search = `%${q}%`;



const sql = `

SELECT

id,

name AS title,

'User' AS type

FROM users

WHERE name LIKE ?



UNION ALL



SELECT

id,

title,

'Request' AS type

FROM work_requests

WHERE title LIKE ?



UNION ALL



SELECT

id,

name AS title,

'Resource' AS type

FROM resources

WHERE name LIKE ?



UNION ALL



SELECT

id,

full_name AS title,

'Team Member' AS type

FROM team_members

WHERE full_name LIKE ?



ORDER BY title

LIMIT 30

`;




db.query(

sql,

[
search,
search,
search,
search
],

(err,result)=>{


if(err){

console.log(
"SEARCH ERROR:",
err
);


return res.status(500).json({

message:"Search failed"

});


}



res.json(result);


}



);



};