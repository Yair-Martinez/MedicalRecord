const pool = require('../config/database');
const bcryptService = require('../helpers/bcryptService');
const jwt = require('jsonwebtoken');
const sendEmail = require('../helpers/mailerService');

const SECRET_JWT = process.env.SECRET_JWT;

// Lista todos los usuarios de tipo Hospital.
const getHospitales = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM hospital;");

    res.status(200).json({ ok: true, data: response.rows });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Creador de nuevos hospitales.
const createHospital = async (req, res) => {
  try {
    const { identificacion, email, password, telefono } = req.body;
    const rol = "hospital";
    const status = "INVALIDO";

    const consultaId = await pool.query("SELECT * FROM hospital WHERE identificacion = $1", [identificacion]);
    if (consultaId.rows.length !== 0) {
      return res.status(400).json({ ok: false, message: "El usuario ya se encuentra registrado" });
    }

    const consultaEmail = await pool.query("SELECT * FROM hospital WHERE email = $1", [email]);
    if (consultaEmail.rows.length !== 0) {
      return res.status(400).json({ ok: false, message: "El email ya se encuentra registrado" });
    }

    // Escriptar pass.
    const passHash = await bcryptService.encrypt(password);
    const response = await pool.query(`INSERT INTO hospital (identificacion, email, password, telefono, rol, status) VALUES ('${identificacion}', '${email}', '${passHash}', '${telefono}', '${rol}', '${status}');`);

    await sendEmail(email, rol, "confirm");

    res.status(200).json({ ok: true, message: "El usuario ha sido creado", body: { identificacion, email, telefono } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Manejador de inicio de sesión de los hospitales.
const loginHospital = async (req, res) => {
  try {
    const { identificacion, password } = req.body;

    const response = await pool.query("SELECT * FROM hospital WHERE identificacion = $1", [identificacion]);

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

// Función que agrega los datos adicionales del hospital una vez completado el registro.
const addDataHospital = async (req, res) => {
  try {
    const identificacion = req.params.id;
    const { nombre, direccion, servicioMedico } = req.body;

    const queryId = await pool.query("SELECT * FROM hospital WHERE identificacion = $1", [identificacion]);
    if (queryId.rows.length === 0) {
      return res.status(401).json({ ok: false, message: "El usuario no existe" });
    }

    const response = await pool.query("UPDATE hospital SET nombre = $1, direccion = $2, servicio_medico = $3 WHERE identificacion = $4;", [nombre, direccion, servicioMedico, identificacion]);

    res.status(200).json({ ok: true, message: "Se han actualizado los datos correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Registra un nuevo Médico al Hospital.
const createMedico = async (req, res) => {
  try {
    const { identificacion, email, password, telefono } = req.body;
    const rol = "medico";
    const status = "NEW";

    const consultaId = await pool.query("SELECT * FROM medico WHERE identificacion = $1", [identificacion]);
    if (consultaId.rows.length !== 0) {
      return res.status(400).json({ ok: false, message: "El usuario ya se encuentra registrado" });
    }

    const consultaEmail = await pool.query("SELECT * FROM medico WHERE email = $1", [email]);
    if (consultaEmail.rows.length !== 0) {
      return res.status(400).json({ ok: false, message: "El email ya se encuentra registrado" });
    }

    // Escriptar pass.
    const passHash = await bcryptService.encrypt(password);
    const response = await pool.query(`INSERT INTO medico (identificacion, email, password, telefono, rol, status) VALUES ('${identificacion}', '${email}', '${passHash}', '${telefono}', '${rol}', '${status}');`);

    res.status(200).json({ ok: true, message: "El usuario ha sido creado", body: { identificacion, email, telefono } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Middleware que comprueba si el usuario se encuentra logueado.
const checkTokenHospital = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;

    try {
      const verify = await jwt.verify(req.token, SECRET_JWT);
      return verify.rol === "hospital" ? next() : res.sendStatus(403);

    } catch (error) {
      console.error(error);
      return res.status(403).json({ ok: false, message: "Sin autorización", error: error.message });
    }
  }

  res.sendStatus(403);
}

module.exports = {
  getHospitales,
  createHospital,
  loginHospital,
  addDataHospital,
  createMedico,
  checkTokenHospital
}