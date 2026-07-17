import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
console.log("PASSWORD:", process.env.DB_PASSWORD);
const db = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


db.connect()
.then(()=>{
    console.log("✅ PostgreSQL Connected");
})
.catch((err)=>{
    console.log(
        "❌ PostgreSQL Connection Error:",
        err.message
    );
});


export default db;