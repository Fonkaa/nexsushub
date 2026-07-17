import { Navigate } from "react-router-dom";


function ProtectedRoute({children, allowedRoles}) {


    const token = localStorage.getItem("token");


    const user = JSON.parse(
        localStorage.getItem("user")
    );



    // Not logged in

    if(!token || !user){

        return (
            <Navigate 
                to="/login"
                replace
            />
        );

    }





    // Check role permission

    if(
        allowedRoles &&
        !allowedRoles.includes(user.role)
    ){

        return (

            <Navigate
                to="/unauthorized"
                replace
            />

        );

    }



    return children;


}


export default ProtectedRoute;