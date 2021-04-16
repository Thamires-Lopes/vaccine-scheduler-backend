const express = require("express");

const AppointmentRouter = require("./appointment.router")

const Router = express.Router();

Router.use(AppointmentRouter);

module.exports = Router;