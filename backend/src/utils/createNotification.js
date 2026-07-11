import db from "../config/db.js";


const createNotification = (
    user_id,
    sender_id,
    message,
    type
)=>{


const sql = `

INSERT INTO notifications

(
 user_id,
 sender_id,
 message,
 type,
 is_read
)

VALUES(?,?,?,?,?)

`;



db.query(

sql,

[
user_id,
sender_id,
message,
type,
0
],

(err)=>{

if(err){

console.log(
"Notification error:",
err
);

}

}

);


};


export default createNotification;