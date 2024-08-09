require("dotenv").config();
const admindb = require("../model/adminSchema");
require("../db/connection");

const createAdmin = async (args) => {
  const user = args[2];
  const pwd = args[3];

  try {
    newAdmin = new admindb({
      user: user,
      pwd: pwd,
      role: 5150,
    });

    await newAdmin.save();
  } catch (err) {
    console.log(err);
  }
};

createAdmin(process.argv);
