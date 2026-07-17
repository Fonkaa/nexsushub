function Unauthorized(){

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-10 rounded-3xl shadow-xl text-center">

<h1 className="text-5xl font-bold text-red-600">

403

</h1>


<h2 className="text-2xl font-bold mt-4">

Access Denied

</h2>


<p className="text-gray-500 mt-3">

You do not have permission to view this page.

</p>


</div>

</div>

);

}


export default Unauthorized;