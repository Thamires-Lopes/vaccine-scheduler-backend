const { appointmentSchema, validateForm } = require("../utils/joi.schemas");
const AppointmentModel = require('../models/appointment.model');

const appointmentValidateForm = validateForm(appointmentSchema);

class AppointmentController {

    async index(req, res) {
        const appointments = await AppointmentModel.find();
        res.send({ appointments })
    }

    async store(req, res) {
        try {
            appointmentValidateForm(req.body);

            //todo before storing need to check if that the date and time is available

            const newAppointment = await AppointmentModel.create(req.body);

            res.send({ appointment: newAppointment })

        } catch (error) {
            res.status(400).send({ message: "Invalidate fields", error: error.message })
        }
    }
}

module.exports = new AppointmentController();