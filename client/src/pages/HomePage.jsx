/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const user = JSON.parse(
            localStorage.getItem("loggedInUser")
        )
        if(user && Date.now() < user.expiryTime) navigate("/mess");
    },[]);  

    return (
        <>
        <button onClick={()=>{
            navigate("/login")
        }}>
            Login
        </button>
        <div>HomePage</div>
        </>
    )
}

export default HomePage