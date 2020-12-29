const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const employer_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    reuired: true,
  },
  timesheet_emp: {
    type: ObjectId,
    ref: "Timesheet",
  },
});

mongoose.model("Employer", employer_schema);
