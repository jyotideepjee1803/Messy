import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

const sendEmail = async(email, subject, payload, template)=>{
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth : {
                user : process.env.FROM_EMAIL,
                pass : process.env.EMAIL_PASSWORD,
            }
        })
        // console.log(transporter);
        // const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        // const compiledTemplate = Handlebars.compile(source);
        // const options = ()=>{
        //     return{
        //         from: 'jyotideepjee@gmail.com',
        //         to : email,
        //         subject : subject,
        //         text: `Your verification link is: ${payload.link}`,
        //         // html : compiledTemplate(payload),
        //     };
        // }
        // console.log(options);
        //email send : 
        // transporter.sendMail(options(), (error, info)=>{
        //     if(error){
        //         return error;
        //     }
        //     else{
        //         console.log(info)
        //         return res.status(200).json({
        //             success : true
        //         });
        //     }
        // })
        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: email,
            subject : subject,
            html : template,
        })

    }catch(error){
        return error;
    }
}

export default sendEmail;
