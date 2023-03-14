const pool = require('../config/database');
const jwt = require('jsonwebtoken');
const sendEmail = require('../services/mailerService');
const bcryptService = require('../services/bcryptService');

const SECRET_JWT = process.env.SECRET_JWT;

// Confirma la cuenta registrada para poder iniciar sesión.
const confirmAccount = async (req, res) => {
  try {
    const tokenData = req.tokenData;

    const response = await pool.query(`SELECT * FROM ${tokenData.rol} WHERE email = $1;`, [tokenData.email]);
    if (response.rows.length === 0) {
      return res.status(400).json({ ok: false, message: "El usuario no existe" });
    }

    // Se actualiza el status del usuario.
    const status = "VALIDO";
    const queryUpdate = await pool.query(`UPDATE ${tokenData.rol} SET status = $1 WHERE email = $2;`, [status, tokenData.email]);


    res.status(200).json({ ok: true, message: "Su cuenta ha sido activada satisfactoriamente" });

  } catch (error) {
    console.error(error.message);
    res.status(400).json({ ok: false, error: error.message });
  }
}

// Obtiene el email del usuario que desee cambiar su contraseña y le envía un correo para iniciar el proceso.
const forgotPassword = async (req, res) => {
  try {
    const { email, rol } = req.body;

    // Valida la existencia del email.
    const query = await pool.query(`SELECT * FROM ${rol} WHERE email = $1;`, [email]);
    if (query.rows.length === 0) {
      return res.status(400).json({ ok: false, message: "El usuario no existe" });
    }

    sendEmail(email, rol, "reset");

    res.status(200).json({ ok: true, message: `Se ha enviado un correo de confirmación` });

  } catch (error) {
    console.error(error);
    res.status(400).json({ ok: false, error: error.message });
  }
}

// Actualiza la nueva contraseña del usuario.
const changePassword = async (req, res) => {
  try {
    const password = req.body.password;
    const { email, rol } = req.tokenData;

    const passHash = await bcryptService.encrypt(password);

    if (rol === "medico") {
      const status = "VALIDO";
      const queryUpdate = await pool.query(`UPDATE ${rol} SET password = $1, status = $2 WHERE email = $3;`, [passHash, status, email]);
      res.status(200).json({ ok: true, message: "Su contraseña ha sido actualizada" });
    } else {
      const queryUpdate = await pool.query(`UPDATE ${rol} SET password = $1 WHERE email = $2;`, [passHash, email]);
      res.status(200).json({ ok: true, message: "Su contraseña ha sido actualizada" });
    }

  } catch (error) {
    console.error(error);
    res.status(400).json({ ok: false, error: error.message });
  }
}

// Middleware que comprueba si el Token es válido.
const checkToken = async (req, res, next) => {
  try {
    const token = req.params.token;
    const verify = jwt.verify(token, SECRET_JWT);
    
    req.tokenData = { email: verify.email, rol: verify.rol };

    return next();

  } catch (error) {
    console.error(error.message);
    res.status(400).json({ ok: false, error: error.message });
  }
}

module.exports = {
  confirmAccount,
  forgotPassword,
  changePassword,
  checkToken
};