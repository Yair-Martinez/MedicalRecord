const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const getConfirmTemplate = require("../utils/confirmTemplate.js");
const getResetTemplate = require("../utils/resetTemplate.js");

const SECRET_JWT = process.env.SECRET_JWT;
const APP_USER = process.env.APP_USER;
const APP_PASS = process.env.APP_PASS;
const URL_BASE = process.env.URL_BASE;

// Envía correos precreados con un link unido a un token para poder validar procesos.
const sendEmail = async (email, rol, tipoEmail) => {
  try {
    const token = await jwt.sign({
      email,
      rol
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

    const linkConfirm = URL_BASE + "/confirm/" + token;
    const linkReset = URL_BASE + "/change-password/" + token;

    const info = await transporter.sendMail({
      from: `"🔐 Service Account 🔐" <${APP_USER}>`, // sender address
      to: email, // list of receivers
      subject: tipoEmail === "confirm" ? "Verificación de la cuenta" : "Reinicio de la contraseña", // Subject line
      html: tipoEmail === "confirm" ? getConfirmTemplate(linkConfirm) : getResetTemplate(linkReset) // html body
    });

    console.log("El mensaje ha sido enviado: %s", info.messageId);

  } catch (error) {
    console.error("Mailer Error:", error.message);
  }
}

module.exports = sendEmail;