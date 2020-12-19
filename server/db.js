const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://rishabhkumar:innovacerDb@1234@cluster0.wex8m.mongodb.net/innovacer-project?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, dbName: "innovacer-project"}, (err) => {
    if (err) return console.log('Connection not established')
    console.log('Connection with mongo db established')
})

module.exports = mongoose
