const nodemailer = require("nodemailer");
const nodeMailerEmail = process.env.NODEMAILEREMAIL;
const nodeMailerPassword = process.env.NODEMAILERPASSWORD;

const sendEmail = async (parameters) =>{
    const {email,subject,url} = parameters;
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: nodeMailerEmail, // your email address
            pass: nodeMailerPassword // your email password
        }
    });

    let mailOptions = {
        from: nodeMailerEmail, // sender address
        to: email, // list of receivers
        subject: subject , // Subject line
        text: url, // plain text body
        html: '<h3>Click On this url to verify your account</h3>' // html body
    };

   await  transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect("/auth/login");

        }
    });  
     
}

module.exports = sendEmail;