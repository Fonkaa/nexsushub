import { useEffect, useState } from "react";
import API from "../api/axios";

function TeamMembers() {

    const [members, setMembers] = useState([]);

    const [formData, setFormData] = useState({
        user_id: 1,
        full_name: "",
        phone: "",
        department: "",
        position: "",
        status: "active"
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {

        try {

            const response = await API.get("/team");

            console.log("Team Members:", response.data);

            setMembers(response.data);

        } catch (error) {

            console.log("Error fetching members:", error);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const addMember = async () => {

        try {

            await API.post("/team", formData);

            alert("Team member added successfully!");

            fetchMembers();

            setFormData({
                user_id: 1,
                full_name: "",
                phone: "",
                department: "",
                position: "",
                status: "active"
            });

        } catch (error) {

            console.log("Error adding member:", error);

        }

    };

    return (

        <div style={{ padding: "20px" }}>

            <h1>Team Members</h1>

            <div
                style={{
                    marginBottom: "25px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px"
                }}
            >

                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="position"
                    placeholder="Position"
                    value={formData.position}
                    onChange={handleChange}
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <button onClick={addMember}>
                    Add Team Member
                </button>

            </div>

            <table
                border="1"
                cellPadding="10"
                cellSpacing="0"
                width="100%"
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {

                        members.length > 0 ?

                        members.map((member) => (

                            <tr key={member.id}>

                                <td>{member.id}</td>
                                <td>{member.full_name}</td>
                                <td>{member.phone}</td>
                                <td>{member.department}</td>
                                <td>{member.position}</td>
                                <td>{member.status}</td>

                                <td>

                                    <button>Edit</button>

                                    {" "}

                                    <button>Delete</button>

                                </td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td
                                colSpan="7"
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                No Team Members Available
                            </td>

                        </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}

export default TeamMembers;