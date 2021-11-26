// require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8000
const authentication = require('./middleware/auth')
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())
// route
app.get('/', (req, res) => {
    res.json({message : "Wellcome to system inventory SH3 api"})
})

app.use('/user',authentication, require('./routes/User'))
app.use('/login', require('./routes/Auth'))
app.use('/category', authentication, require('./routes/Category'))
app.use('/item', authentication, require('./routes/Item'))
app.use('/activity', authentication, require('./routes/Activity'))

console.log('please wait.. \ntry to cennect to online database')
//connect to cloud database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser : true, useUnifiedTopology: true })
    .then(() => {        
        console.log(`Online database connected`)
        app.listen(PORT, () => {
            console.log(`server running on port : ${PORT}`)

        })
    })
    .catch((error) => {
        if (error) console.log(`error : ${error}`)
    })


