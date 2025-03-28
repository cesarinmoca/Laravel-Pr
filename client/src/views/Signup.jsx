import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Signup() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);

    async function onSubmit(e) {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        };

        try {
            const { data } = await axiosClient.post('/signup', payload);

            setUser(data.user);
            setToken(data.token);

        } catch (err) {
            console.log(err.response);
            if (err.response && err.response.data.message) {
                setErrors(err.response.data.message);
            }
        }

    }

    return (
        <>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        <h1 className="title">
                            Signup for free
                        </h1>
                        <input ref={nameRef} type="text" placeholder="Full Name" />
                        <input ref={emailRef} type="email" placeholder="Email Address" />
                        <input ref={passwordRef} type="password" placeholder="Password" />
                        <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                        <button className="btn btn-block">Sign Up</button>
                        <p className="message">
                            Already Registered? <Link to='/login'>Sign in</Link>
                        </p>
                    </form>
                    {errors && <p className="alert error">{errors}</p>}
                </div>
            </div>
        </>
    );
}