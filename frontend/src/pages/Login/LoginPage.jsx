import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

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
    const [invalid_user,setInvalid_user] = useState(false);
    

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
                if (res.status === 401){//Invalid credentials
                    setInvalid_user(true);
                }else if (res.status === 404){// User not found
                    setInvalid_user(false);
                    navigate("/signup")
                }else if (res.status === 403){// User not verified
                    setInvalid_user(false);
                    navigate("/verify",{state:{message:"You have not verified your email yet"}});
                }
                //throw new Error(data.message || "Invalid login");
            }else{
                login(data.token);
                navigate("/",{ replace: true });
            }

            // console.log(data.message)

            // if (data.message){
            //     // console.log(data.user_info);
                
            // }

            
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
        <div className="form_container">
            <h2 >Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="fields_container" >
                    <label htmlFor="name" className="field_label">
                        Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="field_input"
                    />
                </div>

                <div className="fields_container">
                    <label htmlFor="email" className="field_label">
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="field_input"
                    />
                </div>

                <div className="fields_container">
                    <label htmlFor="password" className="field_label">
                        Password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="field_input"
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

                <div 
                    style={{visibility: invalid_user? 'visible' : 'hidden'}} 
                    className="show_credentials"
                    >

                        <p>Wrong Password! Try Again!</p>
                </div>



            </form>
            <p>No Account? <Link to="/signup"> Signup Now</Link></p>
        </div>
    );
}

export default LoginPage;