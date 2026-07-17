import {useState} from "react";
import API from "../api/axios";
import {useNavigate} from "react-router-dom";


function VerifyOTP(){


const [otp,setOtp]=useState("");

const email =
localStorage.getItem("resetEmail");


const navigate=useNavigate();



const verify=async()=>{


try{

await API.post(
"/auth/verify-otp",
{
email,
otp
}
);


localStorage.setItem(
"resetOTP",
otp
);


navigate("/reset-password");



navigate("/reset-password");


}catch(error){

alert(
error.response?.data?.message
||
"OTP failed"
);


}


};



return(

<div className="min-h-screen flex items-center justify-center">


<div className="bg-white shadow-xl rounded-3xl p-10">


<h1 className="text-3xl font-bold">
Verify OTP
</h1>



<input

className="border p-3 mt-6 rounded-xl"

placeholder="Enter OTP"

value={otp}

onChange={
e=>setOtp(e.target.value)
}

/>


<button

onClick={verify}

className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-5"

>

Verify

</button>


</div>


</div>


)

}


export default VerifyOTP;