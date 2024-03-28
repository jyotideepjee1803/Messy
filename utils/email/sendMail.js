import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

const sendEmail = async(email, subject, payload, template)=>{
    const options = {
        from: 'jyotideepjee@gmail.com',
        to: email,
        subject : subject,
        html : template,
    };
    try{
        await nodemailer.createTransport({
            service: "gmail",
            auth : {
                user : process.env.FROM_EMAIL,
                pass : process.env.EMAIL_PASSWORD,
            }
        }).sendMail(options)
    }catch(error){
        return error;
    }
}

export default sendEmail;
