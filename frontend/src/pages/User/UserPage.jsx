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
        return < PersonalInfo user_info={user} />
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

  if (!user) return (
    <div className="page_loading">
      <div className="loading_spinner" />
      <p>Loading your profile...</p>
    </div>
  );

  const avatarLetter = user.firstname?.[0]?.toUpperCase() || "?";

  return (
    <div className="user_page_container">

      {/* ── Sidebar ── */}
      <aside className="left_sub_container">

        {/* User card at top of nav */}
        <div className="nav_user_card">
          {user.profile_pictur_url ? (
            <img src={user.profile_pictur_url} alt="avatar" className="nav_avatar_img" />
          ) : (
            <div className="nav_avatar_placeholder">{avatarLetter}</div>
          )}
          <div className="nav_user_info">
            <span className="nav_user_name">{user.firstname} {user.lastname}</span>
            <span className="nav_user_email">{user.email}</span>
          </div>
        </div>

        <div className="nav_divider" />

        <div className={`element_containers ${activated === "personal_info" ? "active": ""}`}
          onClick={()=>setActivated("personal_info")}>
          <span className="nav_icon">👤</span>
          <span className="nav_label">Personal Info</span>
        </div>
        <div className={`element_containers ${activated === "secutiry" ? "active": ""}`}
          onClick={()=>setActivated("secutiry")}>
          <span className="nav_icon">🔒</span>
          <span className="nav_label">Security</span>
        </div>
        <div className={`element_containers ${activated === "costumize" ? "active": ""}`}
          onClick={()=>setActivated("costumize")}>
          <span className="nav_icon">🎨</span>
          <span className="nav_label">Personalize</span>
        </div>
        <div className={`element_containers ${activated === "history" ? "active": ""}`}
          onClick={()=>setActivated("history")}>
          <span className="nav_icon">🕓</span>
          <span className="nav_label">History</span>
        </div>

        <div className="nav_spacer" />

        <button className="logout_btn" onClick={logging_out}>
          <span className="nav_icon">🚪</span>
          <span className="nav_label">Log Out</span>
        </button>

      </aside>

      {/* ── Content ── */}
      <main className="right_sub_container">
        {renderContent()}
      </main>

    </div>
  );
}

export default UserPage;
