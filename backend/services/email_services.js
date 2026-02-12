import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});



 export const send_verification_email = async (email, verification_token)=>{
    // console.log(email,verification_token);
    const verify_url = `http://localhost:3000/movies/user/verify-email?token=${verification_token}`;

    await transporter.sendMail({
        to: email,
        subject: "Verify your email",
        html: `
        <p>Click the link to verify your email:</p>
        <a href="${verify_url}">Verify Email</a>
        `,
    });
} 

// export const ver_sender = async()=>{
//   const ver = await transporter.verify();
//   console.log("Email server ready", ver);
// }




// 
