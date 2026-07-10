import db from "../config/db.js";


// GET ALL TEAM MEMBERS
export const getTeamMembers = (req, res) => {


    const sql = "SELECT * FROM team_members";


    db.query(sql, (err, result) => {


        if(err){

            return res.status(500).json({
                message:"Failed to fetch team members",
                error:err
            });

        }


        res.json(result);


    });


};




// CREATE TEAM MEMBER
export const createTeamMember = (req,res)=>{


    const {
        user_id,
        full_name,
        phone,
        department,
        position,
        status
    } = req.body;



    const sql = `
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
            status
        ],

        (err,result)=>{


            if(err){

                return res.status(500).json({
                    message:"Failed to add team member",
                    error:err
                });

            }


            res.status(201).json({

                message:"Team member added successfully",

                id:result.insertId

            });


        }
    );


};