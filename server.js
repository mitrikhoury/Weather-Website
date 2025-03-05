const express = require("express");
const path = require("path");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'Weather-Journal' folder
app.use(express.static(path.join(__dirname, "Weather-journal")));


//Default route to serve 'index.html' on the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Weather-journal", "index.html"));
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

let projectData = {};
app.get("/all", (req, res) => {
  res.send(projectData);
});

app.post("/add", (req, res) => {
  const { temp, date, feel } = req.body;
  const tempInCelsius = temp - 273.15; // Convert from Kelvin to Celsius
  projectData = { temp: tempInCelsius, date, feel };
  res.send({ message: "Data saved successfully!" });
});
