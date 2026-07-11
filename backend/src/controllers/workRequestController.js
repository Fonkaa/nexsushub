import db from "../config/db.js";

import createNotification from "../utils/createNotification.js";
// Get all work requests
// Get work requests
export const getWorkRequests = (req, res) => {


    let sql = `

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



    let params = [];



    // Employee sees only his own requests
    if(req.user.role !== "admin"){


        sql += `

        WHERE work_requests.requester_id = ?

        `;


        params.push(req.user.id);


    }



    sql += `

    ORDER BY work_requests.created_at DESC

    `;




    db.query(

        sql,

        params,

        (err,result)=>{


            if(err){

                console.log(
                    "GET REQUEST ERROR:",
                    err
                );


                return res.status(500).json({

                    message:err.message

                });

            }



            res.json(result);


        }

    );


};




// Create new work request
export const createWorkRequest = (req, res) => {

    const {
        title,
        description,
        priority
    } = req.body;



    const requester_id = req.user.id;

    const status = "Pending";

    const assigned_to = null;



    const sql = `
        INSERT INTO work_requests
        (
            title,
            description,
            requester_id,
            priority,
            status,
            assigned_to
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;



    db.query(
        sql,
        [
            title,
            description,
            requester_id,
            priority,
            status,
            assigned_to
        ],
        (err, result) => {


            if (err) {

                console.log("CREATE REQUEST ERROR:", err);

                return res.status(500).json({
                    message: err.message
                });

            }



         // Notify all admins

db.query(

`
SELECT id 
FROM users
WHERE role='admin'
`,

(err,admins)=>{


if(!err){


admins.forEach(admin=>{


// Get requester name first

db.query(

`
SELECT name
FROM users
WHERE id=?
`,

[req.user.id],

(err,userResult)=>{


if(!err && userResult.length > 0){


admins.forEach(admin=>{


createNotification(

admin.id,

req.user.id,

`New work request submitted`,

"request"

);


});


}


}

);


});


}


}


);



res.status(201).json({

message:"Work request created successfully",

id:result.insertId

});


        }
    );

};





// Update request status and assigned user
export const deleteWorkRequest=(req,res)=>{


    if(req.user.role !== "admin"){


        return res.status(403).json({

            message:"Only admin can delete requests"

        });


    }



    const {id}=req.params;



    const sql=`

    DELETE FROM work_requests

    WHERE id=?

    `;



    db.query(

        sql,

        [id],

        (err,result)=>{


            if(err){

                return res.status(500).json({

                    message:err.message

                });

            }



            res.json({

                message:"Request deleted successfully"

            });


        }


    );


};
// Assign request to team member
export const assignRequest=(req,res)=>{


    if(req.user.role !== "admin"){


        return res.status(403).json({

            message:"Only admin can assign requests"

        });

    }



    const {id}=req.params;

    const {assigned_to}=req.body;



    const sql=`

    UPDATE work_requests

    SET assigned_to=?

    WHERE id=?

    `;



    db.query(

        sql,

        [
            assigned_to,
            id
        ],


        (err,result)=>{


            if(err){

                return res.status(500).json({

                    message:err.message

                });

            }


          // get assigned member user_id

db.query(

`
SELECT user_id, full_name
FROM team_members
WHERE id=?
`,

[assigned_to],

(err,result)=>{


if(!err && result.length>0){


createNotification(

result[0].user_id,

req.user.id,

`You have been assigned a new work request`,

"assignment"

);


}


}


);



res.json({

message:"Request assigned successfully"

});


        }


    );


};
// UPDATE REQUEST STATUS (ADMIN ONLY)

export const updateWorkRequest = (req, res) => {


    if(req.user.role !== "admin"){


        return res.status(403).json({

            message:"Only admin can update request status"

        });


    }



    const { id } = req.params;

    const { status } = req.body;



    const updateSql = `

    UPDATE work_requests

    SET status=?

    WHERE id=?

    `;



    db.query(

        updateSql,

        [
            status,
            id
        ],

        (err)=>{


            if(err){

                console.log(
                    "UPDATE REQUEST ERROR:",
                    err
                );


                return res.status(500).json({

                    message:"Failed to update request"

                });


            }





            // Find request owner to send notification

            db.query(

                `

                SELECT requester_id, title

                FROM work_requests

                WHERE id=?

                `,

                [id],

                (error,result)=>{


                    if(!error && result.length > 0){

createNotification(

result[0].requester_id,

req.user.id,

`Your request "${result[0].title}" was ${status.toLowerCase()}`,

"request_status"

);


                    }


                }


            );







            res.json({

                message:"Request status updated successfully"

            });



        }


    );


};
