import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

import {
    FaTasks,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaBoxes,
    FaUsers,
    FaArrowUp,
    FaChartLine,
    FaCalendarAlt,
    FaBolt
} from "react-icons/fa";


import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    AreaChart,
    Area
} from "recharts";



function Dashboard(){


const navigate = useNavigate();



const user = JSON.parse(
    localStorage.getItem("user")
);



const [stats,setStats] = useState(null);

const [requests,setRequests] = useState([]);

const [loading,setLoading] = useState(true);



const COLORS = [
    "#3B82F6",
    "#22C55E",
    "#FACC15",
    "#EF4444",
    "#8B5CF6"
];





useEffect(()=>{

    loadDashboard();

},[]);







const loadDashboard = async()=>{


try{


setLoading(true);



const [
    statsRes,
    requestRes
] = await Promise.all([

    API.get("/dashboard/stats"),

    API.get("/requests")

]);



setStats(statsRes.data);

setRequests(requestRes.data);



}catch(error){


console.log(
    "Dashboard Error:",
    error
);


}finally{


setLoading(false);


}


};







const getGreeting = ()=>{


const hour = new Date().getHours();


if(hour < 12)
return "Good Morning";


if(hour < 18)
return "Good Afternoon";


return "Good Evening";


};






const cards = user?.role==="admin"

?

[


{
title:"Total Requests",
value:stats?.totalRequests || 0,
icon:<FaTasks/>,
color:"from-blue-500 to-blue-700"
},


{
title:"Pending",
value:stats?.pendingRequests || 0,
icon:<FaClock/>,
color:"from-yellow-400 to-orange-500"
},


{
title:"Approved",
value:stats?.approvedRequests || 0,
icon:<FaCheckCircle/>,
color:"from-green-500 to-green-700"
},


{
title:"Rejected",
value:stats?.rejectedRequests || 0,
icon:<FaTimesCircle/>,
color:"from-red-500 to-red-700"
},


{
title:"Resources",
value:stats?.totalResources || 0,
icon:<FaBoxes/>,
color:"from-purple-500 to-purple-700"
},


{
title:"Team Members",
value:stats?.totalTeamMembers || 0,
icon:<FaUsers/>,
color:"from-indigo-500 to-indigo-700"
}


]


:


[


{
title:"My Requests",
value:stats?.totalRequests || 0,
icon:<FaTasks/>,
color:"from-blue-500 to-blue-700"
},


{
title:"Pending",
value:stats?.pendingRequests || 0,
icon:<FaClock/>,
color:"from-yellow-400 to-orange-500"
},


{
title:"Approved",
value:stats?.approvedRequests || 0,
icon:<FaCheckCircle/>,
color:"",
title:"Rejected",
value:stats?.rejectedRequests || 0,
icon:<FaTimesCircle/>,
color:"from-red-500 to-red-700"
}


];





console.log("Stats:", stats);

const pieData = [
  {
    name: "Approved",
    value: Number(stats?.approvedRequests || 0),
  },
  {
    name: "Pending",
    value: Number(stats?.pendingRequests || 0),
  },
  {
    name: "Rejected",
    value: Number(stats?.rejectedRequests || 0),
  },
];

console.log("Pie Data:", pieData);






const barData=[

{
name:"High",
value:requests.filter(
(r)=>r.priority==="High"
).length
},


{
name:"Medium",
value:requests.filter(
(r)=>r.priority==="Medium"
).length
},


{
name:"Low",
value:requests.filter(
(r)=>r.priority==="Low"
).length
}

];





const areaData=[

{
month:"Jan",
requests:5
},

{
month:"Feb",
requests:8
},

{
month:"Mar",
requests:10
},

{
month:"Apr",
requests:15
},

{
month:"May",
requests:20
},

{
month:"Jun",
requests:25
}

];





const recentRequests = requests.slice(0,5);






// LOADING SCREEN

if(loading){


return(

<div className="
min-h-screen
flex
items-center
justify-center
bg-gray-100
">


<div className="
text-center
">


<div className="
w-16
h-16
border-4
border-blue-600
border-t-transparent
rounded-full
animate-spin
mx-auto
">
</div>



<h2 className="
mt-5
text-xl
font-bold
text-gray-700
">

Loading Dashboard...

</h2>



</div>


</div>


);


}








return(


<div className="
min-h-screen
bg-gray-100
p-4
lg:p-6
">







{/* HERO SECTION */}


<div className="
relative
overflow-hidden
rounded-3xl
bg-gradient-to-r
from-blue-700
via-indigo-700
to-purple-700
text-white
shadow-2xl
p-6
lg:p-10
mb-8
">



<div className="
absolute
-top-10
-right-10
w-52
h-52
bg-white/10
rounded-full
">
</div>



<div className="
absolute
bottom-0
right-40
w-32
h-32
bg-white/10
rounded-full
">
</div>





<div className="
relative
z-10
flex
flex-col
lg:flex-row
justify-between
items-start
lg:items-center
gap-8
">



<div>


<p className="
uppercase
tracking-[4px]
text-blue-100
text-sm
">

NEXUSHUB PORTAL

</p>




<h1 className="
text-3xl
md:text-5xl
font-bold
mt-3
">

{getGreeting()}, {user?.name} 👋

</h1>




<p className="
mt-4
text-blue-100
max-w-xl
leading-7
">

Welcome to your Smart Operations Management Portal.
Monitor requests, resources, employees and analytics from one centralized dashboard.

</p>




<div className="
flex
flex-wrap
gap-4
mt-8
">



<div className="
bg-white/20
backdrop-blur
rounded-2xl
px-5
py-3
">


<p className="text-xs text-blue-100">
Role
</p>


<p className="
font-bold
capitalize
">

{user?.role}

</p>


</div>





<div className="
bg-white/20
backdrop-blur
rounded-2xl
px-5
py-3
">


<p className="text-xs text-blue-100">
Today's Date
</p>


<p className="font-bold">

{new Date().toLocaleDateString()}

</p>


</div>




</div>



</div>







<div className="
hidden
lg:flex
items-center
justify-center
">


<div className="
w-44
h-44
rounded-full
bg-white/15
backdrop-blur
flex
items-center
justify-center
">


<FaChartLine className="
text-7xl
"/>


</div>


</div>




</div>


</div>
{/* STATISTICS CARDS */}


<div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
gap-6
mb-10
">


{

cards.map((card,index)=>(


<div

key={index}

className={`
bg-gradient-to-r
${card.color}
rounded-3xl
text-white
shadow-xl
hover:-translate-y-2
transition-all
duration-300
p-6
`}

>



<div className="
flex
justify-between
items-start
">


<div>


<p className="
text-white/80
">

{card.title}

</p>



<h2 className="
text-5xl
font-bold
mt-4
">

{card.value}

</h2>




<div className="
flex
items-center
gap-2
mt-5
text-white/90
">


<FaArrowUp/>


<span className="
text-sm
">

Live Statistics

</span>


</div>



</div>





<div className="
w-16
h-16
rounded-2xl
bg-white/20
flex
items-center
justify-center
text-3xl
">


{card.icon}


</div>




</div>



</div>


))


}


</div>









{/* CHARTS SECTION */}



<div className="
grid
grid-cols-1
xl:grid-cols-3
gap-6
mb-10
">






{/* PIE CHART */}


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
value:Number(stats.pendingRequests)
},

{
name:"Approved",
value:Number(stats.approvedRequests)
},

{
name:"Rejected",
value:Number(stats.rejectedRequests)
}

]}

