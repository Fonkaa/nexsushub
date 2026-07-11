import { useSearchParams } from "react-router-dom";


function Search(){

const [params]=useSearchParams();


const query=params.get("q");


return(

<div className="p-6">


<h1 className="text-3xl font-bold">

Search Results

</h1>


<p className="mt-4 text-gray-600">

Showing results for:

<span className="font-bold ml-2">

{query}

</span>

</p>


</div>

);


}


export default Search;