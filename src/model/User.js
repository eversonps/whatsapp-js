import {Firebase} from "./../util/Firebase"
import {Model} from "./Model"

export class User extends Model{
    constructor(idEmail){
        super()

        if(idEmail){
            this.getById(idEmail)
        }
    }

    get name() { return this._data.name; }
    set name(value) { this._data.name = value; }

    get email() { return this._data.email; }
    set email(value) { this._data.email = value; }

    get photo() { return this._data.photo; }
    set photo(value) { this._data.photo = value; }

    getById(idEmail){
        return new Promise((s, f)=>{
            User.findByEmail(idEmail).onSnapshot(doc=>{
                this.fromJSON(doc.data())
                s(doc)
            })
        })
    }

    save(){
        return User.findByEmail(this.email).set(this.toJSON())
    }

    addContact(contact){
        return User.getContactRef(this.email).doc(btoa(contact.email)).set(contact.toJSON())
    }

    getContacts(){
        return new Promise((s, f)=>{
            User.getContactRef(this.email).onSnapshot(docs=>{
                let contacts = []

                docs.forEach(doc => {
                    let data = doc.data()
                    data.id = doc.id
                    contacts.push(data)
                });

                this.trigger("contactschange", docs)
                s(contacts)
            })
        })
    }

    static getRef(){
        return Firebase.db().collection("/users")
    }

    static getContactRef(idEmail){
        return User.getRef().doc(idEmail).collection("contacts")
    }

    static findByEmail(email){
        return User.getRef().doc(email)
    }
}