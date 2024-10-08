const nonGoogleUserdb = require("../model/nonGoogleUserSchema");
const admindb = require("../model/adminSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userLogin = async (req, res, admin) => {
  if (!req.body.admin) {
    try {
      const { user, pwd } = req.body;

      if (!user || !pwd) {
        return res
          .status(400)
          .json({ message: "Username and password are required." });
      }

      const foundUser = await nonGoogleUserdb.findOne({ user: user });
      if (!foundUser) return res.sendStatus(401);

      const match = await bcrypt.compare(pwd, foundUser.pwd);
      if (match) {
        const accessToken = jwt.sign(
          { username: foundUser.user, role: foundUser.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: 600 }
        );

        const refreshToken = jwt.sign(
          { username: foundUser.user },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        await nonGoogleUserdb.findOneAndUpdate(
          { user: foundUser.user },
          { refreshToken: refreshToken }
        );

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ role: foundUser.role, user: foundUser.user, accessToken });
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const { user, pwd } = req.body;

      if (!user || !pwd) {
        return res
          .status(400)
          .json({ message: "Username and password are required." });
      }

      const foundUser = await admindb.findOne({ user: user });
      if (!foundUser) {
        return res.sendStatus(401);
      }

      const match = await bcrypt.compare(pwd, foundUser.pwd);
      if (match) {
        const accessToken = jwt.sign(
          { username: foundUser.user, role: foundUser.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: 600 }
        );

        const refreshToken = jwt.sign(
          { username: foundUser.user },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        await admindb.findOneAndUpdate(
          { user: foundUser.user },
          { refreshToken: refreshToken }
        );

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ role: foundUser.role, user: foundUser.user, accessToken });
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = userLogin;
