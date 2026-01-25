import "./LoginPage.css"

import { useLocation } from 'react-router-dom';


function VerificationPage(){
    const location = useLocation();

    const message = location.message;

    return(
        <div className="form_container">
            <h2>Noice...</h2>
            <p>{message}</p> 

            <button>Resent Verification Email!</button>
        </div>
    )
}

export default VerificationPage;