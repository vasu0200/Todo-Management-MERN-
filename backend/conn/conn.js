const mongoose = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongoose
    .connect("add your mongoose url")
    .then(()=>{
    console.log("DB Connected")
    })
  } catch (error) {
    console.log(error);
  }
};
conn();