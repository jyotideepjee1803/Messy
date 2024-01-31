import axios from "axios";

export const getAxiosConfig = (options)=>{
    if(!options) return;
    const {loggedInUser, formData, blob} = options;
    console.log(loggedInUser.token);
    const config = {headers:{
        "Content-Type" : formData ? "multipart/form-data" : "application/json",
    }};

    if(blob) config.responseType = "blob";
    if(loggedInUser) config.headers.Authorization = `Bearer ${loggedInUser.token}`;
    
    return config;
}

export default axios.create({
    baseURL : process.env.REACT_APP_SERVER_BASE_URL
})
