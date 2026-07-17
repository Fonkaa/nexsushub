import { 
    useEffect,
    useState
} from "react";

import API from "../api/axios";


import {
    FaEye,
    FaShieldAlt,
    FaUserCircle,
    FaClock,
    FaCheckCircle,
    FaClipboardList,
    FaBoxes,
    FaChartLine,
    FaBuilding,
    FaArrowRight,
    FaLock,
    FaGlobe,
    FaServer,
    FaDatabase
} from "react-icons/fa";



function Viewer(){


const user = JSON.parse(
    localStorage.getItem("user")
);



const [stats,setStats] = useState(null);



useEffect(()=>{


fetchViewerData();


},[]);





const fetchViewerData = async()=>{


try{


const response = await API.get(
    "/dashboard/stats"
);


console.log(
"VIEWER DATA:",
response.data
);



setStats(response.data);



}catch(error){


console.log(
"VIEWER ERROR:",
error.response?.data || error.message
);


}



};







return (

<div
  className="
  min-h-screen
  bg-gradient-to-br
  from-slate-100
  via-blue-50
  to-purple-100
  p-6
  lg:p-10
"
>

  {/* ================= HERO ================= */}

  <div
    className="
    relative
    overflow-hidden
    rounded-3xl
    shadow-2xl
    bg-gradient-to-r
    from-indigo-700
    via-purple-700
    to-blue-700
    text-white
    p-10
  "
  >

    {/* Background Icon */}

    <div
      className="
      absolute
      right-10
      top-5
      opacity-10
      text-[250px]
    "
    >
      <FaBuilding />
    </div>

    {/* Hero Content */}

    <div
      className="
      relative
      z-10
    "
    >

      <div
        className="
        flex
        items-center
        gap-6
      "
      >

        <div
          className="
          w-24
          h-24
          rounded-full
          bg-white/20
          flex
          items-center
          justify-center
          text-5xl
        "
        >
          <FaEye />
        </div>

        <div>

          <h1
            className="
            text-5xl
            font-black
          "
          >
            Welcome Back, {user?.name}
          </h1>

          <p
            className="
            mt-3
            text-xl
            text-blue-100
          "
          >
            NexusHub Information Portal
          </p>

          <p
            className="
            mt-2
            text-blue-200
          "
          >
            View organizational activities,
            resources and performance information.
          </p>

        </div>

      </div>

      {/* Hero Badges */}

      <div
        className="
        flex
        flex-wrap
        gap-4
        mt-8
      "
      >

        <div
          className="
          bg-white/20
          backdrop-blur
          px-6
          py-3
          rounded-full
          flex
          items-center
          gap-3
        "
        >
          <FaShieldAlt />
          <span>Read Only Access</span>
        </div>

        <div
          className="
          bg-white/20
          backdrop-blur
          px-6
          py-3
          rounded-full
          flex
          items-center
          gap-3
        "
        >
          <FaLock />
          <span>Secure Account</span>
        </div>

        <div
          className="
          bg-white/20
          backdrop-blur
          px-6
          py-3
          rounded-full
          flex
          items-center
          gap-3
        "
        >
          <FaGlobe />
          <span>Organization Viewer</span>
        </div>

      </div>

    </div>

  </div>

{/* ================= WELCOME MESSAGE ================= */}

<div
  className="
  mt-10
  bg-white
  rounded-3xl
  shadow-xl
  p-8
"
>

  <div
    className="
    flex
    items-center
    gap-5
  "
  >

    <div
      className="
      bg-blue-100
      text-blue-600
      p-5
      rounded-2xl
      text-4xl
    "
    >
      <FaUserCircle />
    </div>

    <div>

      <h2
        className="
        text-3xl
        font-black
        text-gray-800
      "
      >
        Viewer Dashboard
      </h2>

      <p
        className="
        text-gray-500
        mt-2
        text-lg
      "
      >
        Monitor NexusHub operations without modifying system data.
      </p>

    </div>

  </div>

  {/* Dashboard Cards */}

  <div
    className="
    grid
    md:grid-cols-2
    xl:grid-cols-4
    gap-6
    mt-10
  "
  >

    {/* Card 1 */}

    <div className="bg-white rounded-3xl shadow-xl p-7 hover:-translate-y-2 transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500">Account Type</p>
          <h2 className="text-3xl font-black mt-3">
            Viewer
          </h2>
        </div>

        <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl text-3xl">
          <FaEye />
        </div>

      </div>

    </div>

    {/* Card 2 */}

    <div className="bg-white rounded-3xl shadow-xl p-7 hover:-translate-y-2 transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500">System Status</p>
          <h2 className="text-3xl font-black text-green-600 mt-3">
            Active
          </h2>
        </div>

        <div className="bg-green-100 text-green-600 p-4 rounded-2xl text-3xl">
          <FaCheckCircle />
        </div>

      </div>

    </div>

    {/* Card 3 */}

    <div className="bg-white rounded-3xl shadow-xl p-7 hover:-translate-y-2 transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500">Security</p>
          <h2 className="text-3xl font-black mt-3">
            Protected
          </h2>
        </div>

        <div className="bg-purple-100 text-purple-600 p-4 rounded-2xl text-3xl">
          <FaServer />
        </div>

      </div>

    </div>

    {/* Card 4 */}

    <div className="bg-white rounded-3xl shadow-xl p-7 hover:-translate-y-2 transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500">Permission</p>
          <h2 className="text-3xl font-black mt-3">
            View Only
          </h2>
        </div>

        <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl text-3xl">
          <FaDatabase />
        </div>

      </div>

    </div>

  </div>

</div>

{/* ================= OPERATIONAL OVERVIEW ================= */}

<div
  className="
  mt-12
"
>

  <h2
    className="
    text-4xl
    font-black
    text-gray-800
  "
  >
    Operational Overview
  </h2>

  <p
    className="
    text-gray-500
    mt-3
    text-lg
  "
  >
    A quick summary of current NexusHub activities.
  </p>

  <div
    className="
    grid
    md:grid-cols-3
    gap-8
    mt-8
  "
  >

    {/* Total Requests */}

    <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500">Total Requests</p>
          <h2 className="text-5xl font-black mt-3 text-blue-600">
            {stats?.totalRequests || 0}
          </h2>
        </div>

        <div className="bg-blue-100 text-blue-600 rounded-2xl p-5 text-4xl">
          <FaClipboardList />
        </div>

      </div>

      <p className="mt-5 text-gray-500">
        All submitted work requests in the organization.
      </p>

    </div>

    {/* Approved Requests */}

    <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500">Approved Requests</p>
          <h2 className="text-5xl font-black mt-3 text-green-600">
            {stats?.approvedRequests || 0}
          </h2>
        </div>

        <div className="bg-green-100 text-green-600 rounded-2xl p-5 text-4xl">
          <FaCheckCircle />
        </div>

      </div>

      <p className="mt-5 text-gray-500">
        Successfully approved operational requests.
      </p>

    </div>

    {/* Resources */}

    <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500">Available Resources</p>
          <h2 className="text-5xl font-black mt-3 text-purple-600">
            {stats?.availableResources || 0}
          </h2>
        </div>

        <div className="bg-purple-100 text-purple-600 rounded-2xl p-5 text-4xl">
          <FaBoxes />
        </div>

      </div>

      <p className="mt-5 text-gray-500">
        Resources currently available for usage.
      </p>

    </div>

  </div>

</div>

<div className="mt-14">

  <h2 className="
    text-4xl
    font-black
    text-gray-800
  ">
    Available Viewer Services
  </h2>

  <p className="
    text-gray-500
    mt-3
    text-lg
  ">
    Explore information available to your account.
  </p>

  <div className="
    grid
    lg:grid-cols-3
    gap-8
    mt-8
  ">

    {/* Work Requests */}

    <div className="
      bg-white
      rounded-3xl
      shadow-xl
      p-8
      group
      hover:-translate-y-3
      transition
    ">

      <div className="
        w-16
        h-16
        rounded-2xl
        bg-blue-100
        text-blue-600
        flex
        items-center
        justify-center
        text-3xl
      ">
        <FaClipboardList />
      </div>

      <h3 className="
        text-2xl
        font-bold
        mt-6
      ">
        Work Requests
      </h3>

      <p className="
        text-gray-500
        mt-4
        leading-8
      ">
        Review submitted requests, priorities,
        and current progress status.
      </p>

      <button className="
        mt-6
        flex
        items-center
        gap-3
        text-blue-600
        font-bold
      ">
        Explore
        <FaArrowRight />
      </button>

    </div>

    {/* Resources */}

    <div className="
      bg-white
      rounded-3xl
      shadow-xl
      p-8
      hover:-translate-y-3
      transition
    ">

      <div className="
        w-16
        h-16
        rounded-2xl
        bg-orange-100
        text-orange-600
        flex
        items-center
        justify-center
        text-3xl
      ">
        <FaBoxes />
      </div>

      <h3 className="
        text-2xl
        font-bold
        mt-6
      ">
        Resource Information
      </h3>

      <p className="
        text-gray-500
        mt-4
        leading-8
      ">
        View organizational resources,
        availability and inventory information.
      </p>

      <button className="
        mt-6
        flex
        items-center
        gap-3
        text-orange-600
        font-bold
      ">
        Explore
        <FaArrowRight />
      </button>

    </div>

    {/* Analytics */}

    <div className="
      bg-white
      rounded-3xl
      shadow-xl
      p-8
      hover:-translate-y-3
      transition
    ">

      <div className="
        w-16
        h-16
        rounded-2xl
        bg-purple-100
        text-purple-600
        flex
        items-center
        justify-center
        text-3xl
      ">
        <FaChartLine />
      </div>

      <h3 className="
        text-2xl
        font-bold
        mt-6
      ">
        Performance Analytics
      </h3>

      <p className="
        text-gray-500
        mt-4
        leading-8
      ">
        Understand organization performance
        through reports and statistics.
      </p>

      <button className="
        mt-6
        flex
        items-center
        gap-3
        text-purple-600
        font-bold
      ">
        Explore
        <FaArrowRight />
      </button>

    </div>

  </div>

</div>



<div
  className="
  mt-14
  bg-white
  rounded-3xl
  shadow-xl
  p-10
"
>

  <h2
    className="
    text-3xl
    font-black
  "
  >
    Account Information
  </h2>

  <div
    className="
    grid
    md:grid-cols-3
    gap-6
    mt-8
  "
  >

    {/* Name */}

    <div
      className="
      bg-gray-50
      rounded-2xl
      p-6
    "
    >

      <p className="text-gray-500">
        Name
      </p>

      <h3
        className="
        font-bold
        text-xl
        mt-3
      "
      >
        {user?.name}
      </h3>

    </div>

    {/* Email */}

    <div
      className="
      bg-gray-50
      rounded-2xl
      p-6
    "
    >

      <p className="text-gray-500">
        Email
      </p>

      <h3
        className="
        font-bold
        text-xl
        mt-3
      "
      >
        {user?.email}
      </h3>

    </div>

    {/* Role */}

    <div
      className="
      bg-gray-50
      rounded-2xl
      p-6
    "
    >

      <p className="text-gray-500">
        Role
      </p>

      <h3
        className="
        font-bold
        text-xl
        mt-3
        text-blue-600
      "
      >
        Viewer
      </h3>

    </div>

  </div>

</div>

<div className="
mt-14
grid
lg:grid-cols-2
gap-8
">






<div className="
bg-gradient-to-br
from-yellow-50
to-orange-100
border
border-yellow-200
rounded-3xl
p-10
shadow-lg
">


<div className="
flex
items-center
gap-4
">


<div className="
w-16
h-16
rounded-2xl
bg-yellow-200
text-yellow-700
flex
items-center
justify-center
text-3xl
">


<FaShieldAlt/>


</div>




<div>

<h2 className="
text-3xl
font-black
text-gray-800
">


Security Center


</h2>



<p className="
text-gray-500
mt-2
">

Your account protection status

</p>


</div>


</div>





<div className="
mt-8
space-y-5
">



<div className="
flex
items-center
justify-between
bg-white
rounded-2xl
p-5
">


<span className="
font-semibold
text-gray-600
">

Authentication

</span>



<span className="
bg-green-100
text-green-700
px-4
py-2
rounded-full
font-bold
">

Active

</span>


</div>







<div className="
flex
items-center
justify-between
bg-white
rounded-2xl
p-5
">


<span className="
font-semibold
text-gray-600
">

Permission Level

</span>



<span className="
bg-blue-100
text-blue-700
px-4
py-2
rounded-full
font-bold
">

Viewer

</span>


</div>







<div className="
flex
items-center
justify-between
bg-white
rounded-2xl
p-5
">


<span className="
font-semibold
text-gray-600
">

Data Access

</span>



<span className="
bg-purple-100
text-purple-700
px-4
py-2
rounded-full
font-bold
">

Read Only

</span>


</div>




</div>




</div>


<div className="
bg-white
rounded-3xl
shadow-xl
p-10
">


<div className="
flex
items-center
gap-4
">


<div className="
w-16
h-16
rounded-2xl
bg-blue-100
text-blue-600
flex
items-center
justify-center
text-3xl
">


<FaLock/>


</div>



<div>


<h2 className="
text-3xl
font-black
">

Viewer Policy

</h2>


<p className="
text-gray-500
mt-2
">

Access rules and restrictions

</p>



</div>



</div>






<div className="
mt-8
space-y-6
">


<div className="
flex
gap-4
">


<div className="
text-green-600
text-2xl
">

<FaCheckCircle/>

</div>



<p className="
text-gray-600
leading-7
">

You can view operational information,
reports, statistics and available resources.

</p>


</div>







<div className="
flex
gap-4
">


<div className="
text-red-500
text-2xl
">

<FaLock/>

</div>



<p className="
text-gray-600
leading-7
">

You cannot modify, delete or approve
organizational records.

</p>


</div>







<div className="
flex
gap-4
">


<div className="
text-blue-600
text-2xl
">

<FaEye/>

</div>



<p className="
text-gray-600
leading-7
">

Your access is designed for monitoring
and information visibility.

</p>


</div>



</div>




</div>



</div>

<div className="
mt-14
bg-gradient-to-r
from-indigo-700
via-purple-700
to-blue-700
rounded-3xl
shadow-2xl
p-10
text-white
">


<div className="
grid
md:grid-cols-3
gap-8
">






<div>


<h3 className="
text-2xl
font-black
">

NexusHub

</h3>



<p className="
mt-4
text-blue-100
leading-8
">

Smart Operations Management Portal
designed to improve organizational
visibility and efficiency.

</p>


</div>









<div>


<h3 className="
text-2xl
font-black
">

Viewer Experience

</h3>



<ul className="
mt-4
space-y-3
text-blue-100
">


<li>
✓ Request monitoring
</li>


<li>
✓ Resource tracking
</li>


<li>
✓ Performance reports
</li>


<li>
✓ Secure information access
</li>


</ul>



</div>









<div>


<h3 className="
text-2xl
font-black
">

System Status

</h3>



<div className="
mt-5
space-y-4
">



<div className="
bg-white/20
rounded-xl
p-4
flex
justify-between
">


<span>

Platform

</span>


<span className=" c
font-bold
">

Online

</span>


</div>





<div className="
bg-white/20
rounded-xl
p-4
flex
justify-between
">


<span>

Account

</span>


<span className="
font-bold
">

Verified

</span>


</div>




</div>



</div>






</div>




</div>

<div className="
mt-12
text-center
pb-10
">


<p className="
text-gray-500
">

© 2026 NexusHub Smart Operations Portal

</p>


<p className="
text-gray-400
mt-2
">

Viewer Dashboard • Secure Information Access

</p>



</div>







</div>


);

}


export default Viewer;