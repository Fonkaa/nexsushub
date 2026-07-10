import { useEffect, useState } from "react";
import API from "../api/axios";


function WorkRequests() {

    const [requests, setRequests] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "Medium"
    });


    useEffect(() => {
        fetchRequests();
    }, []);



    const fetchRequests = async () => {

        try {

            const res = await API.get("/requests");

            setRequests(res.data);

        } catch (error) {

            console.log("Error fetching requests:", error);

        }

    };



    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };



   const createRequest = async () => {

    try {

        const res = await API.post("/requests", {

            title: form.title,
            description: form.description,
            priority: form.priority

        });


        console.log(res.data);


        setForm({

            title: "",
            description: "",
            priority: "Medium"

        });


        fetchRequests();


    } catch(error) {

        console.log("Create request error:", error.response?.data || error.message);

    }

};



    const updateStatus = async (id, status) => {

        try {

            await API.put(`/requests/${id}`, {

                status

            });


            fetchRequests();


        } catch (error) {

            console.log("Update error:", error);

        }

    };



    const deleteRequest = async (id) => {

        try {

            await API.delete(`/requests/${id}`);

            fetchRequests();


        } catch (error) {

            console.log("Delete error:", error);

        }

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

                    className="border p-2 w-full mb-3"

                />



                <textarea

                    name="description"

                    placeholder="Description"

                    value={form.description}

                    onChange={handleChange}

                    className="border p-2 w-full mb-3"

                />



                <select

                    name="priority"

                    value={form.priority}

                    onChange={handleChange}

                    className="border p-2 mb-3"

                >

                    <option value="High">
                        High
                    </option>


                    <option value="Medium">
                        Medium
                    </option>


                    <option value="Low">
                        Low
                    </option>


                </select>



                <br />


                <button

                    onClick={createRequest}

                    className="bg-blue-500 text-white px-4 py-2 rounded"

                >

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

                        requests.map((r) => (

                            <tr key={r.id}>


                                <td>{r.title}</td>


                                <td>{r.description}</td>


                                <td>{r.priority}</td>


                                <td>{r.status}</td>


<td>

    <button
        onClick={() => updateStatus(r.id,"Approved")}
        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
    >
        Approve
    </button>


    <button
        onClick={() => updateStatus(r.id,"Rejected")}
        className="bg-red-500 text-white px-3 py-1 rounded mr-2"
    >
        Reject
    </button>


    <button
        onClick={() => deleteRequest(r.id)}
        className="bg-gray-500 text-white px-3 py-1 rounded"
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