import db from "../config/db.js";


export const getResources = (callback)=>{


    const sql = `
    SELECT 
        resources.*,
        users.name AS creator
    FROM resources
    JOIN users
    ON resources.created_by = users.id
    `;


    db.query(sql, callback);

};



export const createResource = (data, callback)=>{


    const sql = `
    INSERT INTO resources
    (name, description, quantity, created_by)
    VALUES (?,?,?,?)
    `;


    db.query(
        sql,
        [
            data.name,
            data.description,
            data.quantity,
            data.created_by
        ],
        callback
    );

};



export const deleteResource = (id,callback)=>{


    const sql = `
    DELETE FROM resources
    WHERE id=?
    `;


    db.query(sql,[id],callback);

};