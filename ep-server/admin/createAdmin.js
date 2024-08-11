require("dotenv").config();
const admindb = require("../model/adminSchema");
require("../db/connection");
const bcrypt = require("bcrypt");

const createAdmin = async (args) => {
  const user = args[2];
  const hashedPwd = await bcrypt.hash(args[3], 10);

  try {
    newAdmin = new admindb({
      user: user,
      pwd: hashedPwd,
      role: 5150,
    });

    await newAdmin.save();
  } catch (err) {
    console.log(err);
  }
};

createAdmin(process.argv);
