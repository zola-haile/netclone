import { authenticate_user,find_user } from "../db/queries.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"



const authenticating = async (req, res) => {
    // console.log("Aloha mother!")
    try {
        const { email, password } = req.body;
        // console.log(email, password);

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const result = await authenticate_user(email, password);

        // console.log("AUTH RESULT:", result);

        if (result === "Success") {
            // const user_info = await find_user(email);

            const token = jwt.sign(
                {email:email},
                process.env.JWT_SECRET,               
                { expiresIn: "2h" }                  
                );

            return res.status(200).json({ 
                message: true,
                token
            });
        } else if (result === "Failed to login") {
            return res.status(401).json({ message: "Invalid credentials" });
        } else if (result === "User Not Found"){
            return res.status(404).json({ message: "User not found" });
        }

        // return res.status(401).json({ message: "Invalid credentials" });

    } catch (error) {
        console.error("Auth error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const fetch_userInfo = async(req,res)=>{
    try{
        const email = req.body;
        // console.log(email);
        const user_info = await find_user(email.email);

        // console.log(user_info);

        if (user_info){
            return res.status(200).json(
                user_info
            );
        }else{
            return res.status(404).json({ message: "User not found" });
        }

        

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { authenticating, fetch_userInfo};