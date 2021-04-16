const { Router } = require("express");
const AppointmentController = require("../controllers/appointment.controller");

const router = Router();
router.post("/appointment", AppointmentController.store);

module.exports = router;