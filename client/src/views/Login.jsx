import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    
    async function onSubmit(e) {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const { data } = await axiosClient.post('/login', payload);

            setUser(data.user);
            setToken(data.token);

        } catch (err) {
            console.log(err.response);

            if (err.response && err.response.data.errors) {
                setErrors(Object.values(err.response.data.errors)[0][0]);
            } else if (err.response && err.response.data.message) {
                setErrors(err.response.data.message);
            } else {
                setErrors("Something went wrong. Please try again.");
            }
        }
    }
    
    return (
        <>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        <h1 className="title">
                            Login into your account
                        </h1>
                        <input ref={emailRef} type="email" placeholder="Email" />
                        <input ref={passwordRef} type="password" placeholder="Password" />
                        <button className="btn btn-block">Login</button>
                        <p className="message">
                            Not Registered? <Link to='/signup'>Create an account</Link>
                        </p>
                    </form>
                    {errors && <p className="alert error">{errors}</p>}
                </div>
            </div>
        </>
    )
}