import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "/src/AuthContext/AuthContext.jsx";
import {History,PersonalInfo,Personalize,Security} from "./UserComponets.jsx"

import "./UserPage.css"






function UserPage() {
  
  const {logout} = useAuth();

  const [user, setUser] = useState(null);
  const [activated,setActivated] = useState("personal_info"); // can be: personal_info(PersonalInfo), history(History), costumize(Personalize),secutiry(Security)
  // const [selected_nav,setSelected_nav] = useState()
  const renderContent = () => {
    switch (activated) {
      case "personal_info":
        return < PersonalInfo />
      case "history":
        return <History user_info={user}/>;
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
      <div className="left_sub_container">
        {/* <h1>Welcome {user.firstname} {user.lastname}</h1> */}
        <div>
          <img src="" alt="Profile Picture" />
        </div>
        
        <div className={`element_containers ${activated === "personal_info" ? "active": ""}`} 
          onClick={()=>setActivated("personal_info")}>
          Personal Info
        </div>
        <div className={`element_containers ${activated === "secutiry" ? "active": ""}`} 
          onClick={()=>setActivated("secutiry")}>
          Security
        </div>
        <div className={`element_containers ${activated === "costumize" ? "active": ""}`} 
          onClick={()=>setActivated("costumize")}>
          Personalize
        </div>
        <div className={`element_containers ${activated === "history" ? "active": ""}`} 
          onClick={()=>setActivated("history")}>
          History
        </div>



        {/* <div>Your Email is {user.email}</div> */}
        {/* <h2></h2> */}
        <div>
          <button onClick={logging_out} >Logout</button>
        </div>
        
      </div>  

      <div className={"right_sub_container"}>
          {renderContent()}
      </div>

    </div>
  );
}

export default UserPage;
