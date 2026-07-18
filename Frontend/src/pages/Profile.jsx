import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
    FaCamera,
    FaSave,
    FaLock,
    FaUpload
} from "react-icons/fa";


function Profile(){
const navigate = useNavigate();
const [profile,setProfile]=useState(null);

const [image,setImage]=useState(null);
const [preview,setPreview]=useState("");
const [imageVersion,setImageVersion]=useState(Date.now());

const [loading,setLoading]=useState(false);

const [editForm,setEditForm]=useState({

    name:"",
    username:"",
    email:""

});



const [passwordForm,setPasswordForm]=useState({

    oldPassword:"",
    newPassword:""

});





useEffect(()=>{

    fetchProfile();

},[]);



const fetchProfile = async()=>{

try{

const res = await API.get("/profile");


setProfile(res.data);


setEditForm({

    name:res.data.name,
    username:res.data.username,
    email:res.data.email

});



if(res.data.profile_image){

setPreview(
`${res.data.profile_image}?v=${Date.now()}`
);

}


}catch(error){

console.log(
"PROFILE FETCH ERROR:",
error
);

}

};








const handleChange=(e)=>{


setEditForm({

...editForm,

[e.target.name]:e.target.value

});


};







const handleImage=(e)=>{


const file=e.target.files[0];


if(file){


setImage(file);


const localPreview =
URL.createObjectURL(file);


setPreview(localPreview);


}


};







// UPDATE NAME EMAIL USERNAME ONLY

const updateProfile=async(e)=>{


e.preventDefault();


try{


setLoading(true);


const res = await API.put(
"/profile",
editForm
);


window.dispatchEvent(
new Event("profileUpdated")
);


await fetchProfile();


alert(
"Profile information updated"
);



}catch(error){

console.log(error);

alert(
"Profile update failed"
);


}finally{

setLoading(false);

}


};









// UPLOAD IMAGE ONLY




const uploadImage = async()=>{


if(!image){

alert("Please select an image first");
return;

}



try{


const formData = new FormData();


formData.append(
"profile_image",
image
);



const res = await API.put(

"/profile/image",

formData,

{
headers:{
"Content-Type":"multipart/form-data"
}
}

);



console.log(
"UPLOAD RESPONSE:",
res.data
);



const newImage =
res.data.image;



// update database image state

setProfile(prev=>({

...prev,

profile_image:newImage

}));




// FORCE IMAGE RELOAD

setImageVersion(Date.now());



setPreview(
`${newImage}?v=${Date.now()}`
);




// update local storage

const oldUser =
JSON.parse(
localStorage.getItem("user")
);


localStorage.setItem(

"user",

JSON.stringify({

...oldUser,

profile_image:newImage

})

);


// Notify Navbar immediately
window.dispatchEvent(
    new Event("profileUpdated")
);


setImage(null);



alert(
"Profile picture updated successfully"
);



}catch(error){


console.log(
"IMAGE UPLOAD ERROR:",
error.response?.data || error
);


alert(
"Image upload failed"
);


}

};
const changePassword=async(e)=>{


e.preventDefault();


try{


await API.put(

"/profile/password",

passwordForm

);



alert(
"Password changed successfully"
);



// Update first login status

const oldUser = JSON.parse(
    localStorage.getItem("user")
);



const updatedUser = {

    ...oldUser,

    first_login:false

};



localStorage.setItem(

    "user",

    JSON.stringify(updatedUser)

);



setPasswordForm({

oldPassword:"",

newPassword:""

});



// Go to dashboard

navigate("/dashboard");



}catch(error){


alert(

error.response?.data?.message ||

"Password change failed"

);


}



};

if(!profile){

return(

<div className="flex justify-center items-center h-screen">

<h2 className="text-xl font-bold">
Loading profile...
</h2>

</div>

);

}


return(


<div className="p-6 bg-gray-100 min-h-screen">



<h1 className="text-4xl font-bold mb-8 text-gray-800">

My Profile

</h1>





<div className="grid lg:grid-cols-3 gap-8">





{/* PROFILE CARD */}

<div className="bg-white rounded-3xl shadow-xl p-8 text-center">



<div className="relative w-32 h-32 mx-auto">


{

preview ?


<img

src={preview}

className="
w-32
h-32
rounded-full
object-cover
border-4
border-blue-500
"

/>


:


<div

className="
w-32
h-32
rounded-full
bg-gradient-to-r
from-blue-600
to-purple-600
text-white
flex
items-center
justify-center
text-5xl
font-bold
"

>

{profile.name.charAt(0)}

</div>


}





<label

className="
absolute
bottom-0
right-0
bg-blue-600
hover:bg-blue-700
text-white
p-3
rounded-full
cursor-pointer
"

>

<FaCamera/>


<input

type="file"

accept="image/*"

hidden

onChange={handleImage}

/>


</label>


</div>





<button

onClick={uploadImage}

className="
mt-5
flex
items-center
gap-2
mx-auto
bg-green-600
hover:bg-green-700
text-white
px-5
py-3
rounded-xl
font-semibold
"

>

<FaUpload/>

Upload Picture

</button>






<h2 className="text-2xl font-bold mt-6">

{profile.name}

</h2>



<p className="text-gray-500">

@{profile.username}

</p>




<span className="
inline-block
mt-4
px-5
py-2
rounded-full
bg-blue-100
text-blue-700
font-semibold
">

{profile.role}

</span>



<p className="text-gray-400 mt-4">

{profile.email}

</p>



</div>









{/* INFORMATION */}

<div className="bg-white rounded-3xl shadow-xl p-8 lg:col-span-2">



<h2 className="text-2xl font-bold mb-6">

Edit Information

</h2>




<form

onSubmit={updateProfile}

className="space-y-5"

>



<input

name="name"

value={editForm.name}

onChange={handleChange}

className="w-full border rounded-xl p-4"

/>





<input

name="username"

value={editForm.username}

onChange={handleChange}

className="w-full border rounded-xl p-4"

/>





<input

name="email"

value={editForm.email}

onChange={handleChange}

className="w-full border rounded-xl p-4"

/>






<button

disabled={loading}

className="
flex
items-center
gap-3
bg-blue-600
hover:bg-blue-700
text-white
px-6
py-3
rounded-xl
font-semibold
"

>


<FaSave/>

{

loading

?

"Saving..."

:

"Save Changes"

}


</button>



</form>


</div>









{/* PASSWORD */}

<div className="bg-white rounded-3xl shadow-xl p-8 lg:col-span-3">



<h2 className="text-2xl font-bold mb-6 flex gap-3 items-center">

<FaLock/>

Change Password

</h2>





<form

onSubmit={changePassword}

className="grid md:grid-cols-3 gap-5"

>



<input

type="password"

placeholder="Current Password"

value={passwordForm.oldPassword}

onChange={(e)=>

setPasswordForm({

...passwordForm,

oldPassword:e.target.value

})

}

className="border rounded-xl p-4"

/>





<input

type="password"

placeholder="New Password"

value={passwordForm.newPassword}

onChange={(e)=>

setPasswordForm({

...passwordForm,

newPassword:e.target.value

})

}

className="border rounded-xl p-4"

/>





<button

className="
bg-purple-600
hover:bg-purple-700
text-white
rounded-xl
font-semibold
"

>

Update Password

</button>



</form>



</div>





</div>

</div>


);


}


export default Profile;