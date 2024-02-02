var mongoose = require("mongoose");

var cakeSchema = new mongoose.Schema({
    cakeName: {
        type: String,
        required: true
    },

    cakeType: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    cakeImages: [{
        type: String,
        required: true
    }],

    sellerId: {
        type: String,
        required: true
    }
})

var Cakes = new mongoose.model("Cakes", cakeSchema);
module.exports = Cakes;