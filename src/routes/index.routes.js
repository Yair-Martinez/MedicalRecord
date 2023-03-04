const router = require('express').Router();
const pacienteRoutes = require('./paciente.routes');
const hospitalRoutes = require('./hospital.routes');
const extraRoutes = require('./extra.routes');

router.use('/paciente', pacienteRoutes);
router.use('/hospital', hospitalRoutes);
router.use(extraRoutes);

module.exports = router;