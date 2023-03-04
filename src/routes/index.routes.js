const router = require('express').Router();
const pacienteRoutes = require('./paciente.routes');
const extraRoutes = require('./extra.routes');

router.use(pacienteRoutes);
router.use(extraRoutes);

module.exports = router;