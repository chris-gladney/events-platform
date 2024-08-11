const nonGoogleUserdb = require("../model/nonGoogleUserSchema");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    console.log(cookies);

    if (!cookies?.jwt) {
      return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;

    const foundUser = await nonGoogleUserdb.findOne({
      refreshToken: refreshToken,
    });
    if (!foundUser) return res.sendStatus(403); // Forbidden

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: 600 }
        );

        res.json({ accessToken });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleRefreshToken;
