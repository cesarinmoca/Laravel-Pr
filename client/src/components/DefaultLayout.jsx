import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
    const { user, token, notification, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to='/login' />
    }

    function onLogout(e) {
        e.preventDefault();
        setUser(null);
        setToken(null);
        localStorage.removeItem("ACCESS_TOKEN");
    }

    useEffect(() => {
        async function fetchUser() {
            try {
                const { data } = await axiosClient.get('/user');
                setUser(data);
            } catch (err) {
                console.error('Error al obtener los datos del usuario', err);
                setUser(null);
            }
        }

        if (token) {
            fetchUser();
        }

    }, [token]);

    return (
        <>
            <div id="defaultLayout">
                <aside>
                    <Link to='/dashboard'>Dashboard</Link>
                    <Link to='/users'>Users</Link>
                </aside>
                <div className="content">
                    <header>
                        <div>
                            Header
                        </div>
                        <div>
                            {user.name}
                            <a href="#" onClick={onLogout} className="btn-logout">Logout</a>  
                        </div>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </div>
                {notification && 
                    <div className="notification">
                        {notification}
                    </div>
                }
                
            </div>
        </>
    )
}