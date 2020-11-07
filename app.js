//For Node 
const express = require("express");
const fs = require("fs");
const path = require("path")
const app = express();

//Server Port
let PORT = process.env.PORT || 3001;

//Show that app is listening and running
app.listen(PORT, function(){
    console.log('App listening:'+ PORT)
});

//Express
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

//Linking assets
app.use('./assets/js',express.static(path.join(__dirname,'public/assets/js')));
app.use('./assets/css',express.static(path.join(__dirname,'public/assets/css')));

//Grabs respective HTMLs
//for Heroku routing
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes",function(req,res){
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Reads and returns data in notes Json
const noteJson = fs.readFile(path.join(__dirname, "/db/db.json"), function(err, note){
    if (note){
        console.log("Notes: "+ note);
        return note;
    }
    if (err){
        console.error(err);
    }
});

app.post("/notes", function(req, res){
    let newnote = req.body;
    addNote(newnote);
    res.end();
});

//Add notes into JSON
function addNote(newnote){
    fs.readFile(path.join(__dirname,"./db/db.json"), function(err,note){
        let json = JSON.parse(note);
        json.push(newnote);
        fs.writeFile (path.join(__dirname, "/db/db.json"), JSON.stringify(json), function(err){
            if (err){
              console.error(err);
            }
        });  
    })
};

app.get("/api/notes", function(req, res) {
    
    const notesRead = fs.readFileSync(path.join(__dirname, "/db/db.json"), {encoding: "utf-8"});
    
    res.json(JSON.parse(notesRead));
  });

app.get("./app/notes", function(req, res){
    res.json(noteJson);
});


