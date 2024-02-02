var mongoose = require("mongoose");

var walletSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },

    sellerId: {
        type: String,
        required: true
    },

    cakeName: {
        type: String,
        required: true
    },

    customerName: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    date: {
        type: String
    }
})

var Wallet = new mongoose.model("wallet", walletSchema);

module.exports = Wallet;