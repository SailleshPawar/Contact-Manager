class Contact {
    constructor(name, phone,email,image,errors,id, records) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.image = image;     
        this.errors=errors;
        this.id=id;
        this.records=records;
    }
}

export default Contact;