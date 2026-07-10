import { useEffect, useState } from "react";
import API from "../api/axios";


function Statistics() {


    const [stats, setStats] = useState(null);



    useEffect(() => {


        API.get("/dashboard/stats")

        .then((response)=>{

            console.log("STATISTICS:", response.data);

            setStats(response.data);

        })

        .catch((error)=>{

            console.log(
                "STATISTICS ERROR:",
                error.response?.data || error.message
            );

        });


    }, []);




    return (

        <div className="p-6">


            <h1 className="text-3xl font-bold mb-6">
                Request Statistics
            </h1>



            {
                stats ? (

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">


                        <div className="bg-blue-500 text-white p-6 rounded-xl shadow">

                            <h2 className="text-lg">
                                Total Requests
                            </h2>

                            <p className="text-4xl font-bold">
                                {stats.total}
                            </p>

                        </div>



                        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow">

                            <h2 className="text-lg">
                                Pending
                            </h2>

                            <p className="text-4xl font-bold">
                                {stats.pending}
                            </p>

                        </div>




                        <div className="bg-green-500 text-white p-6 rounded-xl shadow">

                            <h2 className="text-lg">
                                Approved
                            </h2>

                            <p className="text-4xl font-bold">
                                {stats.approved}
                            </p>

                        </div>





                        <div className="bg-red-500 text-white p-6 rounded-xl shadow">

                            <h2 className="text-lg">
                                Rejected
                            </h2>

                            <p className="text-4xl font-bold">
                                {stats.rejected}
                            </p>

                        </div>



                    </div>


                )

                :

                (

                    <p>
                        Loading statistics...
                    </p>

                )

            }



        </div>

    );

}


export default Statistics;