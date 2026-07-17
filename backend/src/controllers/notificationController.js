import db from "../config/db.js";



// GET ALL USER NOTIFICATIONS

export const getNotifications = async(req,res)=>{
 console.log("GET NOTIFICATIONS CALLED");
    console.log("USER:", req.user);
    try{

        const result = await db.query(

        `
        SELECT

            notifications.id,
            notifications.user_id,
            notifications.sender_id,
            notifications.message,
            notifications.type,
            notifications.is_read,
            notifications.created_at,

            users.name AS sender_name

        FROM notifications

        LEFT JOIN users

        ON notifications.sender_id = users.id


        WHERE notifications.user_id = $1


        ORDER BY notifications.created_at DESC

        `,

        [
            req.user.id
        ]

        );


        res.status(200).json(result.rows);



    }catch(error){

console.log("GET NOTIFICATIONS ERROR:", error.message);

return res.status(500).json({

    message:error.message

});

}

};






// MARK NOTIFICATION AS READ

export const markNotificationRead = async(req,res)=>{

    try{


        const {id} = req.params;



        await db.query(

        `
        UPDATE notifications

        SET is_read = true

        WHERE id = $1

        AND user_id = $2

        `,

        [
            id,
            req.user.id
        ]

        );



        res.json({

            message:"Notification marked as read"

        });



    }catch(error){


        console.log(
            "MARK READ ERROR:",
            error
        );


        res.status(500).json({

            message:"Failed to update notification"

        });


    }

};







// DELETE NOTIFICATION

export const deleteNotification = async(req,res)=>{


    try{


        const {id}=req.params;



        await db.query(

        `
        DELETE FROM notifications

        WHERE id = $1

        AND user_id = $2

        `,

        [
            id,
            req.user.id
        ]

        );



        res.json({

            message:"Notification deleted"

        });



    }catch(error){


        console.log(
            "DELETE NOTIFICATION ERROR:",
            error
        );


        res.status(500).json({

            message:"Failed to delete notification"

        });


    }


};