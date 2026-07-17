import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;


const pool = new Pool({

    connectionString: process.env.DATABASE_URL,

    ssl:{
        rejectUnauthorized:false
    }

});


pool.connect()
.then(()=>{
    console.log("Database connected successfully");
})
.catch((error)=>{
    console.log(
        "Database Connection Error:",
        error
    );
});


export default pool;