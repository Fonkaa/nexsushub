import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

import {
FaTasks,
FaClock,
FaCheckCircle,
FaTimesCircle,
FaBoxes,
FaUsers
} from "react-icons/fa";


function Dashboard(){


const navigate = useNavigate();


const user = JSON.parse(
    localStorage.getItem("user")
);



const [stats,setStats] = useState(null);

const [requests,setRequests] = useState([]);





useEffect(()=>{

    fetchStats();

    fetchRequests();

},[]);






const fetchStats = async()=>{


try{


const res = await API.get(
    "/dashboard/stats"
);


setStats(res.data);



}catch(error){

console.log(
"Stats error:",
error
);

}


};








const fetchRequests = async()=>{


try{


const res = await API.get(
    "/requests"
);


setRequests(
    res.data.slice(0,5)
);


}catch(error){

console.log(error);

}


};







const cards = user?.role==="admin"

?

[

{
title:"Total Requests",
value:stats?.totalRequests,
icon:<FaTasks/>,
color:"bg-blue-600"
},

{
title:"Pending",
value:stats?.pendingRequests,
icon:<FaClock/>,
color:"bg-yellow-500"
},

{
title:"Approved",
value:stats?.approvedRequests,
icon:<FaCheckCircle/>,
color:"bg-green-600"
},

{
title:"Rejected",
value:stats?.rejectedRequests,
icon:<FaTimesCircle/>,
color:"bg-red-600"
},

{
title:"Resources",
value:stats?.totalResources,
icon:<FaBoxes/>,
color:"bg-purple-600"
},

{
title:"Team Members",
value:stats?.totalTeamMembers,
icon:<FaUsers/>,
color:"bg-indigo-600"
}

]

:

[

{
title:"My Requests",
value:stats?.totalRequests,
icon:<FaTasks/>,
color:"bg-blue-600"
},

{
title:"Pending",
value:stats?.pendingRequests,
icon:<FaClock/>,
color:"bg-yellow-500"
},

{
title:"Approved",
value:stats?.approvedRequests,
icon:<FaCheckCircle/>,
color:"bg-green-600"
},

{
title:"Rejected",
value:stats?.rejectedRequests,
icon:<FaTimesCircle/>,
color:"bg-red-600"
}


];







return(


<div className="p-6 bg-gray-100 min-h-screen">



{/* Welcome */}

<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl shadow-xl p-8 mb-8">


<h1 className="text-4xl font-bold">

Welcome {user?.name} 👋

</h1>


<p className="mt-3 text-blue-100">

You are logged in as 
<span className="font-bold ml-2">

{user?.role}

</span>

</p>


</div>







{/* Statistics Cards */}


<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">


{

cards.map((card,index)=>(


<div

key={index}

className={`${card.color} text-white rounded-3xl shadow-lg p-6 hover:scale-105 transition duration-300`}

>


<div className="flex justify-between items-center">


<div>

<p className="text-sm opacity-80">

{card.title}

</p>


<h2 className="text-4xl font-bold mt-3">

{card.value ?? 0}

</h2>

</div>



<div className="text-4xl opacity-80">

{card.icon}

</div>



</div>


</div>


))

}


</div>







{/* Quick Actions */}


<div className="grid md:grid-cols-3 gap-6 mb-10">



<div

onClick={()=>navigate("/requests")}

className="cursor-pointer bg-white rounded-3xl shadow p-6 hover:shadow-xl transition"

>


<h2 className="text-xl font-bold">

Work Requests

</h2>


<p className="text-gray-500 mt-2">

Create and track requests

</p>


</div>







<div

onClick={()=>navigate("/resources")}

className="cursor-pointer bg-white rounded-3xl shadow p-6 hover:shadow-xl transition"

>


<h2 className="text-xl font-bold">

Resources

</h2>


<p className="text-gray-500 mt-2">

View available resources

</p>


</div>







{

user?.role==="admin" &&


<div

onClick={()=>navigate("/team-members")}

className="cursor-pointer bg-white rounded-3xl shadow p-6 hover:shadow-xl transition"

>


<h2 className="text-xl font-bold">

Team Management

</h2>


<p className="text-gray-500 mt-2">

Manage employees

</p>


</div>


}



</div>







{/* Recent Requests */}



<div className="bg-white rounded-3xl shadow p-6">


<div className="flex justify-between mb-5">


<h2 className="text-2xl font-bold">

Recent Requests

</h2>


<button

onClick={()=>navigate("/requests")}

className="text-blue-600 font-semibold"

>

View All

</button>


</div>





<table className="w-full">


<thead>

<tr className="border-b">

<th className="text-left p-3">

Title

</th>


<th className="text-left p-3">

Priority

</th>


<th className="text-left p-3">

Status

</th>


</tr>

</thead>



<tbody>


{

requests.length>0 ?


requests.map(request=>(


<tr

key={request.id}

className="border-b hover:bg-gray-50"

>


<td className="p-3">

{request.title}

</td>



<td className="p-3">

{request.priority}

</td>



<td className="p-3">

{request.status || "Pending"}

</td>


</tr>


))


:

<tr>

<td

colSpan="3"

className="text-center p-5 text-gray-500"

>

No requests yet

</td>

</tr>


}



</tbody>


</table>


</div>





</div>


);


}


export default Dashboard;