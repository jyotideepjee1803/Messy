import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

const sendEmail = async(email, subject, payload, template)=>{
    console.log( process.env.FROM_EMAIL)
    // try{
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
        const options = {
            from: 'jyotideepjee@gmail.com',
            to: email,
            subject : subject,
            html : template,
        };
        // 
        // console.log(options);
        //email send : 
        await new Promise((resolve, reject)=>{
            transporter.sendMail(options, (error, info)=>{
                if(error){
                    // console.log(error)
                    reject(error);
                }
                else{
                    // console.log(info)
                    resolve(info);
                }
            })
        })

        // return res.status(200).json({
        //     success : true,
        //     message : "Link sent"
        // });
        // await transporter.sendMail({
        //     from: 'jyotideepjee@gmail.com',
        //     to: email,
        //     subject : subject,
        //     html : template,
        // })

        // await new Promise((resolve, reject)=>{
        //     transporter.sendMail({
        //         from: 'jyotideepjee@gmail.com',
        //         to: email,
        //         subject : subject,
        //         html : template,
        //     },(err, info)=>{
        //         if(err){
        //             reject(err);
        //             return err;
        //         }
        //         else{

        //         }
        //     })
        // })

    // }catch(error){
    //     return error;
    // }
}

export default sendEmail;
