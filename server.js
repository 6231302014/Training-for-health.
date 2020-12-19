
const express = require("express");
const path = require("path");
const mysql = require("mysql");
const config = require('./dbConfig.js');
const bcrypt = require("bcrypt");
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


app.post("/register", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
  
    //hash password
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            console.log(err);
            res.status(500).send("Hash error");
        } else {
            //get hash password
            //insert to DB
            const sql = "INSERT INTO user (username,password,role) VALUES (?,?,2)";
            con.query(sql, [username, hash], function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send("Database error");
                } else {
                    res.send("Register Success!");
                }
            });
        }






    });
});




// ============= Page routes ==============
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/welcome", function (req, res) {
    res.sendFile(path.join(__dirname, "/login-page.html"));
});

app.get("/extable", function (req, res) {
    res.sendFile(path.join(__dirname, "/extable.html"));
});
app.get("/extable2", function (req, res) {
    res.sendFile(path.join(__dirname, "/extable2.html"));
});
app.get("/extable3", function (req, res) {
    res.sendFile(path.join(__dirname, "/extable3.html"));
});
app.get("/extable4", function (req, res) {
    res.sendFile(path.join(__dirname, "/extable4.html"));
});
app.get("/extable5", function (req, res) {
    res.sendFile(path.join(__dirname, "/extable5.html"));
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server is ready at " + port);
});
