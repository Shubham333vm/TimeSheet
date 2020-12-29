const app = require("express")
const router = app.Router()
const mongoose = require("mongoose")
const emp_timeSheet = mongoose.model("Timesheet")

router.post("/fillSheet",(req,res)=>{

    const timesheet = new emp_timeSheet({
        employee: req.body.employee,
        day_status:{"date":new Date() , "status":"holiday"},
    })

    timesheet.save().then((savedPost)=>{
        res.status(200).json({savedPost})
    }).catch((err)=>{
        res.status(401).json("Something went wrong")
    })

})

module.exports= router