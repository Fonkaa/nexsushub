import db from "../config/db.js";


export const getDashboardStats = async(req,res)=>{

try{

let result;


if(req.user.role === "admin"){


result = await db.query(`

SELECT

(SELECT COUNT(*) 
 FROM work_requests)
 AS "totalRequests",

(SELECT COUNT(*)
 FROM work_requests
 WHERE status='Pending')
 AS "pendingRequests",

(SELECT COUNT(*)
 FROM work_requests
 WHERE status='Approved')
 AS "approvedRequests",

(SELECT COUNT(*)
 FROM work_requests
 WHERE status='Rejected')
 AS "rejectedRequests",

(SELECT COUNT(*)
 FROM resources)
 AS "totalResources",

(SELECT COUNT(*)
 FROM resources
 WHERE available=true)
 AS "availableResources",

(SELECT COUNT(*)
 FROM team_members)
 AS "totalTeamMembers"

`);

}


else{


result = await db.query(`

SELECT


(SELECT COUNT(*)
 FROM work_requests
 WHERE requester_id=$1)
 AS "totalRequests",


(SELECT COUNT(*)
 FROM work_requests
 WHERE requester_id=$1
 AND status='Pending')
 AS "pendingRequests",


(SELECT COUNT(*)
 FROM work_requests
 WHERE requester_id=$1
 AND status='Approved')
 AS "approvedRequests",


(SELECT COUNT(*)
 FROM work_requests
 WHERE requester_id=$1
 AND status='Rejected')
 AS "rejectedRequests"


`,
[
req.user.id
]);


}



console.log("DASHBOARD DATA:", result.rows[0]);


res.json(result.rows[0]);


}catch(error){

console.log("DASHBOARD ERROR:",error);


res.status(500).json({

message:"Failed to load dashboard"

});


}

};