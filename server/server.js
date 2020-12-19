const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const upload = require("express-fileupload")

const PORT = 5000

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(upload())

require("./db")

require("./router")(app)

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}!`)
})
