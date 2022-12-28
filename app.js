const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoute = require("./src/api/routes/users");
const membershipRoute = require("./src/api/routes/memberships");
const contactRoute = require("./src/api/routes/contacts");
const accessRoute = require("./src/api/routes/access");
const ErrorHandler = require("./src/middlewares/ErrorHandler");
const {migration}= require('./src/utils/util')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/users", userRoute);
app.use("/api/memberships", membershipRoute);
app.use("/api/contacts", contactRoute);
app.use("/api/access", accessRoute);
// ERROR HANDLER MIDDLEWARE (Last middleware to use)
app.use(ErrorHandler);

(async()=>{
  await migration();
})()

module.exports = app;
