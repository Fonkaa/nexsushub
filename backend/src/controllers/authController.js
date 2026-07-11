import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// ==========================
// REGISTER USER
// ==========================
export const register = (req, res) => {

    const { name, username, email, password } = req.body;


    if (!name || !username || !email || !password) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }


    const checkUser = `
        SELECT * FROM users 
        WHERE email=? OR username=?
    `;


    db.query(
        checkUser,
        [email, username],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error",
                    error: err
                });
            }


            if (result.length > 0) {
                return res.status(409).json({
                    message: "Email or username already exists"
                });
            }


            const hashedPassword = bcrypt.hashSync(password, 10);


  const sql = `
    INSERT INTO users
    (name, username, email, password, role)
    VALUES (?, ?, ?, ?, ?)
`;


            db.query(
                sql,
                [
        name,
        username,
        email,
        hashedPassword,
        "employee"
    ],
                (err, result) => {

                    if (err) {
                        return res.status(500).json({
                            message: "User registration failed",
                            error: err
                            
                        });
                        console.log(err.sql);
                    }


                    res.status(201).json({
                        message: "User created successfully"
                    });

                }
            );

        }
    );

};



// ==========================
// LOGIN USER
// ==========================
export const login = (req, res) => {


    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }


    const sql = `
        SELECT * FROM users 
        WHERE email=?
    `;


    db.query(
        sql,
        [email],
        (err, result) => {


            if (err) {
                return res.status(500).json({
                    message: "Database error",
                    error: err
                });
            }



            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }



            const user = result[0];


            const validPassword = bcrypt.compareSync(
                password,
                user.password
            );



            if (!validPassword) {
                return res.status(401).json({
                    message: "Wrong password"
                });
            }



            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );



            res.json({

                message: "Login successful",

                token,

                user: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }

            });


        }
    );

};