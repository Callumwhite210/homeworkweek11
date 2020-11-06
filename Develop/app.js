//Declared Variables 
const express = require("express");
const fs = require("fs");
const path = require("path")
const app = express();

//Server Port
let PORT = process.env.PORT || 3000;

//Express
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Linking assets
app.use('./assets/js',express.static(path.join(__dirname,'public/assets/js')));
app.use('./assets/css',express.static(path.join(__dirname,'public/assets/css')));

//Array for user notes
let userNotes = [];

app.listen(PORT, function(){
    console.log('App listening:'+ PORT)
});
