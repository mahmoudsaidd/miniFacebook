import nodemailer from 'nodemailer'
export async function sendEmail(dest, subject, message , attachments=[]) {
    
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.senderEmail, 
            pass: process.env.senderPassword, 
        },
    });

    
    let info = await transporter.sendMail({
        from: `"Route" < ${process.env.senderEmail}>`, 
        to: dest, 
        subject, 
        html: message, 
        attachments
    });
    return info
}
