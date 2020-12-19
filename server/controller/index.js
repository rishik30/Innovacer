const csvToJson = require("csvtojson")
const excelToJson = require("convert-excel-to-json")
const {PatientModel} = require("../models/patient")

exports.main = function(req, res) {
    res.send("Default Response!!")
}

exports.getAllPatients = async function(req, res) {
    let patients = null
    try {
        patients = await PatientModel.find({})
        res.send(patients)
    } catch(err) {
        console.log({err})
    }
}

exports.getPatientDetails = async function(req, res) {
    try {
        const {q} = req.query
        const regex = new RegExp(q, "i")
        const patient = await PatientModel.find({name: {$regex: regex}})
        res.send(patient)
    } catch(err) {
        console.log({err})
        res.status(500).send({err})
    }
}

exports.readAndSavePatientsData = async function(req, res) {
    try {
      const type = req.files.csvfile.mimetype
      if (type.includes("csv")) {
        const csvData = req.files.csvfile.data.toString("utf8")
        const json = await csvToJson().fromString(csvData)
        const parsedJson = JSON.parse(JSON.stringify(json))
        const savedData = await PatientModel.collection.insert(parsedJson)
        res.send({data: savedData.ops, success: true})
      } else {
        const result = excelToJson({
          source: req.files.csvfile.data,
          header: {
            rows: 1
          },
          columnToKey: {
            '*': '{{columnHeader}}'
          }
        })
        const data = result["Sheet 1"]
        const savedData = await PatientModel.collection.insert(data)
        res.send({data: savedData.ops, success: true})
        res.send({result: result["Sheet 1"]})
      }
    } catch(err) {
        console.log({err})
        res.status(500).send({err, success: false})
    }
}

exports.getPatientDetailsById = async function(req, res) {
    try {
        const {id} = req.params
        const data = await PatientModel.findOne({"_id": id})
        res.send({data})
    } catch(err) {
        console.log({err})
        res.status(500).send({err})
    }
}

exports.deleteAll = async (req, res) => {
  try {
    const res = await PatientModel.deleteMany({})
    res.send({res})
  } catch(err) {
    res.status(500).send({err})
  }
}
