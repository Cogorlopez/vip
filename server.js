const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users.js");
// const profile = require('./routes/api/profile.js');
const drawings = require("./routes/api/drawings.js");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // DB Config
const db = require("./config/keys").mongoURI;
const workDb = "mongodb://127.0.0.1:27017";

// // Connect to MongoDB
mongoose
  .connect(workDb.toString())
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// // Passport middleware
app.use(passport.initialize());

// // Passport config
require("./config/passport.js")(passport);

// Enable CORS
app.use(cors());

// // Use routes
app.use("/api/users", users);
// app.use('/api/profile', profile);
app.use("/api/drawings", drawings);

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server running on port ${port}`));
