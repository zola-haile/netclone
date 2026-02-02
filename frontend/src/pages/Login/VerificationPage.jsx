import "./LoginPage.css"
import { useState } from "react";
import { useLocation, useNavigate,Link } from 'react-router-dom';


function VerificationPage(){
    const [email,setEmail] = useState("") 
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

            }else{
                console.log(data.message);
            }
        }catch(err) {
            console.log(err);
        }

        

    } 
    const location = useLocation();

    const message = location.state;

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

            
        </div>
    )
}

export default VerificationPage;