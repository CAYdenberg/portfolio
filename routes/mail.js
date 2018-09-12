
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // generated ethereal user
    pass: process.env.SMTP_PASSWORD // generated ethereal password
  }
});

module.exports = function(body) {
  transporter.sendMail({
    from: 'nodemailer@caseyy.org',
    to: process.env.CONTACT_DESTINATION_ADDRESS,
    subject: `Contact message from: ${body['name.full']}`,
    text: body.message,
    replyTo: body.email
  })
}
