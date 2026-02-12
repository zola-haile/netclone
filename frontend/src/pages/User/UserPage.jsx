import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "/src/AuthContext/AuthContext.jsx";
import {History,PersonalInfo,Personalize,Security} from "./UserComponets.jsx"

import "./UserPage.css"






function UserPage() {
  
  const {logout} = useAuth();

  const [user, setUser] = useState(null);
  const [activated,setActivated] = useState("personal_info"); // can be: personal_info(PersonalInfo), history(History), costumize(Personalize),secutiry(Security)

  const renderContent = () => {
    switch (activated) {
      case "personal_info":
        return < PersonalInfo />
      case "history":
        return <History />;
      case "costumize":
        return <Personalize />;
      case "secutiry":
        return <Security />;
      default:
        return <PersonalInfo/>;
    }
  };



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
        <h2 className="element_containers" onClick={()=>setActivated("personal_info")}>
          Personal Info
        </h2>
        <h2 className="element_containers" onClick={()=>setActivated("secutiry")}>
          Security
        </h2>
        <h2 className="element_containers" onClick={()=>setActivated("costumize")}>
          Personalize
        </h2>
        <h2 className="element_containers" onClick={()=>setActivated("personal_info")}>
          History
        </h2>



        {/* <h2>Your Email is {user.email}</h2> */}
        <h2></h2>
        <button onClick={logging_out} >Logout</button>
      </div>  

      <div>
          {renderContent()}
      </div>

    </div>
  );
}

export default UserPage;
