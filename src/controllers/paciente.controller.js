const pool = require('../config/database');
const bcryptService = require('../helpers/bcryptService');
const jwt = require('jsonwebtoken');
const sendEmail = require('../helpers/mailerService');

const SECRET_JWT = process.env.SECRET_JWT;

const getPacientes = async (req, res) => {
  try {
    /* const ver = await jwt.verify(req.token, SECRET_JWT);

    if (!ver) {
      return res.status(403).json({ message: "Sin Authorización" });
    } */

    const response = await pool.query("SELECT * FROM paciente;");

    res.status(200).json({ ok: true, data: response.rows });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Creador de nuevos pacientes.
const createPaciente = async (req, res) => {
  try {
    const { identificacion, email, password, telefono } = req.body;
    const rol = "paciente";
    const status = "INVALIDO";

    const consultaId = await pool.query("SELECT * FROM paciente WHERE identificacion = $1", [identificacion]);
    if (consultaId.rows.length !== 0) {
      return res.status(400).json({ ok: false, message: "El usuario ya se encuentra registrado" });
    }

    const consultaEmail = await pool.query("SELECT * FROM paciente WHERE email = $1", [email]);
    if (consultaEmail.rows.length !== 0) {
      return res.status(400).json({ ok: false, message: "El email ya se encuentra registrado" });
    }

    // Escriptar pass.
    const passHash = await bcryptService.encrypt(password);
    const response = await pool.query(`INSERT INTO paciente (identificacion, email, password, telefono, rol, status) VALUES ('${identificacion}', '${email}', '${passHash}', '${telefono}', '${rol}', '${status}');`);

    await sendEmail(email, rol);

    res.status(200).json({ ok: true, message: "El usuario ha sido creado", body: { identificacion, email, telefono } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Manejador de inicio de sesión de los pacientes.
const loginPaciente = async (req, res) => {
  try {
    const { identificacion, password } = req.body;

    const response = await pool.query("SELECT * FROM paciente WHERE identificacion = $1", [identificacion]);

    if (response.rows.length === 0) {
      return res.status(401).json({ ok: false, message: "Credenciales inválidas" });
    }

    const user = response.rows[0];

    const passChecker = await bcryptService.compareHash(password, user.password);

    if (!passChecker) {
      return res.status(401).json({ ok: false, message: "Credenciales inválidas" });
    }

    if (user.status === "INVALIDO") {
      return res.status(403).json({ ok: false, message: "Su cuenta aún no ha sido verificada. Por favor ingrese a su correo para poder continuar con el inicio de sesión" });
    }

    // Retornar un token.
    const token = await jwt.sign({
      data: {
        identificacion: user.identificacion,
        email: user.email
      }
    }, SECRET_JWT, { expiresIn: 60 * 60 });

    return res.status(200).json({ ok: true, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Función que agrega los datos adicionales del paciente una vez completado el registro.
const addDataPaciente = async (req, res) => {
  try {
    const identificacion = req.params.id;
    const { nombre, direccion, fechaNacimiento } = req.body;

    const queryId = await pool.query("SELECT * FROM paciente WHERE identificacion = $1", [identificacion]);
    if (queryId.rows.length === 0) {
      return res.status(401).json({ ok: false, message: "El usuario no existe" });
    }

    const verify = await jwt.verify(req.token, SECRET_JWT);
    if (!verify) {
      return res.status(403).json({ ok: false, message: "Sin Autorización" });
    }

    const response = await pool.query("UPDATE paciente SET nombre = $1, direccion = $2, fecha_nacimiento = $3 WHERE identificacion = $4;", [nombre, direccion, fechaNacimiento, identificacion]);

    res.status(200).json({ ok: true, message: "Se han actualizado los datos correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Middleware que comprueba si el usuario se encuentra logueado.
const checkToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    return next();
  }

  res.sendStatus(403);
}

module.exports = {
  getPacientes,
  createPaciente,
  loginPaciente,
  addDataPaciente,
  checkToken
}