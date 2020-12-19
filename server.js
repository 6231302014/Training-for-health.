
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
app.get("/password/:pass", function (req, res) {
    const password = req.params.pass;
    const saltRounds = 10;    //the cost of encrypting see https://github.com/kelektiv/node.bcrypt.js#a-note-on-rounds
    bcrypt.hash(password, saltRounds, function (err, hash) {
        //return hashed password, 60 characters
        // console.log(hash.length);
        res.send(hash);
    });
});

// ============= Login ==============
app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const sql = "SELECT password, role FROM user WHERE username=?";
    con.query(sql, [username], function (err, result, fields) {
        if (err) {
            res.status(500).send("Server error");
        }
        else {
            const numrows = result.length;
            //if that user is not unique
            if (numrows != 1) {
                //login failed
                res.status(401).send("Wrong username");
            }
            else {
                // console.log(result[0].password);
                //verify password, async method
                bcrypt.compare(password, result[0].password, function (err, resp) {
                    if (err) {
                        res.status(503).send("Authentication Server error");
                    }
                    else if (resp == true) {
                        //correct login send destination URL to client
                        res.send("/welcome");
                    }
                    else {
                        //wrong password
                        res.status(401).send("Wrong password");
                    }
                });
            }
        }
    });
});

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
