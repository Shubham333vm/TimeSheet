const app = require("express")
const router = app.Router()
const mongoose = require("mongoose")
const emp_timeSheet = mongoose.model("Timesheet")

router.post("/fillSheet",(req,res)=>{

    console.log(req.body)

    const timesheet = new emp_timeSheet({
        employee: JSON.parse(req.body.employee),
        day_status:req.body.day_status,
    })

    timesheet.save().then((savedPost)=>{
        console.log("Saved")
        res.status(200).json({savedPost})

    }).catch((err)=>{
        res.status(401).json("Something went wrong")
    })

})

router.get("/workLogs", (req, res) => {
    // Team.getPagination()
    emp_timeSheet.find({}, function (err, docs) {
      if (!err) {
        res.send(docs);
        //process.exit();
      } else {
        throw err;
      }
    });
  });

module.exports= router