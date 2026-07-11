import db from "../config/db.js";
import bcrypt from "bcrypt";


// ==============================
// GET PROFILE
// ==============================

export const getProfile = (req, res) => {

    const userId = req.user.id;

    const sql = `
        SELECT
            id,
            name,
            username,
            email,
            role,
            created_at,
            profile_image
        FROM users
        WHERE id=?
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(result[0]);

    });

};



// ==============================
// UPDATE PROFILE INFORMATION
// ==============================

export const updateProfile = (req, res) => {

    const userId = req.user.id;

    const {
        name,
        username,
        email
    } = req.body;

    const sql = `
        UPDATE users
        SET
            name=?,
            username=?,
            email=?
        WHERE id=?
    `;

    db.query(

        sql,

        [
            name,
            username,
            email,
            userId
        ],

        (err) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Profile update failed"
                });

            }

            res.json({
                message: "Profile updated successfully"
            });

        }

    );

};



// ==============================
// UPDATE PROFILE IMAGE
// ==============================

export const updateProfileImage = (req, res) => {

    const userId = req.user.id;
 console.log("FILE:", req.file);
    if (!req.file) {

        return res.status(400).json({
            message: "No image selected"
        });

    }

    const image = req.file.filename;

    const sql = `
        UPDATE users
        SET profile_image=?
        WHERE id=?
    `;

    db.query(

        sql,

        [
            image,
            userId
        ],

        (err) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Image update failed"
                });

            }

            res.json({

                message: "Profile image updated successfully",

                image

            });

        }

    );

};



// ==============================
// CHANGE PASSWORD
// ==============================

export const changePassword = (req, res) => {

    const userId = req.user.id;

    const {
        oldPassword,
        newPassword
    } = req.body;

    const sql = `
        SELECT password
        FROM users
        WHERE id=?
    `;

    db.query(

        sql,

        [userId],

        async (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Database error"
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    message: "User not found"
                });

            }

            const user = result[0];

            const match = await bcrypt.compare(
                oldPassword,
                user.password
            );

            if (!match) {

                return res.status(400).json({
                    message: "Current password is incorrect"
                });

            }

            const hashedPassword = await bcrypt.hash(
                newPassword,
                10
            );

            db.query(

                `
                UPDATE users
                SET password=?
                WHERE id=?
                `,

                [
                    hashedPassword,
                    userId
                ],

                (err) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json({
                            message: "Password update failed"
                        });

                    }

                    res.json({
                        message: "Password changed successfully"
                    });

                }

            );

        }

    );

};