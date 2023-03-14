const pool = require('../config/database');
const bcryptService = require('../services/bcryptService');
const jwt = require('jsonwebtoken');
const generatePDF = require('../services/pdfService');

const SECRET_JWT = process.env.SECRET_JWT;

// Lista todos los usuarios de tipo Médico.
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

// Función que crea as observaciones médicas hechas a los pacientes.
const createObservacion = async (req, res) => {
  try {
    const { especialidadMedica, estadoSalud, detalle, idHospital, idMedico, idPaciente } = req.body;

    const queryObservacion = await pool.query(`INSERT INTO observacion 
    (especialidad_medica, estado_salud, detalle, id_hospital, id_medico, id_paciente) 
    VALUES ($1, $2, $3, $4, $5, $6);`,
      [especialidadMedica, estadoSalud, detalle, idHospital, idMedico, idPaciente]);

    res.status(200).json({
      ok: true,
      message: "Observación médica ha sido creada",
      body: { especialidadMedica, estadoSalud, detalle }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Obtiene todas las observaciones hechas por el médico en cuestión.
const getObservaciones = async (req, res) => {
  try {
    const token = req.token;
    const dataToken = jwt.verify(token, SECRET_JWT);

    const queryObservacion = await pool.query(`SELECT id, especialidad_medica, estado_salud, detalle, o.id_medico, p.nombre AS nombre_paciente, h.nombre AS nombre_hospital, m.nombre AS nombre_medico FROM observacion o INNER JOIN paciente p ON o.id_paciente = p.identificacion INNER JOIN hospital h ON o.id_hospital = h.identificacion INNER JOIN medico m ON o.id_medico = m.identificacion WHERE o.id_medico = $1;`,
      [dataToken.identificacion]);

    await generatePDF(queryObservacion.rows, dataToken.identificacion);
    const rutaPDF = appRoot + `/pdfs/Observaciones-${dataToken.identificacion}.pdf`;

    res.status(200).sendFile(rutaPDF);

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

const checkerChangePassword = async (req, res, next) => {
  try {
    const token = req.token;
    const dataToken = jwt.verify(token, SECRET_JWT);

    const query = await pool.query("SELECT * FROM medico WHERE identificacion = $1",
      [dataToken.identificacion]);

    const user = query.rows[0];
    if (user.status === "NEW") {
      return res.status(400).json({
        ok: false,
        message: "Actualice su contraseña temporal para poder continuar"
      });
    }

    return next();

  } catch (error) {
    console.error(error);
    return res.status(403).json({ ok: false, error: error.message });
  }
}

module.exports = {
  getMedicos,
  loginMedico,
  createObservacion,
  getObservaciones,
  checkTokenMedico,
  checkerChangePassword
}