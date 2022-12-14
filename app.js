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
    
    res.render("index", {data: addressBook.getData()}); 

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

// API Endpoints

// Get all records
app.get("/records", (req, res) => {

    const records = addressBook.getData();
    res.send(records);

});

// Get a specific record using email address
app.get("/records/:email", (req, res) => {

    const email = req.params.email;
    const entry = addressBook.getEntry(email);
    const isEmpty = Object.keys(entry).length === 0;

    if (isEmpty == true){
        res.send(`No matching record with ${email} email found!`);
    } else {
        res.send(entry);
    }

});

// Post/Add a new record
// url structure: /add-record?firstName=Cristiano&lastName=Ronaldo&phone=7612349832&email=cr7@gmail.com
app.post("/records", (req, res) => {

    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const phone = req.query.phone;
    const email = req.query.email;

    if(addressBook.emailAlreadyRegistered(email) == true){
        res.send("Sorry! The email has already been registered.");
    } 
    
    if (firstName === undefined || lastName === undefined || phone === undefined || email === undefined ) {
        res.send("Cannot add record. Please provide all the parameters values.");
    } else {
        newEntry = new entry(firstName, lastName, phone, email);
        addressBook.add(newEntry.createEntry())
        res.send(`Record Added. First Name = ${firstName}, Last Name = ${lastName}, Phone = ${phone}, Email = ${email}`);
    }
    
});

// Updates either first name, last name or phone of a record
// url structure: /records/example@email.com?fieldToUpdate=firstName&updatedValue=value
app.patch("/records/:email", (req, res) => {

    const email = req.params.email;
    const field = req.query.fieldToUpdate; 
    const value = req.query.updatedValue;
    const emailRegistered = addressBook.emailAlreadyRegistered(email);



    if (emailRegistered != true){
        res.send(`No matching record with ${email} found!`);
    }

    if (field === undefined || value === undefined){
        res.send("Invalid input!. Please include both fieldToUpdate and updatedValue parameter");
    }

    if (field === "firstName" || field === "lastName" || field === "phone"){
        addressBook.update(email, field, value);
        res.send(`Record Updated. ${field} = ${value}`);

    } else {
        res.write("Invalid input");
        res.write("Only first name, last name and phone numbers of existing records can be updated");
        res.write("To update first name use fieldToUpdate=firstName");
        res.write("To update last name use fieldToUpdate=lastName");
        res.write("To update phone use fieldToUpdate=phone");
        res.send();
    }



});


// Deleta a particular record
// url structure: /records/example@email.com
app.delete("/records/:email", (req, res) => {

    const email = req.params.email;
    const emailRegistered = addressBook.emailAlreadyRegistered(email);


    if (emailRegistered == false){
        res.send(`No record with ${email} found.`);
    } else {
        addressBook.delete(email);
        res.send(`Record with ${email} email deleted`);
    }

});



app.listen(3030, function() {
    console.log("Server started on port 3030");
});