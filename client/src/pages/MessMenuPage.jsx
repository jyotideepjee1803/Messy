import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const MessMenuPage = () => {
    const [menu,setMenu] = useState([]);
    const [meals,setMeals] = useState([]);
    const navigate = useNavigate();

    const logout = () =>{
        localStorage.removeItem("loggedInUser");
        navigate("/");
    }

    return (
        <div>
            Mess Menu
            <button
                onClick={logout}
            >
                logout
            </button>
        </div>
    )
}

export default MessMenuPage