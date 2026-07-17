import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import API from "../api/axios";


function ResetPassword(){


const navigate = useNavigate();



const email =
localStorage.getItem("resetEmail");

const otp =
localStorage.getItem("resetOTP");



const [password,setPassword]=useState("");

const [confirmPassword,setConfirmPassword]=useState("");

const [message,setMessage]=useState("");

const [loading,setLoading]=useState(false);





const handleSubmit = async(e)=>{


e.preventDefault();



if(password !== confirmPassword){


setMessage(
"Passwords do not match"
);


return;

}




try{


setLoading(true);


const email =
localStorage.getItem("resetEmail");


const response = await API.post(

"/auth/reset-password",

{
email,
password
}

);





setMessage(
response.data.message
);



// clear stored data

localStorage.removeItem(
"resetEmail"
);


localStorage.removeItem(
"resetOTP"
);



setTimeout(()=>{

navigate("/login");

},2000);




}catch(error){


setMessage(

error.response?.data?.message ||
"Password reset failed"

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

Create New Password

</h1>



<p className="
text-gray-500
text-center
mt-3
">

Enter your new NexusHub password

</p>





<form

onSubmit={handleSubmit}

className="
mt-8
space-y-5
"

>



<input

type="password"

placeholder="New Password"

value={password}

onChange={
e=>setPassword(e.target.value)
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





<input

type="password"

placeholder="Confirm Password"

value={confirmPassword}

onChange={
e=>setConfirmPassword(e.target.value)
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
bg-purple-600
text-white
py-3
rounded-xl
font-bold
hover:bg-purple-700
transition
"

>

{

loading

?

"Updating..."

:

"Change Password"

}


</button>



</form>





{

message &&

<p className="
mt-5
text-center
font-semibold
text-green-600
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


export default ResetPassword;