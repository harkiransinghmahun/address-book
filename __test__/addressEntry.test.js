const entry = require('../addressEntry.js')
    
test("All instance variables of class Address Entry are assigned correct values", ()=>{
    newEntry = new entry("Harkiran", "Mahun", "7521286998", "harkiransinghmahun@gmail.com");
    const [ firstName, lastName, phone, email] = ["Harkiran", "Mahun", "7521286998", "harkiransinghmahun@gmail.com"]

    expect(firstName).toEqual("Harkiran"); 
    expect(lastName).toEqual("Mahun"); 
    expect(phone).toEqual("7521286998"); 
    expect(email).toEqual("harkiransinghmahun@gmail.com");  
})


test("Create entry method returns expected object with key value pairs", ()=>{
    newEntry = new entry("Harkiran", "Mahun", "7521286998", "harkiransinghmahun@gmail.com");
    const { firstName, lastName, phone, email} = newEntry.createEntry()

    expect(firstName).toEqual("Harkiran"); 
    expect(lastName).toEqual("Mahun"); 
    expect(phone).toEqual("7521286998"); 
    expect(email).toEqual("harkiransinghmahun@gmail.com");  
})