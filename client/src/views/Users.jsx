import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";


export default function Users() {
    const[users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();

    useEffect(() => {
        getUsers();
    }, [])

    function onDelete(user) {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return
        }

        axiosClient.delete(`/users/${user.id}`)
        try{
            setNotification("User was successfully deleted")
            getUsers();
        } catch (e) {

        }
    }
    
    async function getUsers() {
        setLoading(true);
        try {
            const response = await axiosClient.get("/users");
            const users = response.data.data;
            setUsers(users);
            console.log(response);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <>
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1>Users</h1>
                    <Link to="/users/new" className="btn-add">Add new</Link>
                </div>
                <div className="card animated fadeInDown">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Create Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {loading && 
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        Loading..
                                    </td>
                                </tr>
                            </tbody>
                        }
                        {!loading && 
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.created_at}</td>
                                        <td>
                                            <Link className="btn-edit" to={'/users/'+user.id}>Edit</Link>
                                            &nbsp;
                                            <button onClick={(e) => onDelete(user)} className="btn-delete">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        }
                    </table>
                </div>
            </div>
        </>
    )
}