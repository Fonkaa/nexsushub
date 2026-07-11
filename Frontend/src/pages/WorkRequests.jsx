import { useEffect, useState } from "react";
import API from "../api/axios";

import {
    FaClipboardList,
    FaUserShield,
    FaPlus,
    FaCheck,
    FaTimes,
    FaTrash,
    FaUserPlus,
    FaFilter
} from "react-icons/fa";


function WorkRequests(){


const user = JSON.parse(
    localStorage.getItem("user")
);



const [requests,setRequests]=useState([]);

const [teamMembers,setTeamMembers]=useState([]);


const [statusFilter,setStatusFilter]=useState("All");

const [priorityFilter,setPriorityFilter]=useState("All");



const [form,setForm]=useState({

title:"",
description:"",
priority:"Medium"

});






useEffect(()=>{


fetchRequests();


if(user?.role==="admin"){

fetchTeamMembers();

}


},[]);








const fetchRequests=async()=>{


try{


const res=await API.get("/requests");

setRequests(res.data);



}catch(error){

console.log(
"Fetch requests error:",
error
);

}


};








const fetchTeamMembers=async()=>{


try{


const res=await API.get("/team");


setTeamMembers(res.data);



}catch(error){

console.log(error);

}


};








const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};









const createRequest=async(e)=>{


e.preventDefault();


try{


await API.post(

"/requests",

form

);



setForm({

title:"",
description:"",
priority:"Medium"

});



fetchRequests();



}catch(error){

console.log(error);

}


};









const updateStatus=async(id,status)=>{


try{


await API.put(

`/requests/${id}`,

{
status
}

);



fetchRequests();



}catch(error){

console.log(error);

}


};










const assignRequest=async(id,assigned_to)=>{


try{


await API.put(

`/requests/assign/${id}`,

{
assigned_to
}

);



fetchRequests();



}catch(error){

console.log(error);

}


};









const deleteRequest=async(id)=>{


if(!window.confirm(
"Delete this request?"
))
return;



try{


await API.delete(

`/requests/${id}`

);



fetchRequests();



}catch(error){

console.log(error);

}


};









const filteredRequests=requests.filter((r)=>{


const statusMatch =
statusFilter==="All" ||
r.status===statusFilter;



const priorityMatch =
priorityFilter==="All" ||
r.priority===priorityFilter;



return statusMatch && priorityMatch;



});







