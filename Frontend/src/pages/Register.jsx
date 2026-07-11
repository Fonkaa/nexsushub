import {useState} from "react";
import API from "../api/axios";
import {useNavigate, Link} from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaUserTag,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";


function Register(){


const navigate = useNavigate();


const [form,setForm]=useState({

name:"",
username:"",
email:"",
password:""

});


const [loading,setLoading]=useState(false);

const [showPassword,setShowPassword]=useState(false);





const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};






const handleRegister=async(e)=>{

e.preventDefault();


try{

setLoading(true);


await API.post(
"/auth/register",
form
);



alert(
"Registration successful. You can login now."
);



navigate("/");



}catch(error){


alert(

error.response?.data?.message ||
"Registration failed"

);



}finally{

setLoading(false);

}


};









return(


<div className="
min-h-screen 
flex 
items-center 
justify-center
bg-gradient-to-br 
from-indigo-600 
via-purple-600 
to-blue-700
px-4
">





<div className="
w-full 
max-w-md
bg-white/95
backdrop-blur-xl
rounded-3xl
shadow-2xl
p-6
">







<div className="
text-center
mb-5
">


<div className="
mx-auto 
w-14 
h-14
bg-purple-600
text-white
rounded-full
flex
items-center
justify-center
text-2xl
font-bold
shadow-lg
">

N

</div>





<h1 className="
text-3xl
font-extrabold
text-gray-800
mt-3
">

Create Account

</h1>





<p className="
text-gray-500
mt-1
text-sm
">

Join NexusHub Smart Operations Portal

</p>



<p className="
text-sm
text-purple-600
font-semibold
mt-1
">

Employee Registration

</p>



</div>









<form

onSubmit={handleRegister}

className="
space-y-3
"

>









<div className="relative">


<FaUser 
className="
absolute
left-4
top-3.5
text-gray-400
"
/>



<input

name="name"

placeholder="Full Name"

value={form.name}

onChange={handleChange}


className="
w-full
pl-12
pr-4
py-2.5
border
rounded-xl
outline-none
focus:ring-2
focus:ring-purple-500
transition
"

/>


</div>









<div className="relative">


<FaUserTag

className="
absolute
left-4
top-3.5
text-gray-400
"

/>



<input

name="username"

placeholder="Username"

value={form.username}

onChange={handleChange}


className="
w-full
pl-12
pr-4
py-2.5
border
rounded-xl
outline-none
focus:ring-2
focus:ring-purple-500
transition
"

/>


</div>









<div className="relative">


<FaEnvelope

className="
absolute
left-4
top-3.5
text-gray-400
"

/>



<input

name="email"

type="email"

placeholder="Email Address"

value={form.email}

onChange={handleChange}


className="
w-full
pl-12
pr-4
py-2.5
border
rounded-xl
outline-none
focus:ring-2
focus:ring-purple-500
transition
"

/>


</div>









<div className="relative">


<FaLock

className="
absolute
left-4
top-3.5
text-gray-400
"

/>



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


className="
w-full
pl-12
pr-12
py-2.5
border
rounded-xl
outline-none
focus:ring-2
focus:ring-purple-500
transition
"

/>





<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="
absolute
right-4
top-3
text-gray-500
hover:text-purple-600
"

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









<button

disabled={loading}

className="
w-full
bg-gradient-to-r
from-purple-600
to-indigo-600
hover:from-purple-700
hover:to-indigo-700
text-white
py-2.5
rounded-xl
font-bold
shadow-lg
transition
transform
hover:scale-[1.02]
disabled:opacity-50
"

>


{

loading

?

"Creating Account..."

:

"Create Account"

}


</button>







</form>








<p className="
text-center
text-gray-500
mt-5
text-sm
">


Already have an account?


<Link

to="/"

className="
ml-2
text-purple-600
font-bold
hover:underline
"

>

Login

</Link>


</p>






</div>



</div>


);


}


export {Register};