dataKey="value"

cx="50%"
cy="50%"

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







{/* BAR CHART */}



<div className="
bg-white
rounded-3xl
shadow-xl
p-6
">


<div className="
flex
justify-between
items-center
mb-5
">


<h2 className="
text-xl
font-bold
">

Priority Overview

</h2>


<div className="
bg-yellow-100
text-yellow-600
p-3
rounded-2xl
">

<FaBolt/>

</div>


</div>





<div className="
h-80
">


<ResponsiveContainer
width="100%"
height="100%"
>


<BarChart data={barData}>


<CartesianGrid
strokeDasharray="3 3"
/>



<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>



<Bar

dataKey="value"

fill="#3B82F6"

radius={[10,10,0,0]}

/>



</BarChart>



</ResponsiveContainer>



</div>



</div>










{/* AREA CHART */}



<div className="
bg-white
rounded-3xl
shadow-xl
p-6
">


<div className="
flex
justify-between
items-center
mb-5
">


<h2 className="
text-xl
font-bold
">

Request Trend

</h2>



<div className="
bg-green-100
text-green-600
p-3
rounded-2xl
">


<FaCalendarAlt/>


</div>


</div>






<div className="
h-80
">


<ResponsiveContainer

width="100%"

height="100%"

>


<AreaChart data={areaData}>


<CartesianGrid
strokeDasharray="3 3"
/>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>




<Area

type="monotone"

dataKey="requests"

stroke="#2563EB"

fill="#93C5FD"

/>



</AreaChart>



</ResponsiveContainer>



</div>



</div>




</div>
{/* QUICK ACTIONS + PERFORMANCE */}


<div className="
grid
lg:grid-cols-2
gap-6
mb-10
">



{/* QUICK ACTIONS */}


<div className="
bg-white
rounded-3xl
shadow-xl
p-6
">


<div className="
flex
justify-between
items-center
mb-6
">


<h2 className="
text-2xl
font-bold
">

Quick Actions

</h2>


<span className="
text-gray-400
text-sm
">

Navigation

</span>


</div>





<div className="
grid
grid-cols-2
gap-5
">



