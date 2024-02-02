var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/jason-bakery").then(()=>{
    console.log("Connected to mongoDB")
}).catch((e)=>{
    console.log(e);
})