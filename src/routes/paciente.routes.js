const router = require('express').Router();
const pacienteController = require('../controllers/paciente.controller');


router.get("/", pacienteController.getPacientes);
router.post("/registro", pacienteController.createPaciente);
router.post("/login", pacienteController.loginPaciente);
router.patch("/agregar/:id", pacienteController.checkTokenPaciente, pacienteController.addDataPaciente);

module.exports = router;