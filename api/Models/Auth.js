var mongoose = require("mongoose")
var bcrpyt = require("bcrypt");

var authSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },    
})

authSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrpyt.hash(this.password, 10);
    }
    next();
})

var Auth = new mongoose.model("Auth", authSchema);

module.exports = Auth;