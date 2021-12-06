const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  secure: true,
});

exports.sendMail = ({ to, subject, text, html }) => {
  const mailData = {
    from: `"Jovan BIENVENU" <bienvenujovan@gmail.com>`,
    to: to,
    subject,
    text,
    html,
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
};
