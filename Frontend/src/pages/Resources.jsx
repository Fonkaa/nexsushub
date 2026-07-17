import { useEffect, useState } from "react";
import API from "../api/axios";

import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaSave,
    FaTimes,
    FaBoxes,
    FaCheckCircle,
    FaTimesCircle,
    FaLayerGroup,
    FaChartBar
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









const startEdit=(resource)=>{


setEditing(resource.id);


setEditForm({

name:resource.name,

category:resource.category,

quantity:resource.quantity

});


};








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









const deleteResource=async(id)=>{


if(!window.confirm(
"Delete this resource?"
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






const totalQuantity = resources.reduce(

(sum,item)=>sum + Number(item.quantity),

0

);



const availableCount = resources.filter(

(item)=>item.available

).length;



const unavailableCount = resources.filter(

(item)=>!item.available

).length;





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

<FaBoxes/>

</div>



<div>


<h1 className="
text-4xl
font-black
text-gray-800
">

Resource Management

</h1>


<p className="
text-gray-500
mt-2
">

Track and manage organizational resources efficiently

</p>


</div>


</div>


</div>







{/* STATISTICS */}


<div className="
grid
md:grid-cols-4
gap-6
mb-8
">



<div className="
bg-white
rounded-3xl
shadow-md
p-6
flex
items-center
gap-5
">


<div className="
w-14
h-14
rounded-2xl
bg-blue-100
text-blue-600
flex
items-center
justify-center
text-2xl
">

<FaLayerGroup/>

</div>


<div>

<p className="
text-gray-500
text-sm
">

Total Resources

</p>


<h2 className="
text-3xl
font-bold
">

{resources.length}

</h2>


</div>


</div>







<div className="
bg-white
rounded-3xl
shadow-md
p-6
flex
items-center
gap-5
">


<div className="
w-14
h-14
rounded-2xl
bg-green-100
text-green-600
flex
items-center
justify-center
text-2xl
">

<FaCheckCircle/>

</div>


<div>

<p className="
text-gray-500
text-sm
">

Available

</p>


<h2 className="
text-3xl
font-bold
">

{availableCount}

</h2>


</div>


</div>








<div className="
bg-white
rounded-3xl
shadow-md
p-6
flex
items-center
gap-5
">


<div className="
w-14
h-14
rounded-2xl
bg-red-100
text-red-600
flex
items-center
justify-center
text-2xl
">

<FaTimesCircle/>

</div>


<div>

<p className="
text-gray-500
text-sm
">

Unavailable

</p>


<h2 className="
text-3xl
font-bold
">

{unavailableCount}

</h2>


</div>


</div>







<div className="
bg-white
rounded-3xl
shadow-md
p-6
flex
items-center
gap-5
">


<div className="
w-14
h-14
rounded-2xl
bg-purple-100
text-purple-600
flex
items-center
justify-center
text-2xl
">

<FaChartBar/>

</div>


<div>

<p className="
text-gray-500
text-sm
">

Total Quantity

</p>


<h2 className="
text-3xl
font-bold
">

{totalQuantity}

</h2>


</div>


</div>


</div>






{/* ADD RESOURCE */}


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


<FaPlus className="text-blue-600"/>

Add New Resource


</h2>





<form

onSubmit={addResource}

className="
grid
md:grid-cols-4
gap-5
">


<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="Resource name"

className="
border
rounded-xl
p-4
outline-none
focus:ring-2
focus:ring-blue-500
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
p-4
outline-none
focus:ring-2
focus:ring-blue-500
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
p-4
outline-none
focus:ring-2
focus:ring-blue-500
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
flex
items-center
justify-center
gap-3
hover:scale-105
transition
"

>

<FaPlus/>

Add Resource


</button>



</form>


</div>


}
{/* RESOURCE TABLE */}


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
border-b
">


<tr>


<th className="
p-5
text-left
text-gray-600
font-semibold
">

Resource

</th>



<th className="
p-5
text-left
text-gray-600
font-semibold
">

Category

</th>



<th className="
p-5
text-center
text-gray-600
font-semibold
">

Quantity

</th>




<th className="
p-5
text-center
text-gray-600
font-semibold
">

Availability

</th>




{
user?.role==="admin" &&


<th className="
p-5
text-center
text-gray-600
font-semibold
">

Actions

</th>

}


</tr>


</thead>







<tbody>



{

resources.length===0 ?



<tr>

<td

colSpan="5"

className="
text-center
p-12
text-gray-500
"

>

No resources available

</td>

</tr>



:



resources.map((resource)=>(


<tr

key={resource.id}

className="
border-b
hover:bg-gray-50
transition
"

>





<td className="
p-5
">


<div className="
flex
items-center
gap-4
">


<div className="
w-12
h-12
rounded-xl
bg-blue-100
text-blue-600
flex
items-center
justify-center
text-xl
">


<FaBoxes/>


</div>




<div>


<h3 className="
font-bold
text-gray-800
">

{resource.name}

</h3>


<p className="
text-sm
text-gray-500
">

ID: #{resource.id}

</p>


</div>


</div>


</td>








<td className="
p-5
font-medium
text-gray-700
">


{resource.category}


</td>







<td className="
p-5
text-center
">


<span className="
px-5
py-2
rounded-xl
bg-blue-50
text-blue-700
font-bold
">


{resource.quantity}


</span>


</td>







<td className="
p-5
text-center
">


<span

className={

`
inline-flex
items-center
gap-2
px-4
py-2
rounded-full
font-semibold
text-sm

${
resource.available

?

"bg-green-100 text-green-700"

:

"bg-red-100 text-red-700"

}

`

}

>


{

resource.available ?

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



</td>









{

user?.role==="admin" &&



<td className="
p-5
">


<div className="
flex
justify-center
items-center
gap-3
flex-wrap
">





<button

onClick={()=>toggleAvailability(resource)}

className="
flex
items-center
gap-2
px-4
py-2
rounded-xl
bg-yellow-500
hover:bg-yellow-600
text-white
font-semibold
transition
shadow-sm
"


>


<FaCheckCircle/>

Status


</button>








<button

onClick={()=>startEdit(resource)}

className="
flex
items-center
gap-2
px-4
py-2
rounded-xl
bg-blue-600
hover:bg-blue-700
text-white
font-semibold
transition
shadow-sm
"


>


<FaEdit/>

Edit


</button>







<button

onClick={()=>deleteResource(resource.id)}

className="
flex
items-center
gap-2
px-4
py-2
rounded-xl
bg-red-600
hover:bg-red-700
text-white
font-semibold
transition
shadow-sm
"


>


<FaTrash/>

Delete


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







{/* EDIT MODAL */}


{

editing &&


<div className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
">


<div className="
bg-white
rounded-3xl
shadow-2xl
p-8
w-full
max-w-lg
">


<h2 className="
text-2xl
font-bold
mb-6
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
w-full
border
rounded-xl
p-4
mb-4
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
w-full
border
rounded-xl
p-4
mb-4
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
w-full
border
rounded-xl
p-4
mb-6
"

/>







<div className="
flex
gap-4
">


<button

onClick={()=>saveEdit(editing)}

className="
flex
items-center
justify-center
gap-2
bg-green-600
hover:bg-green-700
text-white
px-6
py-3
rounded-xl
font-semibold
flex-1
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
justify-center
gap-2
bg-gray-500
hover:bg-gray-600
text-white
px-6
py-3
rounded-xl
font-semibold
flex-1
"

>


<FaTimes/>

Cancel


</button>



</div>



</div>



</div>


}



</div>


);


}


export default Resources;