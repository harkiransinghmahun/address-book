const entry = require('./addressEntry.js')
const book = require('./addressBook.js')



bookEntry1 = new entry("Harkiran", "Singh", "07521286998", "harkiransinghmahun@gmail.com");
bookEntry2 = new entry("Priti", "Kaur", "07521286998", "priti.kaur@gmail.com");
bookEntry3 = new entry("Shay", "Vali", "07521286998", "shay.vali@gmail.com");

addressBook = new book();

addressBook.add(bookEntry1.createEntry());
addressBook.add(bookEntry2.createEntry());
addressBook.add(bookEntry3.createEntry());
// console.log(addressBook.toString());

addressBook.update("harkiransinghmahun@gmail.com", "email", "hsm542@york.ac.uk");
// console.log(addressBook.toString());

addressBook.delete("hsm542@york.ac.uk")
addressBook.delete("hsm542@york.arfgc.uk")
addressBook.delete("hsm542@york.ac.uk")
console.log(addressBook.toString());