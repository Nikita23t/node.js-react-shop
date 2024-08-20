require('dotenv').config()
const express = require('express')
const sequelize = require('./db_connect')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const routers = require('./routers/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')


const PORT = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json)
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', routers)

//last middleware, because that function working with errors
app.use(errorHandler)


app.get('/', (req, res) => {
    req.status(200).json({message: "Working succesfully"})
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}

start()