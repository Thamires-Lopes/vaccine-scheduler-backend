const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        birthday: Date,
        vaccineDay: Date,
        vaccineTime: Date,
        appointmentDone: { type: Boolean, default: false },
        observation: String,
    },
    { timestamps: true }
)

const AppointmentModel = mongoose.model("user", AppointmentSchema);

module.exports = AppointmentModel;