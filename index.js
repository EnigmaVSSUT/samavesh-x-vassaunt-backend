require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRoute')


app.use(cors())
app.use(express.json())

app.use(userRouter)

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        app.listen(8000, ()=>{
            console.log("connected to db")
        })
    })
    .catch((err)=>{console.log(err)})
