import { useNavigate } from "react-router-dom";
import {
    FaSignOutAlt,
    FaBell,
    FaSearch
} from "react-icons/fa";

import { useEffect, useState } from "react";
import API from "../api/axios";


function Navbar(){


const navigate = useNavigate();


const user = JSON.parse(
    localStorage.getItem("user")
);



const [profile,setProfile]=useState(null);


const [notifications,setNotifications]=useState([]);

const [showNotifications,setShowNotifications]=useState(false);

const [search,setSearch]=useState("");





useEffect(()=>{


fetchProfile();

fetchNotifications();


},[]);





// GET UPDATED PROFILE

const fetchProfile=async()=>{

try{

const res = await API.get("/profile");


setProfile(res.data);


}catch(error){

console.log(
"PROFILE ERROR:",
error
);

}

};





const fetchNotifications=async()=>{


try{


const res = await API.get("/notifications");


setNotifications(res.data);



}catch(error){


console.log(
"Notification error:",
error
);


}


};







const unreadCount = notifications.filter(

(n)=>n.is_read===0

).length;







const readNotification=async(id)=>{


try{


await API.put(

`/notifications/${id}`

);



fetchNotifications();



}catch(error){

console.log(error);

}


};
const handleSearch=(e)=>{

    e.preventDefault();


    if(search.trim()){

        navigate(
            `/search?q=${search}`
        );

    }

};



const logout = ()=>{

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

};







return (

<header
className="
h-auto
min-h-20

mt-2
mx-2

sm:mt-3
sm:mx-3

bg-white
shadow-md
rounded-2xl

flex
flex-col
sm:flex-row

items-center
justify-between

gap-3
sm:gap-4

px-3
sm:px-4
lg:px-6
xl:px-8

py-3
"
>

    {/* LEFT */}

    <div>

        <h2
        className="
       text-lg
lg:text-xl
xl:text-2xl
        font-bold
        text-gray-800
        "
        >

            Smart Operations Management Portal

        </h2>

        <p
        className="
        text-sm
        text-gray-500
        "
        >

            Welcome back, {profile?.name || user?.name}

        </p>

    </div>



    {/* RIGHT */}

<div
className="
flex
flex-wrap
items-center
justify-end
gap-3
xl:gap-6

w-full
sm:w-auto

ml-auto
"
>



        {/* SEARCH */}

       <form
    onSubmit={handleSearch}
    className="
    flex
    items-center
    bg-gray-100
    rounded-xl
    px-3
    py-2

    w-full
    sm:w-72
    md:w-56
    lg:w-64
    xl:w-80

    order-3
    sm:order-none
    "
>

    <FaSearch
        className="
        text-gray-400
        mr-2
        "
    />

    <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="
        bg-transparent
        outline-none
        w-full
        text-sm
        "
    />

</form>


{/* NOTIFICATION */}

<div className="
relative
">


<button

onClick={()=>setShowNotifications(!showNotifications)}

className="
relative
text-gray-600
hover:text-blue-600
text-2xl
transition
"

>


<FaBell/>


{


unreadCount>0 &&


<span

className="
absolute
-top-2
-right-2
bg-red-500
text-white
text-xs
w-5
h-5
rounded-full
flex
items-center
justify-center
"

>

{unreadCount}

</span>


}



</button>







{


showNotifications &&


<div

className="
absolute
right-0
mt-4
w-80
bg-white
rounded-2xl
shadow-2xl
border
z-50
"

>



<div className="
p-4
font-bold
border-b
">

Notifications

</div>





{


notifications.length===0 ?


<p className="
p-5
text-gray-500
text-center
">

No notifications

</p>



:




notifications.map(notification=>(

<div

key={notification.id}

onClick={()=>readNotification(notification.id)}

className={`

p-4
border-b
cursor-pointer
hover:bg-gray-50

${
notification.is_read===0

?

"bg-blue-50"

:

""

}

`}

>


<p className="text-sm text-gray-700">

{notification.message}

</p>


<p className="text-xs text-gray-500 mt-2">

Sent by: {notification.sender_name || "System"}

</p>



<p className="text-xs text-gray-400 mt-1">

{
new Date(
notification.created_at
).toLocaleString()

}

</p>


</div>

))
}



</div>



}



</div>










{/* PROFILE */}

<div

onClick={()=>navigate("/profile")}

className="
flex
items-center
gap-3
cursor-pointer
hover:bg-gray-100
px-2
xl:px-3
py-2
rounded-xl
transition
"

>

    {/* Avatar */}

    <div

    className="
    w-12
    h-12
    rounded-full
    overflow-hidden
    bg-gradient-to-r
    from-blue-600
    to-purple-600
    text-white
    flex
    items-center
    justify-center
    font-bold
    text-xl
    "

    >

        {

        profile?.profile_image

        ?

        <img

        src={`http://localhost:5000/uploads/${profile.profile_image}`}

        className="
        w-full
        h-full
        object-cover
        "

        alt="Profile"

        />

        :

        profile?.name

        ?

        profile.name.charAt(0).toUpperCase()

        :

        "U"

        }

    </div>



    {/* Name & Role */}

    <div className="hidden xl:block">

        <p className="font-semibold text-gray-800">

            {profile?.name || user?.name}

        </p>

        <span

        className="
        text-xs
        px-3
        py-1
        rounded-full
        bg-blue-100
        text-blue-700
        "

        >

            {user?.role}

        </span>

    </div>

</div>



{/* LOGOUT */}

<button

onClick={logout}

className="
flex
items-center
gap-2
bg-red-500
hover:bg-red-600
text-white
px-3
lg:px-4
py-2
rounded-xl
transition
text-sm
"
>
<FaSignOutAlt/>

Logout

</button>

</div>

</header>

);

}

export default Navbar;