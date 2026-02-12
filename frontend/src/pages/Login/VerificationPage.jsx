import "./LoginPage.css"
import { useState } from "react";
import { useLocation, useNavigate,Link } from 'react-router-dom';


function VerificationPage(){
    const [email,setEmail] = useState("") 
    const [sent_ver,setSent_ver] = useState(false);
    const [ver_message,setVer_message] = useState("");


    const navigate = useNavigate()

    const resend_verification = async(e) => {
        e.preventDefault();

        try{
            // console.log("Olala")
            const res = await fetch("http://localhost:3000/movies/user/resend_verification",{
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                credentials: "include", 
                body: JSON.stringify({email})
            })
            // console.log("Olala")
            const data = await res.json();
            if (!res.ok){
                // console.log(res.status);
                if (res.status === 404){
                    setVer_message("Your email is not in the database. Create an account!")
                    navigate("/signup");
                }
            }else{
                if (data.message === "Resent verification!"){
                    setSent_ver(true);
                    setVer_message("Just sent an email. Check your email sil vous plait")
                }else if (data.message === "Already Verified"){
                    navigate("/login");
                }
                
            }
        }catch(err) {
            console.log(err);
        }

        

    } 
    const location = useLocation();

    const message = location.state;

    if (!message) return;

    return(
        <div className="form_container">
            <h2>Noice...</h2>
            <p>{message.message}</p>

            <form onSubmit={resend_verification}>
                
                
                <input 
                    type="email" 
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br/>

                <button
                    type="submit">
                    Resent Verification Email
                </button>

            </form> 

            <p 
            style={{visibility: sent_ver? 'visible' : 'hidden'}} 
            >
                {ver_message}
                <br />
                <Link to="/login"> Go to Login </Link>
            </p>


            
        </div>
    )
}

export default VerificationPage;