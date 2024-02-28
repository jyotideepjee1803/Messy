import React from 'react'
import './Apploader.style.css'
const AppLoader = () => {
    return (
        <>
            <img src='logo192.png' alt='loading' className='loading-icon' height={100} width={100} style={{position: "fixed",left: "50%",top: "50%",}}/>
        </>
    )
}

export default AppLoader