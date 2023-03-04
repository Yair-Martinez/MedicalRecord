const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const getTemplate = require("../utils/emailTemplate.js");

const SECRET_JWT = process.env.SECRET_JWT;
const APP_USER = process.env.APP_USER;
const APP_PASS = process.env.APP_PASS;
const URL_BASE = process.env.URL_BASE;

const sendEmail = async (email) => {
  try {
    const token = await jwt.sign({
      email
    }, SECRET_JWT, { expiresIn: 60 * 30 });


    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: APP_USER, // generated ethereal user
        pass: APP_PASS, // generated ethereal password
      },
    });

    const link = URL_BASE + "/confirm/" + token;

    const info = await transporter.sendMail({
      from: `"Verificador 🔐" <${APP_USER}>`, // sender address
      to: email, // list of receivers
      subject: "Verificación de la cuenta", // Subject line
      html: getTemplate(link), // html body
    });

    console.log("El mensaje ha sido enviado: %s", info.messageId);

  } catch (error) {
    console.error("Mailer Error:", error.message);
  }
}

module.exports = sendEmail;