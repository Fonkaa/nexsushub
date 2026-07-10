import { createContext, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);


    const login = async (email, password) => {

        const response = await API.post("/auth/login", {
            email,
            password
        });


        localStorage.setItem(
            "token",
            response.data.token
        );


        if (response.data.user) {
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            setUser(response.data.user);
        }


        return response.data;

    };


    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

    };


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};