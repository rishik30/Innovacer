const express = require('express')

module.exports = function(app) {
	const router = express.Router();
	const mainController = require('./controller')

  router.get("/", mainController.main)
	router.get('/patients', mainController.getAllPatients)
	router.post('/patients', mainController.readAndSavePatientsData)
	router.get('/patient/:id', mainController.getPatientDetailsById)
  router.get("/patient", mainController.getPatientDetails)
	router.delete("/patients", mainController.deleteAll)

	app.use('/', router);
}
