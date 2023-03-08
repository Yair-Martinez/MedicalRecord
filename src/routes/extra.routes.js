const router = require('express').Router();
const extraController = require('../controllers/extra.controller');

router.get("/confirm/:token", extraController.checkToken, extraController.confirmAccount);
router.post("/forgot-password", extraController.forgotPassword);
router.post("/change-password/:token", extraController.checkToken, extraController.changePassword);

module.exports = router;