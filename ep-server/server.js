require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = 5000;
const FEPORT = 5173;

require("./db/connection");

const session = require("express-session");
const passport = require("passport");

const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const userdb = require("./model/userSchema");
const nonGoogleUserdb = require("./model/nonGoogleUserSchema");
const admindb = require("./model/adminSchema");
const eventsdb = require("./model/eventsSchema");

const verifyJWT = require("./middleware/verifyJWT");
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const handleRefreshToken = require("./controllers/refreshToken");
const getEvents = require("./controllers/getEvents");
const handleLogout = require("./controllers/logout");
const handlePostEvents = require("./controllers/handlePostEvents");
const createCheckoutSession = require("./controllers/createCheckoutSession");

app.use(
  cors({
    origin: `http://localhost:${FEPORT}`,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/admin/register", async (req, res) => {
  adminRegister(req, res);
});

app.post("/register", async (req, res) => {
  userRegister(req, res);
});

// -----------------------------------------------------------------------------
// Google login begins

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await userdb.findOne({ googleId: profile.id });

        if (!user) {
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            userEvents: [],
            refreshToken,
          });

          await user.save();
        }
        return done(null, user);
      } catch {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback", (req, res) => {
  console.log(req, "<<< req");
  // console.log(res, "<<< res");
  return passport.authenticate("google", {
    successRedirect: `http://localhost:${FEPORT}/events`,
    failureRedirect: `http://localhost:${FEPORT}/login`,
  });
});

app.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "user login", user: req.user });
  } else {
    res.sendStatus(400).json({ message: "Not Authorised" });
  }
});

// Google login ends
// --------------------------------------------------------------------

app.post("/auth", (req, res) => {
  userLogin(req, res);
});

app.get("/refresh", (req, res) => {
  handleRefreshToken(req, res);
});

app.get("/logout", (req, res) => {
  handleLogout(req, res);
});

app.post("/create-checkout-session", (req, res) => {
  createCheckoutSession(req, res);
});

// Using jwt verify all routes that need to be validated need to be below this
app.use(verifyJWT);

app.get("/events", (req, res) => {
  getEvents(req, res);
});

app.post("/events", (req, res) => {
  handlePostEvents(req, res);
});

app.listen(PORT, () => {
  console.log(`server started at port: ${PORT}`);
});
