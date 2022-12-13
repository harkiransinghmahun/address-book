
class AddressEntry {

    firstName;
    lastName;
    phone;
    email;
    entry;

    constructor(firstName, lastName, phone, email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;

        this.entry = {};
    }

    createEntry() {
        this.entry = {
            "firstName" : this.firstName,
            "lastName" : this.lastName,
            "phone" : this.phone,
            "email" : this.email
        };

        return this.entry;
    }

    toString(){
        return JSON.stringify(this.entry);
    }


}

module.exports = AddressEntry
