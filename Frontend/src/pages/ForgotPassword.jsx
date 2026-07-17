import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import API from "../api/axios";



function ForgotPassword(){


const navigate = useNavigate();


const [email,setEmail]=useState("");

const [message,setMessage]=useState("");

const [loading,setLoading]=useState(false);




const handleSubmit = async(e)=>{

e.preventDefault();



try{


setLoading(true);



const response = await API.post(

"/auth/forgot-password",

{
email
}

);



// save email for next page

localStorage.setItem(
"resetEmail",
email
);



setMessage(
response.data.message
);



// move to OTP page

setTimeout(()=>{

navigate("/verify-otp");

},1000);




}catch(error){


setMessage(

error.response?.data?.message ||
"Something went wrong"

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
from-blue-50
to-purple-100
p-6
">



<div className="
bg-white
rounded-3xl
shadow-2xl
p-10
w-full
max-w-md
">



<h1 className="
text-3xl
font-black
text-gray-800
text-center
">

Forgot Password

</h1>



<p className="
text-gray-500
text-center
mt-3
">

Enter your email to receive OTP

</p>





<form

onSubmit={handleSubmit}

className="
mt-8
space-y-5
"

>



<input


type="email"


placeholder="Enter your email"


value={email}


onChange={
(e)=>setEmail(e.target.value)
}


className="
w-full
px-5
py-3
border
rounded-xl
outline-none
focus:ring-2
focus:ring-blue-500
"


/>





<button

disabled={loading}

className="
w-full
bg-blue-600
text-white
py-3
rounded-xl
font-bold
hover:bg-blue-700
transition
"

>


{

loading

?

"Sending OTP..."

:

"Send OTP"

}


</button>



</form>







{
message &&

<p className="
mt-5
text-center
text-green-600
font-semibold
">

{message}

</p>

}





<div className="
text-center
mt-6
">


<Link

to="/login"

className="
text-blue-600
font-bold
"

>

Back to Login

</Link>



</div>





</div>


</div>


);


}



export default ForgotPassword;