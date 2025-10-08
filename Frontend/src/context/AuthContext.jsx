import { useEffect } from "react";
import { createContext, useState } from "react";
import api from "../Interceptor/Api";
import { toast } from "react-toastify";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const navigate = useNavigate(); 

    function getUserByUserId() {

        const userId = localStorage.getItem('userId');
        let url;
        if (localStorage.getItem("role") === "Customer") {
            url = "customer/user";
        }
        else if (localStorage.getItem("role") === "Deliveryman") {
            url = "deliveryman/user";
        }
        else {
            return;
        }

        fetch(`https://localhost:44381/api/${url}/${userId}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setUser(data)
                // console.log(data)
            })
            .catch(err => {
                console.error(err.message);
            })
    }

    function requestToServer(user) {
        return fetch("https://localhost:44381/api/authentication/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })


    }
    

    const logout = () => {
        return api.post("authentication/logout");

    }
    useEffect(() => {
        getUserByUserId();
    }, []);
    return (
        <AuthContext.Provider value={{ user, requestToServer, getUserByUserId, logout }}>
            {children}
        </AuthContext.Provider>
    )

}


export default AuthContext 