const mongoose = require("mongoose")

const Patient = mongoose.model("Patient", {
    name: String,
    age: Number,
    gender: String,
    contact: Number,
    email: String
}, "patient")

exports.PatientModel = Patient
