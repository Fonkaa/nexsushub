import db from "../config/db.js";



// GET ALL RESOURCES

export const getResources = (req,res)=>{


    const sql = `

        SELECT *

        FROM resources

        ORDER BY id DESC

    `;


    db.query(sql,(err,result)=>{


        if(err){

            return res.status(500).json({

                message:"Failed to fetch resources"

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
        quantity
    } = req.body;



    const sql = `

        INSERT INTO resources

        (
            name,
            category,
            quantity,
            available
        )

        VALUES(?,?,?,?)

    `;



    db.query(

        sql,

        [
            name,
            category,
            quantity,
            true
        ],


        (err,result)=>{


            if(err){

                return res.status(500).json({

                    message:"Resource creation failed"

                });

            }



            res.status(201).json({

                message:"Resource created successfully",

                id:result.insertId

            });



        }

    );


};










// UPDATE AVAILABILITY


export const updateResource = (req,res)=>{


    const {id}=req.params;


    const {available}=req.body;



    const sql = `

        UPDATE resources

        SET available=?

        WHERE id=?

    `;



    db.query(

        sql,

        [
            available,
            id
        ],


        (err)=>{


            if(err){

                return res.status(500).json({

                    message:"Availability update failed"

                });

            }



            res.json({

                message:"Availability updated"

            });



        }


    );


};











// EDIT RESOURCE DETAILS


export const editResource = (req,res)=>{


    const {id}=req.params;


    const {

        name,
        category,
        quantity

    } = req.body;




    const sql = `


        UPDATE resources

        SET

        name=?,
        category=?,
        quantity=?


        WHERE id=?


    `;




    db.query(

        sql,

        [

            name,
            category,
            quantity,
            id

        ],


        (err)=>{


            if(err){

                return res.status(500).json({

                    message:"Resource edit failed"

                });

            }



            res.json({

                message:"Resource updated successfully"

            });


        }

    );


};












// DELETE RESOURCE


export const deleteResource=(req,res)=>{


    const {id}=req.params;



    const sql=`

        DELETE FROM resources

        WHERE id=?

    `;



    db.query(

        sql,

        [id],


        (err)=>{


            if(err){

                return res.status(500).json({

                    message:"Delete failed"

                });

            }



            res.json({

                message:"Resource deleted"

            });



        }

    );


};