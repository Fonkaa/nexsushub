import db from "../config/db.js";


// GET USER NOTIFICATIONS




// MARK AS READ

export const markAsRead=(req,res)=>{


    const {id}=req.params;


    const sql=`

    UPDATE notifications

    SET is_read=true

    WHERE id=?

    `;



    db.query(

        sql,

        [id],

        (err)=>{


            if(err){

                return res.status(500).json({

                    message:"Failed to update notification"

                });

            }


            res.json({

                message:"Notification marked as read"

            });


        }

    );


};








// DELETE NOTIFICATION

export const deleteNotification=(req,res)=>{


    const {id}=req.params;


    db.query(

        `DELETE FROM notifications WHERE id=?`,

        [id],

        (err)=>{


            if(err){

                return res.status(500).json({

                    message:"Delete failed"

                });

            }


            res.json({

                message:"Notification deleted"

            });


        }

    );


};
export const getNotifications=(req,res)=>{


const sql=`

SELECT 

notifications.*,

users.name AS sender_name


FROM notifications


LEFT JOIN users

ON notifications.sender_id = users.id


WHERE notifications.user_id=?


ORDER BY notifications.created_at DESC

`;



db.query(

sql,

[req.user.id],

(err,result)=>{


if(err){

return res.status(500).json({

message:"Notification error"

});

}


res.json(result);


}

);


};
export const markNotificationRead=(req,res)=>{


    const {id}=req.params;



    const sql=`

    UPDATE notifications

    SET is_read=1

    WHERE id=?

    `;



    db.query(

        sql,

        [id],

        (err)=>{


            if(err){

                return res.status(500).json({

                    message:"Update failed"

                });

            }



            res.json({

                message:"Notification marked as read"

            });


        }


    );


};