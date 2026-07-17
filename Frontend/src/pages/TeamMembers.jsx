import {useEffect,useState} from "react";
import API from "../api/axios";

import {
    FaEdit,
    FaTrash,
    FaSave,
    FaTimes,
    FaUserPlus
} from "react-icons/fa";


function TeamMembers(){


const user = JSON.parse(
    localStorage.getItem("user")
);



const [members,setMembers]=useState([]);

const [search,setSearch]=useState("");


const [form, setForm] = useState({

    full_name:"",
    username:"",
    email:"",
    phone:"",
    department:"",
    position:""

});




const [editing,setEditing]=useState(null);



const [editForm,setEditForm]=useState({

    full_name:"",
    phone:"",
    department:"",
    position:"",
    status:"active"

});







useEffect(()=>{

fetchMembers();

},[]);








const fetchMembers=async()=>{


try{


const res=await API.get("/team");


setMembers(res.data);



}catch(error){

console.log(
"Fetch team error:",
error
);


}


};








const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value


});


};










const addMember=async(e)=>{


e.preventDefault();


try{


const res = await API.post(
    "/team",
    form
);


alert(
    `Member created successfully.
Temporary Password: ${res.data.temporaryPassword}`
);
setForm({

    full_name:"",
    username:"",
    email:"",
    phone:"",
    department:"",
    position:""

});



fetchMembers();



}catch(error){

 alert(
        error.response?.data?.message ||
        "Failed to add member"
    );

}


};









// START EDIT

const startEdit=(member)=>{


setEditing(member.id);



setEditForm({

full_name:member.full_name,

phone:member.phone,

department:member.department,

position:member.position,

status:member.status


});


};









// SAVE EDIT


const saveEdit=async(id)=>{


try{


await API.put(

`/team/${id}`,

editForm

);



setEditing(null);


fetchMembers();



}catch(error){

console.log(error);


}


};









// DELETE


const deleteMember=async(id)=>{


if(!window.confirm(
"Delete this team member?"
))

return;



try{


await API.delete(

`/team/${id}`

);



fetchMembers();



}catch(error){

console.log(error);


}


};









const filteredMembers=members.filter((member)=>{


return (

member.full_name
.toLowerCase()
.includes(search.toLowerCase())

||

member.department
.toLowerCase()
.includes(search.toLowerCase())

);


});











return(

<div className="min-h-screen bg-gray-100 p-6">


{/* HEADER */}

<div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">


<div>

<h1 className="text-4xl font-black text-gray-800">
Team Members
</h1>

<p className="text-gray-500 mt-2 text-lg">
Manage organization employees, roles and information
</p>

</div>



<div className="grid grid-cols-2 gap-4">


<div className="
bg-white
rounded-2xl
shadow-lg
px-8
py-5
">

<p className="text-gray-400 text-sm">
Total Members
</p>

<h2 className="text-3xl font-bold text-blue-600">
{members.length}
</h2>

</div>



<div className="
bg-white
rounded-2xl
shadow-lg
px-8
py-5
">

<p className="text-gray-400 text-sm">
Active Members
</p>

<h2 className="text-3xl font-bold text-green-600">

{
members.filter(
m=>m.status==="active"
).length
}

</h2>

</div>


</div>


</div>





{/* ADD MEMBER */}

{
user?.role==="admin" &&

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
items-center
gap-3
">

<FaUserPlus className="text-blue-600"/>

Create New Member

</h2>



<form
onSubmit={addMember}
className="
grid
md:grid-cols-2
lg:grid-cols-3
gap-5
">


{
[
["full_name","Full Name"],
["username","Username"],
["email","Email"],
["phone","Phone"],
["department","Department"],
["position","Position"]

].map(([name,placeholder])=>(

<input

key={name}

name={name}

placeholder={placeholder}

value={form[name]}

onChange={handleChange}

className="
border
rounded-xl
px-4
py-3
outline-none
focus:ring-2
focus:ring-blue-500
transition
"

/>

))

}



<button

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

Add Member

</button>


</form>


</div>

}





{/* SEARCH */}

<div className="
bg-white
rounded-2xl
shadow
p-5
mb-6
">


<input

placeholder="Search members by name or department..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
w-full
md:w-96
border
rounded-xl
px-5
py-3
outline-none
focus:ring-2
focus:ring-blue-500
"

/>


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
text-xl
font-bold
text-gray-800
">

Employee Directory

</h2>

</div>



<div className="
overflow-x-auto
">


<table className="
w-full
text-left
">


<thead className="
bg-gray-50
text-gray-500
text-sm
uppercase
">


<tr>


<th className="px-6 py-4">
Employee
</th>


<th className="px-6 py-4">
Contact
</th>


<th className="px-6 py-4">
Department
</th>


<th className="px-6 py-4">
Position
</th>


<th className="px-6 py-4">
Status
</th>


{
user?.role==="admin" &&

<th className="px-6 py-4">
Actions
</th>

}



</tr>


</thead>





<tbody>


{

filteredMembers.length===0 ?

<tr>

<td
colSpan="6"
className="
text-center
py-16
text-gray-500
"
>

No team members found

</td>

</tr>



:


filteredMembers.map(member=>(


<tr

key={member.id}

className="
border-b
hover:bg-gray-50
transition
"


>


<td className="px-6 py-5">


<div className="
flex
items-center
gap-4
">


<div className="
w-12
h-12
rounded-full
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
flex
items-center
justify-center
font-bold
text-lg
">


{
member.full_name
?.charAt(0)
?.toUpperCase()
}


</div>



<div>

<p className="
font-bold
text-gray-800
">

{member.full_name}

</p>


<p className="
text-sm
text-gray-400
">

@{member.username}

</p>


</div>



</div>


</td>






<td className="px-6 py-5">


<p className="text-gray-700">

{member.email}

</p>


<p className="text-sm text-gray-400">

{member.phone}

</p>


</td>







<td className="px-6 py-5">


<span className="
bg-blue-100
text-blue-700
px-4
py-2
rounded-full
text-sm
font-semibold
">


{member.department}


</span>


</td>







<td className="px-6 py-5 text-gray-700 font-medium">


{member.position}


</td>







<td className="px-6 py-5">


<span className={

member.status==="active"

?

"bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold"

:

"bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold"

}>


{member.status}


</span>


</td>








{

user?.role==="admin" &&


<td className="px-6 py-5">


<div className="
flex
gap-3
">


<button

onClick={()=>startEdit(member)}

className="
bg-blue-600
hover:bg-blue-700
text-white
p-3
rounded-xl
transition
"

>

<FaEdit/>

</button>





<button

onClick={()=>deleteMember(member.id)}

className="
bg-red-600
hover:bg-red-700
text-white
p-3
rounded-xl
transition
"

>

<FaTrash/>

</button>



</div>


</td>


}




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


export default TeamMembers;