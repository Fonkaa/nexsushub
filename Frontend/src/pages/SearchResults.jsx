import {useEffect,useState} from "react";
import {useSearchParams} from "react-router-dom";
import API from "../api/axios";


function SearchResults(){


const [params]=useSearchParams();


const [results,setResults]=useState([]);



useEffect(()=>{


fetchResults();


},[]);



const fetchResults=async()=>{


try{


const res=await API.get(
`/search?q=${params.get("q")}`
);


setResults(res.data);



}catch(error){

console.log(error);

}


};




return(

<div className="p-6 bg-gray-100 min-h-screen">


<h1 className="text-3xl font-bold mb-6">

Search Results

</h1>



<div className="grid md:grid-cols-3 gap-6">


{
results.length===0 ?

<div className="bg-white p-8 rounded-xl">

No results found

</div>


:

results.map(item=>(


<div

key={`${item.type}-${item.id}`}

className="
bg-white
rounded-2xl
shadow
p-5
"

>


<h2 className="font-bold text-xl">

{item.title}

</h2>


<p className="text-blue-600 mt-2">

{item.type}

</p>


</div>


))


}


</div>


</div>


);


}


export default SearchResults;