const entry = require('../addressEntry.js');
const book = require('../addressBook.js');


addressBook = new book();

test("Add entry 1 in the book", ()=>{
    bookEntry1 = new entry("Cristiano", "Ronaldo", "7123456546", "cr7@gmail.com");
    const emailRegisteredFlag = addressBook.emailAlreadyRegistered(bookEntry1.email);

    addressBook.add(bookEntry1.createEntry());
    
    const { firstName, lastName, phone, email} = addressBook.getEntry(bookEntry1.email);
    const noDataEntries = addressBook.getData().length;


    expect(emailRegisteredFlag).toEqual(false);
    expect(firstName).toEqual("Cristiano"); 
    expect(lastName).toEqual("Ronaldo"); 
    expect(phone).toEqual("7123456546"); 
    expect(email).toEqual("cr7@gmail.com");
    expect(noDataEntries).toEqual(1);  
})


test("Add entry 2 in the book", ()=>{
    bookEntry2 = new entry("Lionel", "Messi", "7653145812", "lm10@gmail.com");
    const emailRegisteredFlag = addressBook.emailAlreadyRegistered(bookEntry2.email);

    addressBook.add(bookEntry2.createEntry());

    const { firstName, lastName, phone, email} = addressBook.getEntry(bookEntry2.email);
    const noDataEntries = addressBook.getData().length;


    expect(emailRegisteredFlag).toEqual(false);
    expect(firstName).toEqual("Lionel"); 
    expect(lastName).toEqual("Messi"); 
    expect(phone).toEqual("7653145812"); 
    expect(email).toEqual("lm10@gmail.com");
    expect(noDataEntries).toEqual(2);  
})


test("Add entry 3 in the book", ()=>{
    bookEntry3 = new entry("Kylian", "Mbappe", "7456317896", "km10@gmail.com");
    const emailRegisteredFlag = addressBook.emailAlreadyRegistered(bookEntry3.email);

    addressBook.add(bookEntry3.createEntry());
    
    const { firstName, lastName, phone, email} = addressBook.getEntry(bookEntry3.email);
    const noDataEntries = addressBook.getData().length;


    expect(emailRegisteredFlag).toEqual(false);
    expect(firstName).toEqual("Kylian"); 
    expect(lastName).toEqual("Mbappe"); 
    expect(phone).toEqual("7456317896"); 
    expect(email).toEqual("km10@gmail.com");
    expect(noDataEntries).toEqual(3);   
})



test("Duplicate email address not allowed", ()=>{
    bookEntry4 = new entry("Cristiano", "Ronaldo", "7123456546", "cr7@gmail.com");

    const emailRegisteredFlag = addressBook.emailAlreadyRegistered(bookEntry3.email);
    const noDataEntries = addressBook.getData().length;

    expect(emailRegisteredFlag).toEqual(true);
    expect(noDataEntries).toEqual(3);  

})


test("Update first name of exisiting entry", ()=>{
    const updatedFirstName = "Chris";
    const emailToSearch = "cr7@gmail.com";

    addressBook.update(emailToSearch, "firstName", updatedFirstName);

    const { firstName, lastName, phone, email} = addressBook.getEntry(emailToSearch);

    expect(firstName).toEqual(updatedFirstName);

})

test("Update last name of exisiting entry", ()=>{
    const updatedLastName = "Francis";
    const emailToSearch = "km10@gmail.com";

    addressBook.update(emailToSearch, "lastName", updatedLastName);

    const { firstName, lastName, phone, email} = addressBook.getEntry(emailToSearch);

    expect(lastName).toEqual(updatedLastName);

})


test("Delete exisiting entry", ()=>{
    const email = "cr7@gmail.com";

    const emailPresenceBeforeDeleting =  addressBook.emailAlreadyRegistered(email);
    addressBook.delete(email);
    const emailPresenceAfterDeleting = addressBook.emailAlreadyRegistered(email);
    

    expect(emailPresenceBeforeDeleting).toEqual(true);
    expect(emailPresenceAfterDeleting).toEqual(false);

})