return(


<div className="
min-h-screen
bg-gray-100
p-6
">



{/* HEADER */}


<div className="
flex
justify-between
items-center
mb-8
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
flex
items-center
justify-center
text-blue-600
text-3xl
">


<FaClipboardList/>


</div>



<div>

<h1 className="
text-4xl
font-bold
text-gray-800
">

Work Requests

</h1>


<p className="
text-gray-500
mt-1
">

Manage employee requests efficiently

</p>


</div>


</div>





<div className="
bg-white
shadow-sm
rounded-2xl
px-6
py-4
flex
items-center
gap-3
">


<FaUserShield
className="text-blue-600"
/>


<div>

<p className="
text-xs
text-gray-500
">

Role

</p>


<p className="
font-bold
capitalize
">

{user?.role}

</p>


</div>


</div>



</div>
{/* CREATE REQUEST */}

{

user?.role !== "admin" &&

<div className="
bg-white
rounded-3xl
shadow-lg
p-8
mb-8
">


<h2 className="
text-2xl
font-bold
text-gray-800
mb-6
flex
items-center
gap-3
">

<FaPlus
className="text-blue-600"
/>

Create New Request

</h2>




<div className="
grid
md:grid-cols-2
gap-5
">


<input

name="title"

value={form.title}

onChange={handleChange}

placeholder="Request title"

className="
border
rounded-2xl
p-4
outline-none
focus:ring-2
focus:ring-blue-500
"

/>





<select

name="priority"

value={form.priority}

onChange={handleChange}

className="
border
rounded-2xl
p-4
outline-none
focus:ring-2
focus:ring-blue-500
"

>


<option value="High">
High Priority
</option>


<option value="Medium">
Medium Priority
</option>


<option value="Low">
Low Priority
</option>


</select>



</div>







<textarea

name="description"

value={form.description}

onChange={handleChange}

placeholder="Explain your request..."

className="
w-full
mt-5
border
rounded-2xl
p-4
h-32
outline-none
focus:ring-2
focus:ring-blue-500
"

/>






<button

onClick={createRequest}

className="
mt-5
flex
items-center
gap-3
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
px-7
py-3
rounded-2xl
font-semibold
shadow-lg
hover:scale-105
transition
"

>

<FaPlus/>

Submit Request

</button>



</div>

}








{/* FILTERS */}


<div className="
bg-white
rounded-3xl
shadow
p-6
mb-8
">


<div className="
flex
items-center
gap-3
mb-5
">


<FaFilter
className="text-blue-600"
/>


<h2 className="
text-xl
font-bold
">

Filter Requests

</h2>


</div>





<div className="
grid
md:grid-cols-2
gap-5
">


<select

className="
border
rounded-2xl
p-4
"

onChange={(e)=>
setStatusFilter(e.target.value)
}

>


<option value="All">
All Status
</option>


<option value="Pending">
Pending
</option>


<option value="Approved">
Approved
</option>


<option value="Rejected">
Rejected
</option>


</select>






<select

className="
border
rounded-2xl
p-4
"

onChange={(e)=>
setPriorityFilter(e.target.value)
}

>


<option value="All">
All Priority
</option>


<option value="High">
High
</option>


<option value="Medium">
Medium
</option>


<option value="Low">
Low
</option>


</select>


</div>



</div>









{/* REQUEST TABLE */}



<div className="
bg-white
rounded-3xl
shadow-xl
overflow-hidden
">



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
p-5
text-left
">

Request

</th>


<th className="
p-5
">

Priority

</th>



<th className="
p-5
">

Status

</th>



<th className="
p-5
">

Assigned

</th>



<th className="
p-5
">

Actions

</th>


</tr>


</thead>







<tbody>


{

filteredRequests.length===0 ?


<tr>

<td

colSpan="5"

className="
text-center
p-12
text-gray-500
"

>

No requests available

</td>

</tr>



:



filteredRequests.map((r)=>(


<tr

key={r.id}

className="
border-t
hover:bg-gray-50
transition
"

>


<td className="
p-5
">


<h3 className="
font-bold
text-gray-800
">

{r.title}

</h3>


<p className="
text-sm
text-gray-500
mt-1
">

{r.description}

</p>


</td>








<td className="
text-center
">


<span

className={

`
px-4
py-2
rounded-full
text-sm
font-semibold

${
r.priority==="High"

?

"bg-red-100 text-red-700"

:

r.priority==="Low"

?

"bg-green-100 text-green-700"

:

"bg-yellow-100 text-yellow-700"

}

`

}

>


{r.priority}


</span>


</td>









<td className="
text-center
">


<span

className={

`

px-4
py-2
rounded-full
font-semibold
text-sm

${
r.status==="Approved"

?

"bg-green-100 text-green-700"

:

r.status==="Rejected"

?

"bg-red-100 text-red-700"

:

"bg-blue-100 text-blue-700"

}

`

}

>


{r.status || "Pending"}


</span>


</td>









<td className="
text-center
font-medium
text-gray-600
">


{

r.assigned_name

||

<span className="
text-gray-400
">

Not Assigned

</span>

}



</td>









<td className="
p-5
">


{

user?.role==="admin" &&


<div className="
flex
flex-wrap
gap-3
items-center
">





<select

className="
border
rounded-xl
px-3
py-2
text-sm
"

onChange={(e)=>{


if(e.target.value){

assignRequest(
r.id,
e.target.value
)

}


}}


>


<option value="">

Assign Member

</option>



{

teamMembers.map(member=>(


<option

key={member.id}

value={member.id}

>


{member.full_name}


</option>


))


}


</select>









{

r.status==="Pending" &&


<>


<button

onClick={()=>updateStatus(
r.id,
"Approved"
)}

className="
flex
items-center
gap-2
bg-green-600
hover:bg-green-700
text-white
px-4
py-2
rounded-xl
font-semibold
transition
"


>

<FaCheck/>

Approve

</button>






<button

onClick={()=>updateStatus(
r.id,
"Rejected"
)}

className="
flex
items-center
gap-2
bg-red-600
hover:bg-red-700
text-white
px-4
py-2
rounded-xl
font-semibold
transition
"


>

<FaTimes/>

Reject

</button>


</>


}








<button

onClick={()=>deleteRequest(r.id)}

className="
flex
items-center
gap-2
bg-gray-800
hover:bg-black
text-white
px-4
py-2
rounded-xl
font-semibold
transition
"


>


<FaTrash/>

Delete


</button>





</div>


}


</td>





</tr>


))


}



</tbody>


</table>


</div>


</div>








</div>


);


}


export default WorkRequests;