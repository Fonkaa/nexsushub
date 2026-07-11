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



const [form,setForm]=useState({

    user_id:1,
    full_name:"",
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


await API.post(

"/team",

form

);



setForm({

user_id:1,
full_name:"",
phone:"",
department:"",
position:""

});



fetchMembers();



}catch(error){

console.log(error);

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


<div className="
p-6
bg-gray-100
min-h-screen
">





{/* HEADER */}


<div className="
flex
justify-between
items-center
mb-8
">


<div>


<h1 className="
text-4xl
font-bold
text-gray-800
">

Team Management

</h1>



<p className="
text-gray-500
mt-2
">

Manage employees and organization members

</p>


</div>





<div className="
bg-white
rounded-2xl
shadow
px-6
py-4
">


<p className="
text-gray-500
text-sm
">

Total Members

</p>


<p className="
text-3xl
font-bold
text-blue-600
">

{members.length}

</p>


</div>



</div>








{/* ADD MEMBER */}



{

user?.role==="admin" &&


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
mb-6
flex
items-center
gap-3
">


<FaUserPlus
className="text-blue-600"
/>


Add New Team Member


</h2>





<form

onSubmit={addMember}

className="
grid
md:grid-cols-5
gap-4
"

>


<input

name="full_name"

placeholder="Full Name"

value={form.full_name}

onChange={handleChange}

className="
border
rounded-xl
p-3
focus:ring-2
focus:ring-blue-500
outline-none
"

/>





<input

name="phone"

placeholder="Phone"

value={form.phone}

onChange={handleChange}

className="
border
rounded-xl
p-3
focus:ring-2
focus:ring-blue-500
outline-none
"

/>





<input

name="department"

placeholder="Department"

value={form.department}

onChange={handleChange}

className="
border
rounded-xl
p-3
focus:ring-2
focus:ring-blue-500
outline-none
"

/>





<input

name="position"

placeholder="Position"

value={form.position}

onChange={handleChange}

className="
border
rounded-xl
p-3
focus:ring-2
focus:ring-blue-500
outline-none
"

/>





<button

className="
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
rounded-xl
font-semibold
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



<input

placeholder="Search team members..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
w-full
md:w-96
mb-8
bg-white
border
rounded-2xl
p-4
shadow-sm
outline-none
focus:ring-2
focus:ring-blue-500
"

/>







{/* CARDS START */}

<div className="
grid
md:grid-cols-3
gap-6
"></div>
{

filteredMembers.length===0 ?


<div className="
bg-white
rounded-3xl
shadow
p-10
text-center
text-gray-500
col-span-3
">

No team members found

</div>



:


filteredMembers.map((member)=>(



<div

key={member.id}

className="
bg-white
rounded-3xl
shadow-md
hover:shadow-xl
transition
p-6
"

>





{

editing===member.id ?



/* EDIT MODE */

(

<div>


<h2 className="
text-xl
font-bold
mb-5
text-gray-800
">

Edit Member

</h2>





<input

value={editForm.full_name}

onChange={(e)=>

setEditForm({

...editForm,

full_name:e.target.value

})

}

className="
w-full
border
rounded-xl
p-3
mb-3
"

/>







<input

value={editForm.phone}

onChange={(e)=>

setEditForm({

...editForm,

phone:e.target.value

})

}

className="
w-full
border
rounded-xl
p-3
mb-3
"

/>







<input

value={editForm.department}

onChange={(e)=>

setEditForm({

...editForm,

department:e.target.value

})

}

className="
w-full
border
rounded-xl
p-3
mb-3
"

/>







<input

value={editForm.position}

onChange={(e)=>

setEditForm({

...editForm,

position:e.target.value

})

}

className="
w-full
border
rounded-xl
p-3
mb-3
"

/>








<select

value={editForm.status}

onChange={(e)=>

setEditForm({

...editForm,

status:e.target.value

})

}

className="
w-full
border
rounded-xl
p-3
mb-5
"

>


<option value="active">

Active

</option>


<option value="inactive">

Inactive

</option>


</select>








<div className="
flex
gap-3
">


<button

onClick={()=>saveEdit(member.id)}

className="
flex
items-center
gap-2
bg-green-600
hover:bg-green-700
text-white
px-5
py-3
rounded-xl
font-semibold
transition
"

>


<FaSave/>

Save


</button>







<button

onClick={()=>setEditing(null)}

className="
flex
items-center
gap-2
bg-gray-500
hover:bg-gray-600
text-white
px-5
py-3
rounded-xl
font-semibold
transition
"

>


<FaTimes/>

Cancel


</button>


</div>



</div>


)





:




/* NORMAL CARD */

(


<>


<div className="
flex
justify-between
items-start
">


<div className="
w-14
h-14
rounded-full
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
flex
items-center
justify-center
text-2xl
font-bold
">


{

member.full_name.charAt(0)

}


</div>





<span className={

member.status==="active"

?

"bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold"

:

"bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-semibold"

}>


{

member.status

}


</span>


</div>








<h2 className="
text-2xl
font-bold
mt-5
text-gray-800
">

{member.full_name}

</h2>








<div className="
mt-5
space-y-3
text-gray-600
">


<p>

📞

<span className="ml-2">

{member.phone}

</span>


</p>





<p>

🏢

<span className="ml-2">

{member.department}

</span>


</p>






<p>

💼

<span className="ml-2">

{member.position}

</span>


</p>


</div>









{

user?.role==="admin" &&



<div className="
mt-6
flex
gap-3
flex-wrap
">


<button

onClick={()=>startEdit(member)}

className="
flex
items-center
gap-2
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-2
rounded-xl
font-semibold
transition
"

>


<FaEdit/>

Edit


</button>







<button

onClick={()=>deleteMember(member.id)}

className="
flex
items-center
gap-2
bg-red-600
hover:bg-red-700
text-white
px-5
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




</>

)


}




</div>


))

}



</div>



);


}


export default TeamMembers;