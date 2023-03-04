const router = require('express').Router();
const hospitalController = require('../controllers/hospital.controller');


router.get("/get", hospitalController.getHospitales);
router.post("/registro", hospitalController.createHospital);
router.post("/login", hospitalController.loginHospital);
router.patch("/agregar/:id", hospitalController.checkToken, hospitalController.addDataHospital);

module.exports = router;