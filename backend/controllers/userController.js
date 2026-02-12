import { authenticate_user,find_user,add_user,verify_email_query,re_verifying} from "../db/queries.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import crypto from "crypto";

import {send_verification_email} from "../services/email_services.js";


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
        }else if (result === "Not Verified"){
            return res.status(403).json({message: "User not verified"});
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

const signup = async (req,res)=>{
    try{
        const user_info = req.body;
        const verification_token = crypto.randomBytes(32).toString("hex");

        const added = await add_user(user_info.firstname, user_info.lastname, user_info.email,user_info.password,verification_token);

        if (added===1){
            return res.status(409).json({
                message: `user with ${user_info} already exists`
            })
        }else if (added === 2){
            await send_verification_email(user_info.email, verification_token);
            return res.status(200).json({
                message: "Successfully Added"
            });
        }


        
    }catch(error){
        console.error("Error: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}


const verify_email = async (req,res)=>{
    try{
        const ver_token = req.query.token;

        const verified = await verify_email_query(ver_token);

        if (verified === 2){
            return res.redirect("http://localhost:5173/login");
        }else if (verified === 1){
            return res.status(400).send("Invalid or expired token");
        }

        // console.log(ver_token);

    }catch(error){
        console.error("Error: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

const resend_verification = async (req,res) =>{
    try{
        const user = req.body;
        const user_found = await find_user(user.email);

        // console.log(user_found);

        if (user_found) {
            
            const user_token = await re_verifying(user.email);
            // console.log(user_token.is_validated);
            if(!user_token.is_validated){
                await send_verification_email(user.email, user_token.email_verify_token);
                
                return res.status(200).json({
                    message: "Resent verification!"
                });
            }else{
                return res.status(200).json({
                    message: "Already Verified"
                });
            }
        }else{
            //return user not found
            // console.log("Nananana")
            return res.status(404).json({
                message: "No user with that email"
            })
        }

        return res.status(200).json({
                message: "Works"
            });

    }catch(error){
        console.error("Error: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



export { authenticating, fetch_userInfo, signup, verify_email,resend_verification};