import db from "../config/db.js";


export const getDashboardStats = (req,res)=>{


    const sql = `
        SELECT
            COUNT(*) AS total,
            SUM(status='Pending') AS pending,
            SUM(status='Approved') AS approved,
            SUM(status='Rejected') AS rejected
        FROM work_requests
    `;



    db.query(sql,(err,result)=>{


        if(err){

            console.log(err);

            return res.status(500).json({
                message: err.message
            });

        }


        res.json(result[0]);


    });


};