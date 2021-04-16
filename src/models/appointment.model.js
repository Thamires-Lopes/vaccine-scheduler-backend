const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        birthday: Date,
        vaccineDay: Date,
        vaccineTime: Date,
    },
    { timestamps: true }
)

const AppointmentModel = mongoose.model("user", AppointmentSchema);

module.exports = AppointmentModel;