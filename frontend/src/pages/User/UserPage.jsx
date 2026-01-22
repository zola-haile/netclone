import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "/src/AuthContext/AuthContext.jsx";



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
    <div>
      <h1>Welcome {user.firstname} {user.lastname}</h1>
      <h2>Your Email is {user.email}</h2>
      <button onClick={logging_out} >Logout</button>
    </div>
  );
}

export default UserPage;
