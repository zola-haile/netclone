import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "/src/AuthContext/AuthContext.jsx";


import "./LoginPage.css"


function LoginPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {login,logout} = useAuth();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/movies/user/login", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                credentials: "include", 
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Invalid login");
            }

            // console.log(data.message)

            if (data.message){
                // console.log(data.user_info);
                login(data.token);

                navigate("/",{ replace: true });
            }

            
            // Handle successful login (e.g., redirect, store token)
            // If you get a token back, you could store it:
            // sessionStorage.setItem("token", data.token);
        
            
        } catch (err) {
            setError(err.message || "Invalid email or password");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="loginContainer">
            <h2 >Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="loginfieldsContainer" >
                    <label htmlFor="name" className="loginLabelContainer">
                        Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="loginInputs"
                    />
                </div>

                <div className="loginfieldsContainer">
                    <label htmlFor="email" className="loginLabelContainer">
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="loginInputs"
                    />
                </div>

                <div className="loginfieldsContainer">
                    <label htmlFor="password" className="loginLabelContainer">
                        Password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="loginInputs"
                    />
                </div>

                {error && (
                    <div style={{ color: "red", marginBottom: "15px" }}>
                        {error}
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        backgroundColor: loading ? "#ccc" : "#007bff",
                        color: "white",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    {loading ? "Logging in..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;