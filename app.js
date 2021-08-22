const express = require("express");
const app = express();
const path = require("path");
const port = 80;
const fs = require("fs");
const { TIMEOUT } = require("dns");

// serving static files

const hostname = "127.0.0.1";



app.use("/static", express.static("static"));
app.use(express.urlencoded());

// set the template engine as pug
app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

// pug endpoint

app.get("/", (req, res) => {
  res.render("index");
  // res.header("Access-Control-Allow-Origin", "*");
});
app.get("/comps.pug", (req, res) => {
  res.render("comps");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
