import db from "../config/db.js";


// Get all work requests
export const getWorkRequests = (req, res) => {

   const sql = `
SELECT 
    work_requests.*,

    users.name AS requester_name,

    team_members.full_name AS assigned_name

FROM work_requests

JOIN users 
ON work_requests.requester_id = users.id

LEFT JOIN team_members
ON work_requests.assigned_to = team_members.id

ORDER BY work_requests.created_at DESC
`;


    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result);

    });

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



            res.status(201).json({

                message: "Work request created successfully",

                id: result.insertId

            });


        }
    );

};





// Update request status and assigned user
export const updateWorkRequest = (req, res) => {

    const { id } = req.params;


    const { status } = req.body;



    const sql = `
        UPDATE work_requests
        SET status = ?
        WHERE id = ?
    `;



    db.query(
        sql,
        [
            status,
            id
        ],

        (err,result)=>{


            if(err){

                console.log(
                    "UPDATE REQUEST ERROR:",
                    err
                );


                return res.status(500).json({
                    message: err.message
                });

            }



            res.json({

                message:"Request status updated successfully"

            });


        }
    );


};




// Delete request
export const deleteWorkRequest = (req, res) => {


    const { id } = req.params;



    const sql = `
        DELETE FROM work_requests
        WHERE id=?
    `;



    db.query(
        sql,
        [id],
        (err, result) => {


            if (err) {

                console.log("DELETE REQUEST ERROR:", err);

                return res.status(500).json({
                    message: err.message
                });

            }



            res.json({

                message: "Request deleted successfully"

            });


        }
    );

};
// Assign request to team member
export const assignRequest = (req, res) => {

    const { id } = req.params;

    const { assigned_to } = req.body;



    if(!assigned_to){

        return res.status(400).json({

            message:"Team member is required"

        });

    }



    const sql = `
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

                console.log("ASSIGN ERROR:",err);


                return res.status(500).json({

                    message:"Assignment failed"

                });

            }



            res.json({

                message:"Request assigned successfully"

            });


        }

    );

};
