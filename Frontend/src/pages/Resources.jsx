import { useEffect, useState } from "react";
import API from "../api/axios";

import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaCheckCircle,
    FaTimesCircle,
    FaSave,
    FaTimes,
    FaBoxes
} from "react-icons/fa";
function Resources(){


const user = JSON.parse(
    localStorage.getItem("user")
);



const [resources,setResources] = useState([]);



const [form,setForm] = useState({

    name:"",
    category:"",
    quantity:""

});



const [editing,setEditing] = useState(null);



const [editForm,setEditForm] = useState({

    name:"",
    category:"",
    quantity:""

});







useEffect(()=>{

    fetchResources();

},[]);








const fetchResources = async()=>{


try{


const res = await API.get("/resources");


setResources(res.data);



}catch(error){

console.log(
"Fetch resources error:",
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









const addResource = async(e)=>{


e.preventDefault();



try{


await API.post(

"/resources",

form

);



setForm({

    name:"",
    category:"",
    quantity:""

});



fetchResources();



}catch(error){

console.log(error);

}



};









// START EDIT MODE

const startEdit=(resource)=>{


setEditing(resource.id);



setEditForm({

    name:resource.name,

    category:resource.category,

    quantity:resource.quantity

});


};









// SAVE EDIT

const saveEdit=async(id)=>{


try{


await API.put(

`/resources/edit/${id}`,

editForm

);



setEditing(null);



fetchResources();



}catch(error){

console.log(error);

}


};









// CHANGE AVAILABILITY

const toggleAvailability=async(resource)=>{


try{


await API.put(

`/resources/${resource.id}`,

{

available:!resource.available

}

);



fetchResources();



}catch(error){

console.log(error);

}


};









// DELETE

const deleteResource=async(id)=>{


if(!window.confirm(
"Are you sure you want to delete this resource?"
))
return;



try{


await API.delete(

`/resources/${id}`

);



fetchResources();



}catch(error){

console.log(error);

}


};









return(


<div className="
p-6
bg-gray-100
min-h-screen
">





{/* HEADER */}

<div className="mb-8">


<h1 className="
text-3xl
font-bold
text-gray-800
">

Resource Management

</h1>


<p className="
text-gray-500
mt-2
">

Manage organization resources efficiently

</p>


</div>









{/* ADD RESOURCE */}

{

user?.role==="admin" &&


<div className="
bg-white
rounded-3xl
shadow-lg
p-6
mb-8
">


<h2 className="
text-xl
font-bold
mb-5
">

Add New Resource

</h2>




<form

onSubmit={addResource}

className="
grid
md:grid-cols-4
gap-4
"


>


<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="Resource name"

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

name="category"

value={form.category}

onChange={handleChange}

placeholder="Category"

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

name="quantity"

type="number"

value={form.quantity}

onChange={handleChange}

placeholder="Quantity"

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
flex
items-center
justify-center
gap-2
bg-blue-600
hover:bg-blue-700
text-white
font-semibold
rounded-xl
px-6
py-3
transition-all
duration-300
shadow-md
hover:shadow-lg
"
>
<FaPlus/>
Add Resource
</button>



</form>


</div>


}









{/* RESOURCE CARDS */}


{

resources.length===0 ?


<div className="
bg-white
rounded-3xl
shadow
p-10
text-center
text-gray-500
">

No resources available

</div>



:


<div className="
grid
md:grid-cols-3
gap-6
">



{

resources.map(resource=>(


<div

key={resource.id}

className="
bg-white
rounded-3xl
shadow-md
hover:shadow-2xl
transition
p-6
"


>




{

editing===resource.id ?



/* EDIT FORM */

<div>


<h2 className="
text-xl
font-bold
mb-4
">

Edit Resource

</h2>



<input

value={editForm.name}

onChange={(e)=>

setEditForm({

...editForm,

name:e.target.value

})

}

className="
border
rounded-xl
p-3
w-full
mb-3
"

/>




<input

value={editForm.category}

onChange={(e)=>

setEditForm({

...editForm,

category:e.target.value

})

}

className="
border
rounded-xl
p-3
w-full
mb-3
"

/>




<input

type="number"

value={editForm.quantity}

onChange={(e)=>

setEditForm({

...editForm,

quantity:e.target.value

})

}

className="
border
rounded-xl
p-3
w-full
mb-4
"

/>



<div className="flex gap-3 mt-4">


<button
onClick={()=>saveEdit(resource.id)}
className="
flex
items-center
gap-2
bg-green-600
hover:bg-green-700
text-white
px-5
py-2.5
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
py-2.5
rounded-xl
transition
"
>
<FaTimes/>
Cancel
</button>


</div>



</div>



:



/* NORMAL CARD */


<>


<div className="
flex
justify-between
items-start
">


<div className="flex items-center gap-3">

<div className="
w-12
h-12
rounded-xl
bg-blue-100
flex
items-center
justify-center
text-blue-600
text-xl
">

<FaBoxes/>

</div>

<div>

<h2 className="text-xl font-bold text-gray-800">
{resource.name}
</h2>

<p className="text-sm text-gray-500">
{resource.category}
</p>

</div>

</div>



<span
className={`

inline-flex
items-center
gap-2
px-4
py-2
rounded-full
text-sm
font-semibold

${
resource.available
?
"bg-green-100 text-green-700"
:
"bg-red-100 text-red-700"
}

`}
>

{
resource.available
?
<>
<FaCheckCircle/>
Available
</>
:
<>
<FaTimesCircle/>
Unavailable
</>
}

</span>



</div>








<div className="
mt-5
space-y-3
text-gray-600
">


<p>

Category:

<span className="
font-semibold
ml-2
">

{resource.category}

</span>


</p>



<p>

Quantity:

<span className="
font-semibold
ml-2
">

{resource.quantity}

</span>


</p>



</div>










{

user?.role==="admin" &&


<div className="
mt-6
flex
flex-wrap
gap-3
">





<button

onClick={()=>toggleAvailability(resource)}

className="
bg-yellow-500
hover:bg-yellow-600
text-white
px-4
py-2
rounded-xl
font-semibold
transition
"

>

⚡ Status

</button>





<button

onClick={()=>startEdit(resource)}

className="
bg-blue-600
hover:bg-blue-700
text-white
px-4
py-2
rounded-xl
font-semibold
transition
"

>

✏ Edit

</button>





<button

onClick={()=>deleteResource(resource.id)}

className="
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

🗑 Delete

</button>






</div>


}




</>



}



</div>



))


}



</div>


}





</div>


);


}


export default Resources;