import axios from "axios";
import {AxiosConfig, AxiosOptions } from "./AppTypes";

export const getAxiosConfig = (options: AxiosOptions) => {
    if (!options) return;
    const { loggedInUser, formData, blob } = options;
    const config: AxiosConfig = {
      headers: {
        "Content-Type": formData ? "multipart/form-data" : "application/json",
      },
    };
    if (blob) config.responseType = "blob";
    if (loggedInUser)
      config.headers.Authorization = `Bearer ${loggedInUser.token}`;
  
    return config;
  };

export default axios.create({
    baseURL : process.env.REACT_APP_SERVER_BASE_URL
})
