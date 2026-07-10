import db from "../config/db.js";


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



    db.query(sql,(err,result)=>{


        if(err){

            return res.status(500).json(err);

        }


        res.json(result);


    });


};

export const createWorkRequest = (req, res) => {

    const {
 title,
 description,
 priority
}=req.body;


const requester_id=req.user.id;


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
                return res.status(500).json(err);
            }


            res.json({
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
        (err, result)=>{

            if(err){
                return res.status(500).json(err);
            }


            res.json({
                message:"Request updated successfully"
            });

        }
    );

};



// Delete request
export const deleteWorkRequest = (req,res)=>{

    const {id}=req.params;


    const sql="DELETE FROM work_requests WHERE id=?";


    db.query(
        sql,
        [id],
        (err,result)=>{


            if(err){
                return res.status(500).json(err);
            }


            res.json({
                message:"Request deleted successfully"
            });


        }
    );

};