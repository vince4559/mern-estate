const sendEmail = require("../utils/sendEmail");


exports.sendMail = async(req, res) => {
   const {email, subject, message} = req.body;

    try {
        const send_to = email;
        const sent_from = process.env.EMAIL_USER; //"dynamickubbs@outlook.com";
        const reply_to = email;
        

        await sendEmail(sent_from, send_to, reply_to, subject, message);
        res.status(200).json({success: true, message: "Email Sent"});
    } catch (error) {
        console.log(error);
        res.status(404).json(error.message);
    }

};
