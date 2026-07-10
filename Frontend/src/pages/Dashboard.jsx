import { useEffect, useState } from "react";
import API from "../api/axios";


function Dashboard(){

    const [data, setData] = useState(null);


    useEffect(() => {


        API.get("/dashboard")
        .then((response) => {

            console.log("API RESPONSE:", response.data);

            setData(response.data);

        })
        .catch((error) => {

            console.log("API ERROR:", error);

        });


    }, []);



    return (

        <div>

            <h1>NexusHub Dashboard</h1>


            {
                data ? (

                    <div>

                        <h2>
                            {data.message}
                        </h2>


                        <hr />


                        <h3>
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