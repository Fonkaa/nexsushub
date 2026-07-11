import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";


function Register(){

    const navigate = useNavigate();


    const [form,setForm] = useState({

        name:"",
        username:"",
        email:"",
        password:""

    });



    const handleChange = (e)=>{

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };



    const handleRegister = async(e)=>{

        e.preventDefault();
console.log(form);

        try{

            const res = await API.post("/auth/register", form);


            console.log(res.data);


            alert("Registration successful");


            navigate("/login");


        }catch(error){

            console.log(
                error.response?.data || error.message
            );


            alert("Registration failed");

        }

    };



    return (

        <div className="p-6">


            <h1 className="text-3xl font-bold mb-5">
                Register
            </h1>



            <form onSubmit={handleRegister}>


                <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                />


                <br />


               <input
    name="name"
    placeholder="Full Name"
    value={form.name}
    onChange={handleChange}
/>


<input
    name="username"
    placeholder="Username"
    value={form.username}
    onChange={handleChange}
/>


<input
    name="email"
    placeholder="Email"
    type="email"
    value={form.email}
    onChange={handleChange}
/>


<input
    name="password"
    placeholder="Password"
    type="password"
    value={form.password}
    onChange={handleChange}
/>

                <br />


                <button type="submit">
                    Register
                </button>


            </form>


        </div>

    );

}


export { Register };