const mongoose = require("mongoose");

const employee_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    reuired: true,
  }
});

mongoose.model("Employee", employee_Schema);
