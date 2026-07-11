import { useEffect, useState } from "react";
import API from "../api/axios";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip
} from "recharts";


function Statistics(){


const user = JSON.parse(
    localStorage.getItem("user")
);



const [stats,setStats] = useState(null);



useEffect(()=>{

    fetchStatistics();

},[]);





const fetchStatistics = async()=>{

try{


const response = await API.get(
    "/dashboard/stats"
);


console.log(
    "STATISTICS:",
    response.data
);



setStats(response.data);



}catch(error){

console.log(
"STATISTICS ERROR:",
error.response?.data || error.message
);


}


};







return(


<div className="p-6 bg-gray-100 min-h-screen">



<h1 className="text-3xl font-bold mb-8">

Statistics Dashboard

</h1>





{
stats ?


<>





{/* Request Cards */}


<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">





<div className="bg-blue-600 text-white rounded-2xl shadow-lg p-6">

<p>
{
user?.role==="admin"
?
"Total Requests"
:
"My Requests"
}
</p>


<h2 className="text-4xl font-bold mt-3">

{stats.totalRequests}

</h2>


</div>







<div className="bg-yellow-500 text-white rounded-2xl shadow-lg p-6">


<p>
Pending Requests
</p>


<h2 className="text-4xl font-bold mt-3">

{stats.pendingRequests}

</h2>


</div>







<div className="bg-green-600 text-white rounded-2xl shadow-lg p-6">


<p>
Approved Requests
</p>


<h2 className="text-4xl font-bold mt-3">

{stats.approvedRequests}

</h2>


</div>







<div className="bg-red-600 text-white rounded-2xl shadow-lg p-6">


<p>
Rejected Requests
</p>


<h2 className="text-4xl font-bold mt-3">

{stats.rejectedRequests}

</h2>


</div>




</div>









{/* ADMIN ONLY INFORMATION */}



{

user?.role==="admin" &&



<>


<div className="grid md:grid-cols-3 gap-6 mt-8">



<div className="bg-white rounded-2xl shadow p-6">

<p className="text-gray-500">

Total Resources

</p>


<h2 className="text-4xl font-bold mt-3">

{stats.totalResources}

</h2>


</div>






<div className="bg-white rounded-2xl shadow p-6">

<p className="text-gray-500">

Available Resources

</p>


<h2 className="text-4xl font-bold mt-3">

{stats.availableResources}

</h2>


</div>







<div className="bg-white rounded-2xl shadow p-6">

<p className="text-gray-500">

Team Members

</p>


<h2 className="text-4xl font-bold mt-3">

{stats.totalTeamMembers}

</h2>


</div>




</div>









{/* Charts */}



<div className="grid md:grid-cols-2 gap-6 mt-8">





<div className="bg-white rounded-2xl shadow p-6">


<h2 className="text-xl font-bold mb-5">

Request Status

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<PieChart>


<Pie

data={[

{
name:"Pending",
value:stats.pendingRequests
},

{
name:"Approved",
value:stats.approvedRequests
},

{
name:"Rejected",
value:stats.rejectedRequests
}

]}

dataKey="value"

outerRadius={100}

label

>


<Cell fill="#eab308"/>

<Cell fill="#22c55e"/>

<Cell fill="#ef4444"/>


</Pie>


<Tooltip/>

<Legend/>


</PieChart>


</ResponsiveContainer>


</div>







<div className="bg-white rounded-2xl shadow p-6">


<h2 className="text-xl font-bold mb-5">

Resource Availability

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<PieChart>


<Pie

data={[

{
name:"Available",
value:stats.availableResources
},

{
name:"Unavailable",
value:
stats.totalResources -
stats.availableResources
}

]}

dataKey="value"

outerRadius={100}

label

>


<Cell fill="#3b82f6"/>

<Cell fill="#9ca3af"/>


</Pie>


<Tooltip/>

<Legend/>


</PieChart>


</ResponsiveContainer>


</div>




</div>


</>


}





</>


:

<p className="text-xl">

Loading statistics...

</p>



}



</div>


);


}


export default Statistics;