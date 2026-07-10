import { NavLink } from "react-router-dom";


import {
FaHome,
FaUsers,
FaTasks,
FaBoxes,
FaChartBar
} from "react-icons/fa";



function Sidebar(){


const menuItems=[

{
name:"Dashboard",
path:"/dashboard",
icon:<FaHome/>
},

{
name:"Team Members",
path:"/team-members",
icon:<FaUsers/>
},

{
name:"Work Requests",
path:"/requests",
icon:<FaTasks/>
},

{
name:"Resources",
path:"/resources",
icon:<FaBoxes/>
},

{
name:"Statistics",
path:"/statistics",
icon:<FaChartBar/>
}

];



return (

<aside className="w-64 bg-gray-900 text-white min-h-screen">


<div className="p-6 text-2xl font-bold">
NexusHub
</div>



<nav className="px-4">


{
menuItems.map((item)=>(


<NavLink

key={item.path}

to={item.path}

className={({isActive})=>

`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 
${isActive 
? "bg-blue-600"
: "hover:bg-gray-700"}`

}

>


{item.icon}

<span>
{item.name}
</span>


</NavLink>


))
}



</nav>


</aside>


);


}


export default Sidebar;