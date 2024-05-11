import { createTransport } from 'nodemailer';

async function sendMail(req, res, next) {
    let transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDERMAIL,
            pass: process.env.MAILPASSWORD
        }
    });

    const { mailTo, mailSubject, mailBody } = req.body;
    try {
        if(mailTo === undefined || mailSubject === undefined || mailBody === undefined){
            return res.status(404).send(
                {
                    status: 404,
                    message: "Missing parameter to send a mail"
                }
            )
        }else{
            let mailOptions = {
                from: process.env.SENDERMAIL,
                to: mailTo,
                subject: mailSubject,
                text: mailBody,
                // html: '<b>Hello from Node.js!</b>' // HTML body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send({
                        status: 500,
                        message: "Something went wrong while sending email",
                        error: error
                    })
                }
                return res.status(200).send({
                    status: 200,
                    message: "Email sent successfully!",
                    error: null
                })
            });
        }
    } catch (error) {
        return res.status(501).send(
            {
                status: 501,
                message: 'Internal Server Error',
                error: error
            }
        )
    }
}

export {
    sendMail
}