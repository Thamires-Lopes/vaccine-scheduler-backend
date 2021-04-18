const { Router } = require("express");
const AppointmentController = require("../controllers/appointment.controller");

const router = Router();
router.post("/appointment", AppointmentController.store);
router.get("/appointment", AppointmentController.index);
router.put("/appointment/:id", AppointmentController.update);

module.exports = router;