import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios, { getAxiosConfig } from '../../utils/axios'

const Login = () => {
    const navigate = useNavigate();

    const [userCredentials, setUserCredentials] = useState({
        email: "",
        password : "",
    })
    const {email,password} = userCredentials;

    const handleInputChange = (prop) => (event) =>{
        setUserCredentials({
            ...userCredentials,
            [prop] : event.target.value,
        });
    };

    const handleLogin = async(event)=>{
        event.preventDefault();
        const config = getAxiosConfig({});

        try{
            const {data} = await axios.post("/api/user/login", {email,password}, config);
            localStorage.setItem("loggedInUser",JSON.stringify(data));
            navigate("/mess");
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <form>
                <label htmlFor='login_mail'/>
                <input
                    type="email"
                    value={email}
                    onChange={handleInputChange("email")}
                    required
                    autoFocus
                    name="email"
                    id="login_mail"
                    placeholder='Email'
                />

                <label htmlFor='login_password'/>
                <input
                    type="password"
                    value={password}
                    onChange={handleInputChange("password")}
                    required
                    name="password"
                    id="login_password"
                    placeholder='Password'
                />

                <button
                    type="submit"
                    name='submit_button'
                    id="login_button"
                    onClick={handleLogin}
                >
                    "Login"
                </button>
            </form>
        </div>
    )  
}

export default Login