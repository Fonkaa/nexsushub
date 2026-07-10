import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = (req, res) => {

    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = `
        INSERT INTO users(name,email,password)
        VALUES(?,?,?)
    `;

    db.query(
        sql,
        [name, email, hashedPassword],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Registration failed",
                    error: err
                });
            }

            res.json({
                message: "User created successfully"
            });
        }
    );
};


export const login = (req,res)=>{

    const {email,password}=req.body;

    const sql="SELECT * FROM users WHERE email=?";


    db.query(sql,[email],(err,result)=>{

        if(err)
            return res.status(500).json(err);


        if(result.length===0)
            return res.status(404).json({
                message:"User not found"
            });


        const user=result[0];


        const validPassword=bcrypt.compareSync(
            password,
            user.password
        );


        if(!validPassword)
            return res.status(401).json({
                message:"Wrong password"
            });


        const token=jwt.sign(
            {
                id:user.id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        );


        res.json({
            message:"Login successful",
            token
        });

    });

};