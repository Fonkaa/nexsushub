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










const assignRequest = async(id, assigned_to)=>{

try{

await API.put(
    `/requests/assign/${id}`,
    {
        assigned_to
    }
);


fetchRequests();


}catch(error){

console.log(
"ASSIGN ERROR:",
error
);


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

<div className="min-h-screen bg-gray-100 p-6">


{/* HEADER */}

<div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">


<div className="flex items-center gap-4">


<div className="
w-16
h-16
rounded-2xl
bg-gradient-to-br
from-blue-600
to-purple-600
text-white
flex
items-center
justify-center
text-3xl
shadow-lg
">

<FaClipboardList/>

</div>



<div>

<h1 className="
text-4xl
font-black
text-gray-800
">

Work Requests

</h1>


<p className="
text-gray-500
mt-1
">

Monitor, assign and manage employee requests

</p>


</div>


</div>






<div className="
bg-white
rounded-2xl
shadow-lg
px-6
py-4
flex
items-center
gap-4
">


<FaUserShield
className="text-blue-600 text-2xl"
/>


<div>

<p className="text-xs text-gray-400">
Current Role
</p>


<p className="font-bold capitalize">
{user?.role}
</p>


</div>


</div>


</div>









{/* CREATE REQUEST */}

{

user?.role!=="admin" &&


<div className="
bg-white
rounded-3xl
shadow-xl
p-8
mb-8
">


<h2 className="
text-2xl
font-bold
mb-6
flex
gap-3
items-center
">


<FaPlus className="text-blue-600"/>

New Work Request


</h2>





<div className="
grid
lg:grid-cols-3
gap-5
">


<input

name="title"

value={form.title}

onChange={handleChange}

placeholder="Request title"

className="
border
rounded-xl
px-4
py-3
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
rounded-xl
px-4
py-3
"

>


<option>
High
</option>

<option>
Medium
</option>

<option>
Low
</option>


</select>





<button

onClick={createRequest}

className="
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
rounded-xl
font-bold
hover:scale-105
transition
"

>

<FaPlus className="inline mr-2"/>

Submit

</button>



</div>





<textarea

name="description"

value={form.description}

onChange={handleChange}

placeholder="Describe your request..."

className="
mt-5
w-full
border
rounded-xl
p-4
h-28
outline-none
focus:ring-2
focus:ring-blue-500
"

/>



</div>

}








{/* FILTER */}


<div className="
bg-white
rounded-3xl
shadow-lg
p-5
mb-8
">


<div className="
flex
items-center
gap-3
mb-4
">

<FaFilter className="text-blue-600"/>

<h2 className="font-bold text-xl">
Filters
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
rounded-xl
p-3
"

onChange={(e)=>setStatusFilter(e.target.value)}

>

<option>
All Status
</option>

<option>
Pending
</option>

<option>
Approved
</option>

<option>
Rejected
</option>


</select>




<select

className="
border
rounded-xl
p-3
"

onChange={(e)=>setPriorityFilter(e.target.value)}

>

<option>
All Priority
</option>

<option>
High
</option>

<option>
Medium
</option>

<option>
Low
</option>


</select>



</div>


</div>










{/* TABLE */}



<div className="
bg-white
rounded-3xl
shadow-xl
overflow-hidden
">


<div className="
px-6
py-5
border-b
">


<h2 className="
font-bold
text-xl
">

Request Management


</h2>


</div>





<div className="overflow-x-auto">


<table className="
w-full
text-sm
">


<thead className="
bg-gray-50
text-gray-500
uppercase
">


<tr>


<th className="px-5 py-4 text-left">
Request
</th>


<th className="px-5 py-4">
Priority
</th>


<th className="px-5 py-4">
Status
</th>


<th className="px-5 py-4">
Assigned
</th>


<th className="px-5 py-4">
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
py-12
text-gray-400
"

>

No requests found

</td>

</tr>



:


filteredRequests.map(r=>(



<tr

key={r.id}

className="
border-t
hover:bg-gray-50
transition
"



>


<td className="px-5 py-4 max-w-xs">


<p className="
font-bold
text-gray-800
truncate
">

{r.title}

</p>


<p className="
text-gray-500
truncate
">

{r.description}

</p>


</td>







<td className="text-center">


<span className={

`
px-3
py-1
rounded-full
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

}>


{r.priority}


</span>


</td>








<td className="text-center">


<span className="

px-3
py-1
rounded-full
font-semibold

bg-blue-100
text-blue-700

">


{r.status || "Pending"}


</span>


</td>







<td className="text-center">


{
r.assigned_name ||

<span className="text-gray-400">
Not Assigned
</span>

}


</td>









<td className="px-5">


<div className="
flex
items-center
gap-2
whitespace-nowrap
">


{

user?.role==="admin" &&

<>


<select

className="
border
rounded-lg
px-2
py-1
text-xs
"

onChange={(e)=>{

if(e.target.value)

assignRequest(
r.id,
e.target.value
)

}}

>

<option>
Assign
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





<button

onClick={()=>updateStatus(r.id,"Approved")}

className="
bg-green-600
text-white
px-3
py-2
rounded-lg
hover:bg-green-700
"

>

<FaCheck/>

</button>





<button

onClick={()=>updateStatus(r.id,"Rejected")}

className="
bg-red-600
text-white
px-3
py-2
rounded-lg
hover:bg-red-700
"

>

<FaTimes/>

</button>




<button

onClick={()=>deleteRequest(r.id)}

className="
bg-gray-800
text-white
px-3
py-2
rounded-lg
hover:bg-black
"

>

<FaTrash/>

</button>



</>


}



</div>


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