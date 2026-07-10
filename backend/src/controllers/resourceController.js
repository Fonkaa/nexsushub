import db from "../config/db.js";


// GET ALL RESOURCES
export const getResources = (req, res) => {

    const sql = "SELECT * FROM resources";


    db.query(sql, (err, result) => {

        if(err){
            return res.status(500).json({
                message:"Failed to fetch resources",
                error:err
            });
        }


        res.json(result);

    });

};



// CREATE RESOURCE
export const createResource = (req,res)=>{

    const {
        name,
        category,
        quantity,
        available
    } = req.body;


    const sql = `
        INSERT INTO resources
        (name, category, quantity, available)
        VALUES (?, ?, ?, ?)
    `;


    db.query(
        sql,
        [
            name,
            category,
            quantity,
            available
        ],

        (err,result)=>{

            if(err){

                return res.status(500).json({
                    message:"Resource creation failed",
                    error:err
                });

            }


            res.status(201).json({

                message:"Resource created successfully",

                id:result.insertId

            });

        }
    );

};