const router = require('express').Router();
const extraController = require('../controllers/extra.controller');

router.get("/confirm/:token", extraController.getUrlToken);

module.exports = router;