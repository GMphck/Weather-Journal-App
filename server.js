// Setup empty JS object to act as endpoint for all routes
const projectData = {};
// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
let port = 8000;
const server = app.listen(port, listening);

// listening to start run server
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}
// return data to app
// get request
app.get("/getData", sendData);
function sendData(req, res) {
  res.send(projectData);
  console.log(projectData);
}
// make post request
app.post("/addData", addApiData);
function addApiData(req, res) {

  projectData['temperature'] = req.body.temperature;
  projectData['date'] = req.body.date;
  projectData['userResponse'] = req.body.userResponse
  res.send(projectData);
  // console.log(projectData);
}
