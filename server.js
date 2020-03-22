require("appmetrics-dash").attach();
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var helmet = require("helmet");
var cors = require("cors");
var path = require("path");
var si = require("systeminformation");
var compression = require("compression");
var logger = require("./misc/logger");
var isEmpty = require("./validation/is-empty");
var secret = require("./config/secret");

var port = process.env.PORT || 5000;
// Database Connection Url
mongoose
  .connect(secret.database, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

//   Express App

var app = express();

//middlewares
const shouldCompress = (req, res) => {
  // don't compress responses asking explicitly not
  if (req.headers["x-no-compression"]) {
    return false;
  }

  // use compression filter function
  return compression.filter(req, res);
};
app.use(compression({ filter: shouldCompress }));
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
require("./config/passport-jwt")(passport);
app.use(cors());
app.use(logger);
app.set("trust proxy", true);
// routes

app.get("/systeminformation", (req, res) => {
  si.cpu()
    .then(data => res.json(data))
    .catch(error => res.json(error));
});

// Set Api

var notificationSubscriber = require("./routes/api/notification-subscribe");
app.use("/", notificationSubscriber);
var notificationSender = require("./routes/api/notification-sender");
app.use("/", notificationSender);
var User = require("./routes/api/user");
app.use("/", User);
app.use(express.static("demo-push-notification"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "demo-push-notification", "index.html"));
});
// Server static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(port, () => {
  console.log(`port ${port}`);
});
