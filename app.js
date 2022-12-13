// Imports
const bodyParser = require("body-parser");
const alert = require("alert");

// Class imports
const entry = require('./addressEntry.js');
const book = require('./addressBook.js');
addressBook = new book();

// Express app variables setup
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));  // res.body
app.use(express.static("public")); // For static files
app.set("view engine", "ejs"); // res.render

// Dummy data entries
dummyEntry1 = new entry("Sudur", "Roy", "7123456546", "sr@gmail.com");
addressBook.add(dummyEntry1.createEntry());

dummyEntry2 = new entry("Alistair", "Campbell", "7514813213", "ac@gmail.com");
addressBook.add(dummyEntry2.createEntry());

dummyEntry3 = new entry("Padhraig", "Murphy", "7435412356", "psm@gmail.com");
addressBook.add(dummyEntry3.createEntry());



app.get("/", (req, res) => {

    const deleteItem = req.body.button;
    
    res.render("index", {data: addressBook.getData()}); // index has to be placed in views folder.

});


app.post("/", (req, res)=>{
    
    // req.body comes from body parser library
    const payload = req.body;

    if (payload.add !== undefined){
        newEntry = new entry(payload.fName, payload.lName, payload.phone, payload.email);

        if (addressBook.emailAlreadyRegistered(newEntry.email) === true ){
            alert("Email address already registered.");
        } else {
            addressBook.add(newEntry.createEntry());
        }

    } 
    
    if (payload.delete !== undefined) {
        addressBook.delete(payload.delete);
    }

    res.render("index", {data: addressBook.getData()});
    
})


app.post("/update", (req, res) => {

    const payload = req.body;

    addressBook.update(payload.email, payload.updateField, payload.input);
    res.redirect("/");

});


app.post("/update/:email", (req, res) => {

    let entryToBeUpdated = addressBook.getEntry(req.params.email);
    res.render("update", {entry: entryToBeUpdated}); 

});


app.listen(3030, function() {
    console.log("Server started on port 3030");
});