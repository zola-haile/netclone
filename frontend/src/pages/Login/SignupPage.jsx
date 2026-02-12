import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "./LoginPage.css"


function SignupPage(){
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [re_password, setRe_password] = useState("");
    const [valid_password,setValid_password] = useState(true);
    const navigate = useNavigate();

    const handle_signup = async(e)=>{
        e.preventDefault();
        // console.log("Aloha")

        try{
            const res = await fetch("http://localhost:3000/movies/user/signup",{
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                credentials: "include", 
                body: JSON.stringify({ email, password, firstname, lastname })
            })

            const data = await res.json();

            
            if (!res.ok){
                if(res.status === 409){
                    navigate('/login');
                    return;
                }else{
                    throw new Error(data);
                }
            }

            navigate('/verify',{state:{message:"You have successfully created an account. You need to verify your email through the link sent to your email!!"}});

            // console.log(data.message);


        }catch (err) {
            console.error("Error: ", err);
        }
    }

    return(
        <div className="form_container">
           <form onSubmit={handle_signup}>

                <div className="fields_container" >
                    <label htmlFor="signup_firstname" className="field_label">
                        First Name: 
                    </label>

                    <input
                        id="signup_firstname"
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="field_input"
                    />
                </div>


                <div className="fields_container" >
                    <label htmlFor="signup_lastname" className="field_label">
                        Last Name: 
                    </label>

                    <input
                        id="signup_lastname"
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className="field_input"
                    />
                </div>


                <div className="fields_container" >
                    <label htmlFor="signup_email" className="field_label">
                        Email: 
                    </label>

                    <input
                        id="signup_email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="field_input"
                    />
                </div>


                <div className="fields_container" >
                    <label htmlFor="signup_password" className="field_label">
                        Password: 
                    </label>

                    <input
                        id="signup_password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            const value = e.target.value
                            setPassword(value);
                            if (value === re_password &&  (re_password.length > 0 && value.length > 0)){
                                    setValid_password(false)
                                    console.log(value)
                                }else{
                                    setValid_password(true)
                                };


                            }}
                        className="field_input"
                    />
                </div>


                <div className="fields_container" >
                    <label htmlFor="signup_repassword" className="field_label">
                        Re-enter Password: 
                    </label>

                    <input
                        id="signup_repassword"
                        type="password"
                        value={re_password}
                        onChange={
                            (e) => {
                                const value = e.target.value;
                                setRe_password(value);
                                if (value === password && (password.length > 0 && value.length > 0)){
                                    // console.log(value)
                                    setValid_password(false)
                                }else{
                                    setValid_password(true)
                                };

                            }}
                        className="field_input"
                    />
                </div>


                <button 
                    type="submit" 
                    disabled={valid_password}
                    style={{ 
                        backgroundColor: valid_password ? "#ccc" : "#007bff",
                        color: "white",
                        border: "none",
                        cursor: valid_password ? "not-allowed" : "pointer"
                    }}
                >
                    {valid_password ? "Passwords don't much..." : "Submit"}
                </button>




           </form>
           <p>Already signedup? <Link to="/login"> Login Now</Link></p>
        </div>
    )
}

export default SignupPage;