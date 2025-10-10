import { useContext, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const { requestToServer, getUserByUserId } = useContext(AuthContext);
    const errorRef = useRef();
    const navigate = useNavigate();


    function handleLogin(e) {
        e.preventDefault()
        const form = new FormData(e.target);
        const userId = form.get("UserId");
        const password = form.get("Password");

        if (userId === "" || password === "") {
            errorRef.current.innerText = "Please fill all the field"
            return
        }

        const user = {
            UserId: userId,
            Password: password
        }
        callServer(user)


    }

    function callServer(user) {
        requestToServer(user)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok " + res.status);
                }
                console.log(res)
                return res.json()
            })
            .then(data => {
                if (data !== null) {
                    errorRef.current.innerText = "";
                    alert("Login Success")
                    console.log(data)
                    localStorage.setItem("token", data?.tkey);
                    localStorage.setItem("role", data?.role);
                    localStorage.setItem("userId", data?.userId);

                    redirectToDashboard()
                    getUserByUserId()
                }
            })
            .catch(err => {
                errorRef.current.innerText = err.message;
                console.error("Login error", err.message)
            })

    }

    function redirectToDashboard() {
        const role = localStorage.getItem("role");
        if (role === "Admin") {
            navigate('/adminDashboard')
        }
        else if (role === "Customer") {
            navigate("/customerDashboard")
        }
        else if (role === "Deliveryman") {
            navigate("/deliverymanDashboard")
        }
        else {
            navigate("/login")
        }

    }



    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <form
                onSubmit={handleLogin}
                method="post"
                className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-80 sm:w-96 text-white"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

                {/* UserId */}
                <div className="mb-4">
                    <label htmlFor="UserId" className="block mb-1 text-sm font-medium">
                        User ID
                    </label>
                    <input
                        type="text"
                        name="UserId"
                        id="UserId"
                        placeholder="eg: name1234"
                        className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label
                        htmlFor="Password"
                        className="block mb-1 text-sm font-medium"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="Password"
                        id="Password"
                        placeholder="eg: 1234"
                        className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                    />
                </div>
                <p className="text-black text-center mb-2" ref={errorRef}></p>
                {/* Button */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 
                                bg-gradient-to-r from-pink-500 to-purple-500 
                                rounded-lg font-semibold text-white shadow-md transform hover:scale-105 
                                hover:shadow-xl transition hover:cursor-pointer"
                >
                    Login
                </button>

                {/* Extra Links
        <p className="mt-4 text-sm text-center text-gray-200">
          Don’t have an account?{" "}
          <a href="#" className="text-pink-300 hover:underline">
            Sign up
          </a>
        </p> */}
            </form>
        </div>
    );
};

export default Login;
