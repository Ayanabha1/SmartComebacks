const express = require("express");
const app = express();
const path = require("path");
const port = 80;
const fs = require("fs");
const cors = require("cors");
const { TIMEOUT } = require("dns");



app.use(
    cors({
        origin: '*',
        credentials : true,
        methods : ["GET" , "POST"]
    })
);
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
});



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


