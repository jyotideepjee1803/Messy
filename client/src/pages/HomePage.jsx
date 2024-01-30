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
        else navigate("/login");
    },[]);  

    return (
        <div>HomePage</div>
    )
}

export default HomePage