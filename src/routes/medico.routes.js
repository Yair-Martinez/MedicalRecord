const router = require('express').Router();
const medicoController = require('../controllers/medico.controller');


router.get("/", medicoController.getMedicos);
router.post("/login", medicoController.loginMedico);

router.post("/observacion", medicoController.checkTokenMedico, medicoController.createObservacion);
router.get("/observaciones", medicoController.checkTokenMedico, medicoController.getObservaciones);

module.exports = router;