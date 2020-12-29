const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const timesheet_Schema = new mongoose.Schema({
  employee: {
    type: ObjectId,
    ref: "Employee",
  },
  day_status: {
    type: Object,
    required: true,
  },
});

mongoose.model("Timesheet", timesheet_Schema);
