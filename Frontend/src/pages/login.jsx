import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Login(){

    const navigate = useNavigate();

console.log("NEW LOGIN COMPONENT LOADED");
    const [showPassword,setShowPassword] = useState(false);


    const [form,setForm] = useState({
        email:"",
        password:""
    });


    const [loading,setLoading] = useState(false);



    const handleChange=(e)=>{

        setForm({
            ...form,
            [e.target.name]:e.target.value
        });

    };




    const handleLogin=async(e)=>{

        e.preventDefault();


        try{

            setLoading(true);


            const res = await API.post(
                "/auth/login",
                form
            );


         console.log("BACKEND TOKEN:", res.data.token);


localStorage.setItem(
    "token",
    res.data.token
);


console.log(
    "LOCAL TOKEN:",
    localStorage.getItem("token")
);


           localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
);

console.log("LOGIN USER:", res.data.user);

if(res.data.user.role === "admin"){

    navigate("/dashboard");

}
else if(res.data.user.role === "employee"){

    if(res.data.user.first_login){
        navigate("/profile");
    }
    else{
        navigate("/dashboard");
    }

}
else if(res.data.user.role === "viewer"){

    navigate("/viewer");

}



        }catch(error){


            alert(
                error.response?.data?.message ||
                "Login failed"
            );


        }finally{

            setLoading(false);

        }

    };





return(

<div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex items-center justify-center px-5">


<div className="w-full max-w-md">


{/* Logo */}

<div className="text-center mb-8 text-white">


<h1 className="text-5xl font-extrabold tracking-wide">

NexusHub

</h1>


<p className="mt-3 text-indigo-100">

Smart Operations Management Portal

</p>


</div>





{/* Card */}

<div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">


<h2 className="text-3xl font-bold text-gray-800 text-center mb-6">

Welcome Back 👋

</h2>





<form 
onSubmit={handleLogin}
className="space-y-5"
>




<div className="relative">


<FaEnvelope className="absolute left-4 top-4 text-gray-400"/>


<input

name="email"

type="email"

placeholder="Email address"

value={form.email}

onChange={handleChange}

className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"

/>


</div>







<div className="relative">


<FaLock className="absolute left-4 top-4 text-gray-400"/>


<input

name="password"

type={
showPassword
?
"text"
:
"password"
}

placeholder="Password"

value={form.password}

onChange={handleChange}

className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"

/>


<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="absolute right-4 top-4 text-gray-400"

>


{
showPassword
?
<FaEyeSlash/>
:
<FaEye/>
}


</button>


</div>







<div className="flex justify-between text-sm">


<label className="flex items-center gap-2">

<input type="checkbox"/>

Remember me

</label>



<Link

to="/forgot-password"

className="
text-blue-600
text-sm
font-semibold
"

>

Forgot Password?

</Link>


</div>







<button

disabled={loading}

className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold hover:scale-[1.02] transition shadow-lg"

>


{

loading
?
"Signing in..."
:
"Login"

}


</button>




</form>







<div className="mt-6 text-center text-gray-500">


Don't have an account?


<Link

to="/register"

className="ml-2 text-indigo-600 font-bold hover:underline"

>

Create Account

</Link>


</div>




</div>


</div>


</div>


);


}


export default Login;