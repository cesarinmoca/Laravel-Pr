import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    useEffect(() => {
        async function fetchUser () {
            if (id) {
                setLoading(true);
                try {
                    const { data } = await axiosClient.get(`/users/${id}`);
                    setUser(data);
                } catch (error) {
                    console.error("Error al obtener usuario:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUser();
    }, [id]);

    async function onSubmit(e) {
        e.preventDefault();
        if (user.id) {
            try {
                await axiosClient.put(`/users/${user.id}`, user)
                setNotification("User was successfully updated")
                navigate('/users')
            } catch (err) {
                console.log(err.response);
                if (err.response && err.response.data.message) {
                    setErrors(err.response.data.message);
                }
            }
        } else {
            try {
                await axiosClient.post(`/users/`, user)
                setNotification("User was successfully created")
                navigate('/users')
            } catch (err) {
                console.log(err.response);
                if (err.response && err.response.data.message) {
                    setErrors(err.response.data.message);
                }
            }
        }
    }
    
    return (
        <>
            {user.id && 
                <h1>Update User: {user.name}</h1>
            }
            {!user.id &&
                <h1>New User</h1>
            }
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">Loading...</div>
                )}
                {errors && <p className="alert error">{errors}</p>}
                {!loading && 
                    <form onSubmit={onSubmit}>
                        <input 
                            value={user.name} 
                            onChange={(e) => setUser(prevUser => ({...prevUser, name: e.target.value}))}
                            placeholder="Name" 
                        />
                        <input 
                            type="email"
                            value={user.email} 
                            onChange={(e) => setUser(prevUser => ({ ...prevUser, email: e.target.value }))} 
                            placeholder="Email" 
                        />
                        <input 
                            type="password"
                            onChange={(e) => setUser(prevUser => ({ ...prevUser, password: e.target.value }))} 
                            placeholder="Password" 
                        />
                        <input 
                            type="password"
                            onChange={(e) => setUser(prevUser => ({ ...prevUser, password_confirmation: e.target.value }))} 
                            placeholder="Password Confirmation" 
                        />
                        <button className="btn">Save</button>
                    </form>
                }
            </div>
        </>
    );
}
