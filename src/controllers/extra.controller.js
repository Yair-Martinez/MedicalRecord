const pool = require('../config/database');
const jwt = require('jsonwebtoken');

const SECRET_JWT = process.env.SECRET_JWT;

// Obtiene el token que se le envió al usuario por medio de su correo y procede a verificar la cuenta.
const getUrlToken = async (req, res) => {
  try {
    const token = req.params.token;

    const verify = jwt.verify(token, SECRET_JWT);
    if (!verify) {
      return res.status(400).json({ ok: false, message: "Token Inválido" });
    }

    const response = await pool.query("SELECT * FROM paciente WHERE email = $1;", [verify.email]);
    if (response.rows.length === 0) {
      return res.status(400).json({ ok: false, message: "El usuario no existe" });
    }

    // Se actualiza el status del usuario.
    const status = "VALIDO";
    const queryUpdate = await pool.query("UPDATE paciente SET status = $1 WHERE email = $2;", [status, verify.email]);


    res.status(200).json({ ok: true, message: "Su cuenta ha sido confirmada satisfactoriamente" });

  } catch (error) {
    console.error(error.message);
    res.status(400).json({ ok: false, error: error.message });
  }
}

module.exports = { getUrlToken };