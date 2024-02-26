var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    cakeId: {
        type: String,
        required: true
    },

    cakeName: {
        type: String,
        required: true
    },

    cakeImages: [{
        type: String,
        required: true
    }],
    cakePrice: {
        type: Number,
        required: true
    },

    customerName: {
        type: String,
        required: true
    },

    address: {
        type: String, 
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    sellerId: {
        type: String,
        required: true
    },

    customerId: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "pending"
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: Boolean,
        default: false
    }
})

var Order = new mongoose.model("Order", orderSchema);

module.exports = Order;