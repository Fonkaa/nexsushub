import { useEffect, useState } from "react";
import API from "../api/axios";


function WorkRequests(){

const [requests,setRequests]=useState([]);


const [form,setForm]=useState({

    title:"",
    description:"",
    priority:"Medium"

});



useEffect(()=>{

    fetchRequests();

},[]);



const fetchRequests=async()=>{

    const res=await API.get("/requests");

    setRequests(res.data);

};



const handleChange=(e)=>{

    setForm({

        ...form,

        [e.target.name]:e.target.value

    });

};



const createRequest=async()=>{

    await API.post("/requests",form);

    setForm({

        title:"",
        description:"",
        requester_id:1,
        priority:"Medium",
        status:"Pending",
        assigned_to:null

    });

    fetchRequests();

};



const updateStatus=async(id,status)=>{


    await API.put(`/requests/${id}`,{

        status

    });


    fetchRequests();


};



const deleteRequest=async(id)=>{


    await API.delete(`/requests/${id}`);


    fetchRequests();


};



return (

<div className="p-6">


<h1 className="text-3xl font-bold mb-5">
Work Requests
</h1>



<div className="bg-white p-5 rounded shadow mb-6">


<input
name="title"
placeholder="Request title"
value={form.title}
onChange={handleChange}
/>


<br/>


<textarea
name="description"
placeholder="Description"
value={form.description}
onChange={handleChange}
/>


<br/>


<select
name="priority"
value={form.priority}
onChange={handleChange}
>

<option>High</option>
<option>Medium</option>
<option>Low</option>

</select>


<br/>


<button onClick={createRequest}>
Create Request
</button>


</div>



<table border="1" width="100%">


<thead>

<tr>

<th>Title</th>
<th>Description</th>
<th>Priority</th>
<th>Status</th>
<th>Actions</th>

</tr>

</thead>


<tbody>


{
requests.map((r)=>(

<tr key={r.id}>


<td>{r.title}</td>

<td>{r.description}</td>

<td>{r.priority}</td>


<td>{r.status}</td>


<td>


<button
onClick={()=>updateStatus(r.id,"Approved")}
>
Approve
</button>


<button
onClick={()=>updateStatus(r.id,"Rejected")}
>
Reject
</button>


<button
onClick={()=>deleteRequest(r.id)}
>
Delete
</button>


</td>


</tr>


))
}


</tbody>


</table>


</div>

);


}


export default WorkRequests;