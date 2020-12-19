
const express = require("express");
const path = require("path");
const mysql = require("mysql");
const config = require('./dbConfig.js');
const app = express();
const con = mysql.createConnection(config);
// const upload = require("./uploadConfig.js");

//set "public" folder to be static folder, user can access it directly
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(path.join(__dirname, "contactform")));
app.use(express.static(path.join(__dirname, "lib")));
app.use(express.static(path.join(__dirname, "img")));
app.use(express.static(path.join(__dirname, "Biceps")));
app.use(express.static(path.join(__dirname, "Back")));
app.use(express.static(path.join(__dirname, "Chest")));
app.use(express.static(path.join(__dirname, "Legs")));
app.use(express.static(path.join(__dirname, "Shoulder")));
app.use(express.static(path.join(__dirname, "Triceps")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//or
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json()); 
// ============= Create hashed password ==============


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server is ready at " + port);
});
