import { Navigate } from "react-router-dom";


function ProtectedRoute({children, role}) {


    const token = localStorage.getItem("token");


    const user = JSON.parse(
        localStorage.getItem("user")
    );



    // Not logged in

    if(!token){

        return <Navigate to="/" replace/>;

    }




    // User missing

    if(!user){

        return <Navigate to="/" replace/>;

    }





    // Role checking

    if(role && user.role !== role){


        return (

            <Navigate 
                to="/dashboard"
                replace
            />

        );


    }





    return children;


}


export default ProtectedRoute;