import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";


function Login(){

    const navigate = useNavigate();


    const [form,setForm] = useState({

        email:"",
        password:""

    });



    const handleChange = (e)=>{

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };



    const handleLogin = async(e)=>{

        e.preventDefault();

export const login = (req, res) => {

    console.log("LOGIN REQUEST:", req.body);

    const { email, password } = req.body;

    
}
        try{

            const res = await API.post("/auth/login", form);


            localStorage.setItem(
                "token",
                res.data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );


            navigate("/dashboard");


        }catch(error){

            console.log(
                error.response?.data || error.message
            );

            alert("Login failed");

        }

    };



    return(

        <div className="p-6">


            <h1 className="text-3xl font-bold">
                Login
            </h1>



            <form onSubmit={handleLogin}>


                <input

                    name="email"

                    placeholder="Email"

                    value={form.email}

                    onChange={handleChange}

                />



                <input

                    name="password"

                    type="password"

                    placeholder="Password"

                    value={form.password}

                    onChange={handleChange}

                />



                <button type="submit">

                    Login

                </button>


            </form>


        </div>

    );

}


export default Login;