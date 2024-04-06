import React, { createContext, useEffect, useState } from 'react'

const AppContext = createContext();

const AppProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState();
    const [notification, setNotification] = useState([]);
    
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("loggedInUser"));
        setLoggedInUser(userInfo);
    },[])

    return (
        <AppContext.Provider value={{loggedInUser, setLoggedInUser, notification, setNotification}}>
            {children}
        </AppContext.Provider>
    )

}

export default AppProvider
export {AppContext};