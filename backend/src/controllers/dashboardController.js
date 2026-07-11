import db from "../config/db.js";


export const getDashboardStats = (req,res)=>{


    let sql;
    let params = [];



    // ==========================
    // ADMIN STATISTICS
    // ==========================

    if(req.user.role === "admin"){


        sql = `

        SELECT


        (SELECT COUNT(*) 
        FROM work_requests)
        AS totalRequests,


        (SELECT COUNT(*) 
        FROM work_requests 
        WHERE status='Pending')
        AS pendingRequests,


        (SELECT COUNT(*) 
        FROM work_requests 
        WHERE status='Approved')
        AS approvedRequests,


        (SELECT COUNT(*) 
        FROM work_requests 
        WHERE status='Rejected')
        AS rejectedRequests,


        (SELECT COUNT(*)
        FROM resources)
        AS totalResources,


        (SELECT COUNT(*)
        FROM resources
        WHERE available=1)
        AS availableResources,


        (SELECT COUNT(*)
        FROM team_members)
        AS totalTeamMembers


        `;



    }



    // ==========================
    // EMPLOYEE STATISTICS
    // ==========================

    else{


        sql = `


        SELECT


        (SELECT COUNT(*)
        FROM work_requests
        WHERE requester_id=?)
        AS totalRequests,



        (SELECT COUNT(*)
        FROM work_requests
        WHERE requester_id=?
        AND status='Pending')
        AS pendingRequests,



        (SELECT COUNT(*)
        FROM work_requests
        WHERE requester_id=?
        AND status='Approved')
        AS approvedRequests,



        (SELECT COUNT(*)
        FROM work_requests
        WHERE requester_id=?
        AND status='Rejected')
        AS rejectedRequests



        `;



        params=[

            req.user.id,
            req.user.id,
            req.user.id,
            req.user.id

        ];


    }






    db.query(

        sql,

        params,

        (err,result)=>{


            if(err){


                console.log(
                    "Dashboard stats error:",
                    err
                );


                return res.status(500).json({

                    message:"Failed to load statistics"

                });


            }




            console.log(
                "STAT RESULT:",
                result[0]
            );



            res.json(result[0]);


        }


    );


};