import axios from "axios";


import axios from "axios";

const API = axios.create({
    baseURL: "https://nexushub.vercel.app/api"
});

export default API;



API.interceptors.request.use((config)=>{

    const token = localStorage.getItem("token");

    if(token){

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

});



export default API;