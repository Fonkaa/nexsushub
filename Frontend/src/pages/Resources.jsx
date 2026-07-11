import { useEffect, useState } from "react";
import API from "../api/axios";


function Resources(){

    const user = JSON.parse(localStorage.getItem("user"));

    const [resources,setResources] = useState([]);


    const [form,setForm] = useState({

        name:"",
        category:"",
        quantity:"",
        available:true

    });



    useEffect(()=>{

        fetchResources();

    },[]);



    const fetchResources = async()=>{

        try{

            const response = await API.get("/resources");

            setResources(response.data);


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


            await API.post("/resources",form);


            setForm({

                name:"",
                category:"",
                quantity:"",
                available:true

            });


            fetchResources();



        }catch(error){

            console.log(
                "Add resource error:",
                error
            );

        }

    };


const deleteResource = async(id)=>{

    try{

        await API.delete(`/resources/${id}`);

        fetchResources();


    }catch(error){

        console.log(
            "Delete error:",
            error
        );

    }

};




const toggleAvailability = async(id,current)=>{


    try{


        await API.put(`/resources/${id}`,{

            available: !current

        });


        fetchResources();


    }catch(error){

        console.log(
            "Update error:",
            error
        );

    }


};

return(

<div className="p-6">


<h1 className="text-3xl font-bold mb-6">
Resource Management
</h1>



{
user?.role === "admin" && (

<div className="bg-white shadow rounded p-5 mb-8">


<h2 className="text-xl font-semibold mb-4">
Add New Resource
</h2>



<form onSubmit={addResource}>


<input

className="border p-2 mr-3 mb-3"

type="text"

name="name"

placeholder="Resource name"

value={form.name}

onChange={handleChange}

/>



<input

className="border p-2 mr-3 mb-3"

type="text"

name="category"

placeholder="Category"

value={form.category}

onChange={handleChange}

/>



<input

className="border p-2 mr-3 mb-3"

type="number"

name="quantity"

placeholder="Quantity"

value={form.quantity}

onChange={handleChange}

/>



<button

className="bg-blue-600 text-white px-4 py-2 rounded"

type="submit"

>

Add Resource

</button>



</form>


</div>

)

}




<div className="grid md:grid-cols-3 gap-5">


{

resources.length > 0 ?


resources.map((resource)=>(


<div

key={resource.id}

className="bg-white shadow rounded p-5"

>


<h2 className="text-xl font-bold">

{resource.name}

</h2>



<p className="mt-2">

Category:
{resource.category}

</p>



<p>

Quantity:
{resource.quantity}

</p>



<p>

Status:

<span

className={
resource.available
?
"text-green-600 font-bold"
:
"text-red-600 font-bold"
}

>

{
resource.available
?
" Available"
:
" Not Available"
}

</span>


</p>



</div>


))


:

<p>
No resources available
</p>


}


</div>


</div>

);


}


export default Resources;