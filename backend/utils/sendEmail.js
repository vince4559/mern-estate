const nodemailer = require("nodemailer");


const sendEmail = async (sent_from, send_to,  subject, message ) => {

    // service to send mail
    const transporter = nodemailer.createTransport({
        // host: "smtp-mail.outlook.com",
        host: 'smtp.gmail.com',
        service: "Gmail",
        port:  "587",
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS,  
        },

        // adding security measures
        tls: {
            rejectUnauthorized: false,
        },
    });

    const options = {
        from: sent_from,
        to: send_to,
        subject: subject,
        html: `<div >
                    <h2>${subject}</h2> 
                    <p>${message}</p>
                </div>`
    };

    // send mail
    transporter.sendMail(options, function (err, info) {
        if(err){
            console.log(err)
        }else {
            console.log(info)
        }
    });

};

module.exports = sendEmail;