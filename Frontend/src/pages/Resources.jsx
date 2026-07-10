import { useEffect, useState } from "react";
import API from "../api/axios";


function Resources(){


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

            console.log(error);

        }

    };



    const handleChange = (e)=>{

        setForm({

            ...form,

            [e.target.name]: e.target.value

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

            console.log("Adding resource failed",error);

        }

    };



    return (

        <div>


            <h1>
                Resource Management
            </h1>



            <form onSubmit={addResource}>


                <input
                type="text"
                name="name"
                placeholder="Resource name"
                value={form.name}
                onChange={handleChange}
                />



                <input
                type="text"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                />



                <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleChange}
                />



                <button type="submit">
                    Add Resource
                </button>


            </form>



            <hr />



            {
                resources.length > 0 ?

                resources.map((resource)=>(


                    <div key={resource.id}>


                        <h3>
                            {resource.name}
                        </h3>


                        <p>
                            Category: {resource.category}
                        </p>


                        <p>
                            Quantity: {resource.quantity}
                        </p>


                        <p>
                            Available:
                            {resource.available ? " Yes" : " No"}
                        </p>


                        <hr />


                    </div>


                ))

                :

                <p>
                    No resources available
                </p>

            }


        </div>

    );

}


export default Resources;