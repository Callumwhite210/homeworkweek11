//For Node 
const express = require("express");
const fs = require("fs");
const path = require("path")


//Server Port + Express init
const app = express();
const PORT = process.env.PORT || 3000;

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

// reads db
fs.readFile("db/db.json",(err, data) => {
  if (err) throw err;
  let notes = JSON.parse(data);

// Setup the route
app.get("/api/notes", function(req, res) {
  // Reads the db.json file and returns all saved notes in json.
  const notesRead = fs.readFileSync(path.join(__dirname, "/db/db.json"), {encoding: "utf-8"});
  res.json(JSON.parse(notesRead));
  });

// Setup post routes & Adds notes to db.json
app.post("/api/notes", function(req, res) {
   let newNote = req.body;
   notes.push(newNote);
   update();
   return
  });

// Retrieves a note with id
app.get("/api/notes/:id", function(req,res) {
    res.json(notes[req.params.id]);
    });

// Deletes a note
app.delete("/api/notes/:id", function(req, res) {
    notes.splice(req.params.id, 1);
    update();
    });

// Display notes.html
app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
    });
      
// Display index.html
app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
    });

//updates the json file
function update() {
    fs.writeFile("./db/db.json",JSON.stringify(notes,'\t'),err => {
          if (err) throw err;
          return true;
          });
        }
    }); 