//Requiring Libraries
const express = require("express");
const bodyParser = require("body-parser");
const sessions = require("express-session");

//Establishing Connection
require("./db/connection");

//Requiring routes
const userRoutes = require("./routes/user");
const authorRoutes = require("./routes/author");
const adminRoutes = require("./routes/admin");

// Creating an express app
const app = express();
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ limit:'50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.set("view engine", "ejs");

// Defining and listening to the port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//Creating a session
app.use(
  sessions({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    resave: false,
  })
);
var session;
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.author = req.session.author;
  res.locals.admin = req.session.admin;
  next();
});

//Routing Pages
app.use("/", userRoutes);
app.use("/author", authorRoutes);
app.use("/admin", adminRoutes);
