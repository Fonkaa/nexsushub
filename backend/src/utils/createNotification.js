import db from "../config/db.js";


const createNotification = async(
    user_id,
    sender_id,
    message,
    type
)=>{


try{


await db.query(

`
INSERT INTO notifications
(
user_id,
sender_id,
message,
type,
is_read
)

VALUES($1,$2,$3,$4,$5)

`,
[
user_id,
sender_id,
message,
type,
false
]

);


}catch(error){


console.log(
"Notification creation error:",
error
);


}


};


export default createNotification;