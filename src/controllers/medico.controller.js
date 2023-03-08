const pool = require('../config/database');
const bcryptService = require('../helpers/bcryptService');
const jwt = require('jsonwebtoken');
const sendEmail = require('../helpers/mailerService');

const SECRET_JWT = process.env.SECRET_JWT;

const getMedicos = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM medico;");

    res.status(200).json({ ok: true, data: response.rows });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Manejador de inicio de sesión de los médicos.
const loginMedico = async (req, res) => {
  try {
    const { identificacion, password } = req.body;

    const response = await pool.query("SELECT * FROM medico WHERE identificacion = $1", [identificacion]);

    if (response.rows.length === 0) {
      return res.status(401).json({ ok: false, message: "Credenciales inválidas" });
    }

    const user = response.rows[0];

    const passChecker = await bcryptService.compareHash(password, user.password);

    if (!passChecker) {
      return res.status(401).json({ ok: false, message: "Credenciales inválidas" });
    }

    if (user.status === "NEW") {
      return res.status(403).json({ ok: false, message: "Su cuenta aún no ha sido verificada. Por favor ingrese a su correo para poder continuar con el inicio de sesión" });
    }

    // Retornar un token.
    const token = await jwt.sign({
      identificacion: user.identificacion,
      email: user.email,
      rol: user.rol
    }, SECRET_JWT, { expiresIn: 60 * 60 });

    return res.status(200).json({ ok: true, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Función que agrega los datos adicionales del médico una vez completado el registro.
const addDataMedico = async (req, res) => {
  try {
    const identificacion = req.params.id;
    const { nombre, direccion, fechaNacimiento } = req.body;

    const queryId = await pool.query("SELECT * FROM medico WHERE identificacion = $1", [identificacion]);
    if (queryId.rows.length === 0) {
      return res.status(401).json({ ok: false, message: "El usuario no existe" });
    }

    const response = await pool.query("UPDATE medico SET nombre = $1, direccion = $2, fecha_nacimiento = $3 WHERE identificacion = $4;", [nombre, direccion, fechaNacimiento, identificacion]);

    res.status(200).json({ ok: true, message: "Se han actualizado los datos correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Middleware que comprueba si el usuario se encuentra logueado.
const checkTokenMedico = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;

    try {
      const verify = await jwt.verify(req.token, SECRET_JWT);
      return verify.rol === "medico" ? next() : res.sendStatus(403);

    } catch (error) {
      console.error(error);
      return res.status(403).json({ ok: false, message: "Sin autorización", error: error.message });
    }
  }

  res.sendStatus(403);
}

module.exports = {
  getMedicos,
  loginMedico,
  addDataMedico,
  checkTokenMedico
}