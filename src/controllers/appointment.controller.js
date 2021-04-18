const { appointmentSchema, validateForm } = require("../utils/joi.schemas");
const AppointmentModel = require('../models/appointment.model');

const appointmentValidateForm = validateForm(appointmentSchema);

const calculateAge = require('../utils/checks')

class AppointmentController {

    async index(req, res) {
        const appointments = await AppointmentModel.find();
        res.send({ appointments })
    }

    async store(req, res) {
        try {
            appointmentValidateForm(req.body);

            const { vaccineDay, vaccineTime, birthday } = req.body;
            //todo before storing need to check if that the date and time is available
            //need refactoring
            const appointments = await AppointmentModel.find({ vaccineDay })

            console.log(appointments.length)
            if (appointments.length < 6) {
                const time = new Date(vaccineTime).getHours()
                const sameTime = appointments.filter((info) => (new Date(info.vaccineTime).getHours()) === time)

                if (sameTime.length < 2) {
                    const newAppointment = await AppointmentModel.create(req.body);

                    res.send({ appointment: newAppointment })
                } else {
                    if (calculateAge(birthday) >= 65) {
                        const young = sameTime.filter((info) => calculateAge(info.birthday) < 65)
                        if (young.length > 0) {
                            if (young.length > 1) {
                                young.sort((a, b) => {
                                    if (calculateAge(a.birthday) > calculateAge(b.birthday)) {
                                        return 1
                                    }
                                    if (a.name < b.name) {
                                        return -1;
                                    }
                                    return 0;
                                })
                            }
                            const { id } = young[0]
                            const deleted = await AppointmentModel.findByIdAndDelete(id);
                            if (deleted) {
                                const newAppointment = await AppointmentModel.create(req.body);
                                res.send({ appointment: newAppointment })
                            }

                        } else {
                            console.log("Horário cheio")
                            throw new Error("Horário cheio")
                        }
                        console.log("idoso")
                    } else {
                        console.log("Horário cheio")
                        throw new Error("Horário cheio")
                    }
                }

            } else {
                throw new Error("Dia cheio")
            }


        } catch (error) {
            res.status(400).send({ message: "Invalidate fields", error: error.message })
        }
    }

    async update(req, res) {
        console.log(req.body, req.params);
        const {
            params: { id },
            body,
        } = req;

        try {

            const appointment = await AppointmentModel.findOneAndUpdate({ _id: id }, body).lean();

            res.send({
                appointment: {
                    ...appointment,
                    ...body,
                },
            });

        } catch (error) {
            res.status(400).send({ message: "Cannot update" })
        }
    }
}

module.exports = new AppointmentController();