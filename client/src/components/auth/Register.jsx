import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios, { getAxiosConfig } from '../../utils/axios'

const Register = () => {
    const navigate = useNavigate();

    const [userCredentials, setUserCredentials] = useState({
        name : "",
        email: "",
        password : "",
        confirmPassword: "",
        isAdmin : false,
    })
    const {name,email,password,confirmPassword,isAdmin} = userCredentials;

    const handleInputChange = (prop) => (event) =>{
        setUserCredentials({
            ...userCredentials,
            [prop] : event.target.value,
        });
    };

    const handleLogin = async(event)=>{
        event.preventDefault();

        // Validate email
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            alert("Please Enter a Valid Email ID");
            return;
        }
    
        if (password !== confirmPassword) {
            alert("Passwords Do Not Match");
            return;
        }

        const config = getAxiosConfig({});

        try{
            const {data} = await axios.post("/api/user/register", {name,email,password,isAdmin}, config);
            localStorage.setItem("loggedInUser",JSON.stringify(data));
            navigate("/mess");
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div>
            <form>
                <label htmlFor='register_name'/>
                <input
                    type="text"
                    value={name}
                    onChange={handleInputChange("name")}
                    required
                    name="username"
                    id="register_name"
                    placeholder='Name'
                />

                <label htmlFor='register_mail'/>
                <input
                    type="email"
                    value={email}
                    onChange={handleInputChange("email")}
                    required
                    autoFocus
                    name="email"
                    id="register_mail"
                    placeholder='Email'
                />

                <label htmlFor='register_password'/>
                <input
                    type="password"
                    value={password}
                    onChange={handleInputChange("password")}
                    required
                    name="password"
                    id="register_password"
                    placeholder='Password'
                />

                <label htmlFor='register_confirmPassword'/>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleInputChange("confirmPassword")}
                    required
                    name="confirmpassword"
                    id="register_confirmPassword"
                    placeholder='Confirm Password'
                />

                <button
                    type="submit"
                    name='submit_button'
                    id="register_button"
                    onClick={handleLogin}
                >
                    "Register"
                </button>
            </form>
        </div>
    )  
}

export default Register