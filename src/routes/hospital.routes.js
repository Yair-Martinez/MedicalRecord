const router = require('express').Router();
const hospitalController = require('../controllers/hospital.controller');


router.get("/", hospitalController.getHospitales);
router.post("/registro", hospitalController.createHospital);
router.post("/login", hospitalController.loginHospital);
router.patch("/agregar/:id", hospitalController.checkTokenHospital, hospitalController.addDataHospital);

router.post("/registro-medico", hospitalController.checkTokenHospital, hospitalController.createMedico);
router.get("/observaciones", hospitalController.checkTokenHospital, hospitalController.getObservaciones);

module.exports = router;