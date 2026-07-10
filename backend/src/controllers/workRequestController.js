import db from "../config/db.js";


// Get all work requests
export const getWorkRequests = (req, res) => {

    const sql = `
        SELECT 
            work_requests.*,
            users.name AS requester_name
        FROM work_requests
        JOIN users 
        ON work_requests.requester_id = users.id
        ORDER BY work_requests.created_at DESC
    `;


    db.query(sql, (err, result) => {

        if (err) {

            console.log("GET REQUEST ERROR:", err);

            return res.status(500).json({
                message: err.message
            });

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


    const {
        status,
        assigned_to
    } = req.body;



    const sql = `
        UPDATE work_requests
        SET status=?, assigned_to=?
        WHERE id=?
    `;



    db.query(
        sql,
        [
            status,
            assigned_to,
            id
        ],
        (err, result) => {


            if (err) {

                console.log("UPDATE REQUEST ERROR:", err);

                return res.status(500).json({
                    message: err.message
                });

            }



            res.json({

                message: "Request updated successfully"

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