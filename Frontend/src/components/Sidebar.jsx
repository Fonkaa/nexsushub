import { NavLink } from "react-router-dom";


import {
FaHome,
FaUsers,
FaTasks,
FaBoxes,
FaChartBar,
FaUserCircle
} from "react-icons/fa";



function Sidebar(){


const user = JSON.parse(
localStorage.getItem("user")
);



const menuItems=[


{
name:"Dashboard",
path:"/dashboard",
icon:<FaHome/>
},


{
name:"Team Members",
path:"/team-members",
icon:<FaUsers/>,
admin:true
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


<aside className="
w-72
bg-gray-900
text-white
min-h-screen
shadow-2xl
">





<div className="
p-6
border-b
border-gray-700
">


<h1 className="
text-3xl
font-bold
bg-gradient-to-r
from-blue-400
to-purple-500
bg-clip-text
text-transparent
">

NexusHub

</h1>



<p className="
text-gray-400
text-sm
mt-2
">

Smart Operations Portal

</p>


</div>







<nav className="p-5">


{

menuItems

.filter(item=>

!item.admin ||

user?.role==="admin"

)

.map(item=>(


<NavLink

key={item.path}

to={item.path}


className={({isActive})=>`


flex
items-center
gap-4
px-5
py-3
mb-3
rounded-xl
transition-all
duration-300


${
isActive

?

"bg-blue-600 text-white shadow-lg scale-105"

:

"hover:bg-gray-700 text-gray-300"

}

`}


>


<span className="text-xl">

{item.icon}

</span>


<span className="font-semibold">

{item.name}

</span>



</NavLink>


))


}



</nav>





<div className="
absolute
bottom-5
px-6
text-sm
text-gray-500
">


Logged in as:

<span className="text-gray-300 ml-2">

{user?.role}

</span>


</div>




</aside>


);


}


export default Sidebar;