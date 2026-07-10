import { useEffect, useState } from "react";
import API from "../api/axios";


function Dashboard(){

    const [data, setData] = useState(null);



    useEffect(() => {


        API.get("/dashboard")

        .then((response)=>{

            console.log("API RESPONSE:", response.data);

            setData(response.data);

        })

        .catch((error)=>{

            console.log("API ERROR:", error);

        });


    }, []);




    return (

        <div className="p-6">


            <h1 className="text-3xl font-bold">
                NexusHub Dashboard
            </h1>



            {
                data ? (

                    <div className="mt-5">


                        <h2 className="text-xl font-bold">
                            {data.message}
                        </h2>


                        <hr className="my-4"/>



                        <h3 className="text-xl font-bold">
                            User Profile
                        </h3>



                        <p>
                            <strong>ID:</strong> {data.user.id}
                        </p>



                        <p>
                            <strong>Name:</strong> {data.user.name}
                        </p>



                        <p>
                            <strong>Username:</strong> {data.user.username}
                        </p>



                        <p>
                            <strong>Email:</strong> {data.user.email}
                        </p>



                        <p>
                            <strong>Role:</strong> {data.user.role}
                        </p>



                        <p>
                            <strong>Joined:</strong> {data.user.created_at}
                        </p>



                    </div>


                )

                :

                (

                    <p>
                        Loading dashboard data...
                    </p>

                )

            }



        </div>

    );

}


export default Dashboard;