<div

onClick={()=>navigate("/requests")}

className="
cursor-pointer
rounded-2xl
bg-gradient-to-r
from-blue-500
to-blue-700
text-white
p-6
hover:scale-105
transition
shadow-lg
"

>


<FaTasks className="
text-4xl
mb-4
"/>


<h3 className="
font-bold
text-lg
">

Requests

</h3>


<p className="
text-blue-100
text-sm
">

Create and manage requests

</p>


</div>







<div

onClick={()=>navigate("/resources")}

className="
cursor-pointer
rounded-2xl
bg-gradient-to-r
from-purple-500
to-purple-700
text-white
p-6
hover:scale-105
transition
shadow-lg
"

>


<FaBoxes className="
text-4xl
mb-4
"/>


<h3 className="
font-bold
text-lg
">

Resources

</h3>


<p className="
text-purple-100
text-sm
">

Manage resources

</p>


</div>







{

user?.role==="admin" &&

<div

onClick={()=>navigate("/team-members")}

className="
cursor-pointer
rounded-2xl
bg-gradient-to-r
from-green-500
to-green-700
text-white
p-6
hover:scale-105
transition
shadow-lg
"

>


<FaUsers className="
text-4xl
mb-4
"/>


<h3 className="
font-bold
text-lg
">

Team

</h3>


<p className="
text-green-100
text-sm
">

Manage employees

</p>


</div>


}




<div

className="
cursor-pointer
rounded-2xl
bg-gradient-to-r
from-orange-500
to-red-500
text-white
p-6
hover:scale-105
transition
shadow-lg
"

>


<FaChartLine className="
text-4xl
mb-4
"/>


<h3 className="
font-bold
text-lg
">

Analytics

</h3>


<p className="
text-orange-100
text-sm
">

View statistics

</p>


</div>




</div>


</div>









{/* PERFORMANCE */}



<div className="
bg-white
rounded-3xl
shadow-xl
p-6
">


<h2 className="
text-2xl
font-bold
mb-6
">

Performance Overview

</h2>






<div className="
mb-6
">


<div className="
flex
justify-between
mb-2
">


<span className="font-semibold">

Approval Rate

</span>


<span>

{

stats?.totalRequests

?

Math.round(
(stats.approvedRequests /
stats.totalRequests)*100
)

:

0

}%

</span>


</div>




<div className="
w-full
bg-gray-200
rounded-full
h-3
">


<div

className="
bg-green-500
h-3
rounded-full
"

style={{

width:

`${

stats?.totalRequests

?

Math.round(
(stats.approvedRequests /
stats.totalRequests)*100
)

:

0

}%`

}}


/>


</div>


</div>







<div className="
grid
grid-cols-2
gap-4
">


<div className="
bg-blue-50
rounded-2xl
p-5
">


<p className="
text-gray-500
">

Total Requests

</p>


<h3 className="
text-3xl
font-bold
text-blue-700
">

{stats?.totalRequests || 0}

</h3>


</div>





<div className="
bg-green-50
rounded-2xl
p-5
">


<p className="
text-gray-500
">

Approved

</p>


<h3 className="
text-3xl
font-bold
text-green-700
">

{stats?.approvedRequests || 0}

</h3>


</div>


</div>



</div>



</div>









{/* RECENT REQUESTS */}



<div className="
bg-white
rounded-3xl
shadow-xl
overflow-hidden
mb-10
">


<div className="
flex
flex-col
md:flex-row
justify-between
items-center
p-6
border-b
">


<div>


<h2 className="
text-2xl
font-bold
">

Recent Requests

</h2>


<p className="
text-gray-500
">

Latest system activities

</p>


</div>





<button

onClick={()=>navigate("/requests")}

className="
bg-blue-600
text-white
px-5
py-3
rounded-xl
hover:bg-blue-700
"

>

View All

</button>



</div>






<div className="
overflow-x-auto
">


<table className="
w-full
">


<thead className="
bg-gray-50
">


<tr>


<th className="
p-4
text-left
">

Title

</th>


<th className="
p-4
">

Priority

</th>


<th className="
p-4
">

Status

</th>


</tr>


</thead>






<tbody>


{

recentRequests.length > 0

?


recentRequests.map(request=>(


<tr

key={request.id}

className="
border-t
hover:bg-gray-50
"

>


<td className="
p-4
font-semibold
">

{request.title}

</td>



<td className="
text-center
">

{request.priority}

</td>




<td className="
text-center
">


<span className="
px-3
py-1
rounded-full
bg-blue-100
text-blue-700
">

{request.status || "Pending"}

</span>


</td>




</tr>


))


:


<tr>

<td

colSpan="3"

className="
text-center
p-10
text-gray-500
"

>

No requests found

</td>


</tr>


}



</tbody>


</table>



</div>



</div>







</div>

);


}


export default Dashboard;