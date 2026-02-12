import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "/src/AuthContext/AuthContext.jsx";
import {History,PersonalInfo,Personalize,Security} from "./UserComponets.jsx"

import "./UserPage.css"



function UserPage() {
  const {logout} = useAuth();

  const [user, setUser] = useState(null);

  const logging_out = (e) => {
    e.preventDefault(); 
    logout();
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const user_email = decoded.email;

    const fetch_userInfo = async () => {
      try {
        const res = await fetch("http://localhost:3000/movies/user/getInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user_email }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user info");
        }

        const user_info = await res.json();
        setUser(user_info);
      } catch (err) {
        console.error(err);
      }
    };

    fetch_userInfo();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user_page_container">   
      <div>
        {/* <h1>Welcome {user.firstname} {user.lastname}</h1> */}
        <img src="" alt="Profile Picture" />
        <h2 className="element_containers">Personal Info</h2>
        <h2 className="element_containers">Security</h2>
        <h2 className="element_containers">Personalize</h2>
        <h2 className="element_containers">History</h2>



        {/* <h2>Your Email is {user.email}</h2> */}
        <h2></h2>
        <button onClick={logging_out} >Logout</button>
      </div>   
      <div>
        {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam, optio error vitae non porro unde praesentium fuga corrupti quas nemo ex quam voluptas possimus rem! Omnis, aspernatur! Blanditiis, soluta repudiandae?</p> */}
      </div>

    </div>
  );
}

export default UserPage;
