const express = require("express")
const mongoose = require("mongoose")
const app     = express()
const {MonoDB_URI} = require("./keys")
require('./models/employer')
require('./models/employee')
require('./models/timesheet')


app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))


const PORT = 5000

mongoose.connect(MonoDB_URI,{useNewUrlParser:true,  useUnifiedTopology: true })

mongoose.connection.on("connected",()=>{
    console.log("Connected to mongo")

})
mongoose.connection.on("error",()=>{
    console.log("Error while connecting to mongo")

})

app.get("/",(req,res)=>{
    console.log("App get method executed")
    res.send("hello there")

})

app.get("/",(req,res)=>{
    console.log("App get method executed")
    res.send("hello there")

})

app.listen(PORT,()=>{
    console.log("Server is running on ->"+PORT)
})