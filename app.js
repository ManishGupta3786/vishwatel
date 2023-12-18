const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const url = require("url");
const path = require("path");
const db = require("./models/index");
require('dotenv').config();
// Init app
const app = express();
//app.use(nocache());
//app.use(compression());
app.use(cors());
db.sequelize.sync();
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// Express fileUpload middleware
app.use(fileUpload());

// Body Parser middleware
// To take data from client: form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));
// Serve static files from the 'build' directory

app.use(express.static(path.join(__dirname, "frontend_build")));

// Handle any other routes by serving the index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend_build", "index.html"));
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Set routes
require("./routes/custIndDetails.js")(app);
const port = process.env.PORT || 8000;

app.listen(port, function () {
  console.log("Server is running on localhost:" + port);
});
