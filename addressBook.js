
class AddressBook{

    constructor(){
        
        this.data = [];
        this.length = this.data.length;
        this.emailSet = new Set();

    }

    emailAlreadyRegistered(email){
        if (this.emailSet.has(email)){
            return true;
        }

        return false;
    }

    add(entry) {

        // Check if email is already present in the database
        if (!this.emailAlreadyRegistered(entry.email)){
            this.emailSet.add(entry.email);
            this.data.push(entry);
            this.length++;
        } 

    }

    delete(email){

        this.data = this.data.filter((entry) => {
            if (entry.email === email) {
                this.length--;
                this.emailSet.delete(email);
                return false;
            } 
            
            return true;
        })

    }

    getData(){
        return this.data;
    }

    getEntry(email){
        let output = {};

        for(let entry of this.data){
            if (entry.email === email){
                output = entry;
                break;
            }
        }

        return output;

    }

    update(email, updateType, updatedValue){

        for(let entry of this.data){
            if (entry.email === email){
                entry[updateType] = updatedValue;
                break;
            }
        }

    }

    toString(){
        let output = "";

        for (let i = 0; i < this.length; i++){
            output += JSON.stringify(this.data[i]) + " ";
        }

        return output;

    }

}


module.exports = AddressBook