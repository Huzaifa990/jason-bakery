var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var bcrpyt = require("bcrypt");
var nodemailer = require("nodemailer");
require("dotenv").config();


require("./DB/Conn");
var app = express();
app.use(express.json({ limit: "5mb" }));
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

var Cakes = require("./Models/Cake");
var Order = require("./Models/Order");
var Auth = require("./Models/Auth");
var Wallet = require("./Models/Wallet");

var port = 8080;

const stripe = require("stripe")(
  "sk_test_51O9YFOHyOtnDQiYKLCcO7Vy0rXyasIwpEINWmoRuCXvf9xLHzxScHj0m7Fbz9lMW0dc1c2fFX4DJt9ZgnXKRiY7E00SIXFtFPV"
);

app.get("/", async (req, res) => {
  res.send("-----------Welcome to bakery API---------");
});

app.post("/cakes", async (req, res) => {
  var addCake = new Cakes(req.body);
  addCake
    .save()
    .then(() => {
      res.status(200).send(addCake);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/cakes", async (req, res) => {
  var allCakes = await Cakes.find();

  res.status(200).send(allCakes);
});

app.get("/cakes/:id", async (req, res) => {
  try {
    var _id = req.params.id;

    var findCake = await Cakes.findById(_id);

    res.status(200).send(findCake);
  } catch {
    res.status(404).send("Cake not found!");
  }
});
// localhost:8080/cakes/454654fdg56df4g654654
app.put("/cakes/:id", async (req, res) => {
  try {
    var _id = req.params.id;

    var updateCake = await Cakes.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    res.status(200).send(updateCake);
  } catch {
    res.status(404).send("Cake not found!");
  }
});

app.delete("/cakes/:id", async (req, res) => {
  try {
    var _id = req.params.id;

    var deletedCake = await Cakes.deleteOne({ _id: _id });
    res.status(200).send(deletedCake);
  } catch {
    res.status(404).send("Cake not found!");
  }
});

app.get("/topselling", async (req, res) => {
  const allCakes = await Cakes.find();
  res.status(200).send(allCakes);
})

// ============================== ORDER SECTION =======================================

app.post("/order", async (req, res) => {
  try {
    var addOrder = new Order(req.body);
    addOrder
      .save()
      .then(() => {
        res.status(200).send(addOrder);
      })
      .catch((e) => {
        res.status(404).send(e);
      });
  } catch {
    res.status(404).send("Something went wrong!");
  }
});

app.get("/order", async (req, res) => {
  try {
    var findOrder = await Order.find();
    res.status(200).send(findOrder);
  } catch {
    res.status(404).send("Something went wrong!");
  }
});

app.get("/sellerOrders/:sellerId", async (req, res) => {
  try {
    var sellerId = req.params.sellerId;

    var findOrders = await Order.find({ sellerId: sellerId });

    res.status(200).send(findOrders);
  } catch {
    res.status(404).send("Something went wrong!");
  }
});

app.get("/customerOrders/:customerId", async (req, res) => {
  try {
    var customerId = req.params.customerId;

    var findOrders = await Order.find({ customerId: customerId });

    res.status(200).send(findOrders);
  } catch {
    res.status(404).send("Something went wrong!");
  }
});

app.get("/orders/:sellerId/:orderStatus", async (req, res) => {
  try {
    var orderStatus = req.params.orderStatus;
    var sellerId = req.params.sellerId;
    var findOrders = await Order.find({
      status: orderStatus,
      sellerId: sellerId,
      $or: [
        {paymentMethod: {$ne: 'card'}},
        {paymentMethod: 'card', paymentStatus: true}
      ]
    });

    res.status(200).send(findOrders);
  } catch {
    res.status(404).send("Something went wrong!");
  }
});

app.get("/customerOrders/:customerId/:orderStatus", async (req, res) => {
  try {
    var orderStatus = req.params.orderStatus;
    var customerId = req.params.customerId;
    var findOrders = await Order.find({
      status: orderStatus,
      customerId: customerId,
    });

    res.status(200).send(findOrders);
  } catch {
    res.status(404).send("Something went wrong!");
  }
});

app.put("/orderStatus/:id", async (req, res) => {
  try {
    var _id = req.params.id;

    var updateOrder = await Order.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    res.status(200).send(updateOrder);
  } catch {
    res.status(404).send("Order not found!");
  }
});

// ============================== // ORDER SECTION // =======================================

// ============================== // SIGNUP SECTION // =======================================

app.post("/signup", (req, res) => {
  var addUser = new Auth(req.body);
  addUser
    .save()
    .then(() => {
      res.status(200).send(addUser);
    })
    .catch((e) => {
      res.status(404).send(e);
    });
});

app.post("/signin", async (req, res) => {
  var findUser = await Auth.findOne({ email: req.body.email });

  if (findUser !== null) {
    var matchPassword = await bcrpyt.compare(
      req.body.password,
      findUser.password
    );
    if (matchPassword === true) {
      res.status(200).send(findUser);
    } else {
      res.status(404).send("Invalid Password!");
    }
  } else {
    res.status(404).send("Invalid Email!");
  }
});

// ============================== // SIGNUP SECTION // =======================================

// ============================== // CAKES SECTION // =======================================

app.get("/myCakes/:sellerId", async (req, res) => {
  try {
    var sellerId = req.params.sellerId;

    var findCakes = await Cakes.find({ sellerId: sellerId });

    res.status(200).send(findCakes);
  } catch {
    res.status(404).send("No Cakes Found!");
  }
});

// ============================== // CAKE SECTION END // =======================================

// ============================== // WALLET SECTION START // =======================================

app.post("/wallet", async (req, res) => {
  var addPayment = new Wallet(req.body);
  addPayment.save();

  res.status(200).send(addPayment);
});

app.get("/wallet/:id", async (req, res) => {
  try {
    var sellerId = req.params.id;
    var allPayments = await Wallet.find({ sellerId: sellerId });
    res.status(200).send(allPayments);
  } catch (e) {
    res.status(404).send(e);
  }
});

// ============================== // WALLET SECTION END // =======================================

// ============================== // ANALYTICS SECTION START // =======================================

app.get("/analytics/:sellerId", async (req, res) => {
  var _id = req.params.sellerId;

  var findUser = await Wallet.find({ sellerId: _id });

  var dates = [];
  var earnings = [];

  for (var i = 0; i < findUser.length; i++) {
    dates.push(findUser[i].date);
    earnings.push(findUser[i].price);
  }

  var sum = 0;

  for (var i = 0; i < findUser.length; i++) {
    sum += findUser[i].price;
  }

  res.status(200).send({
    dates: dates,
    earnings: earnings,
    totalEarnings: sum,
  });
});

// ============================== // ANALYTICS SECTION END // =======================================

// ============================== // STRIPE SECTION START    // =======================================



app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price*100,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// ============================== // STRIPE SECTION END // ======================================= //

// ============================== // CONTACT FORM START // ======================================= //

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post('/submit-form', (req, res) => {
  const formData = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER,
    subject: "New contact form submission",
    html: `<p>Name: ${formData.name}</p>
       <p>Email: ${formData.email}</p>
       <p>Phone: ${formData.phone}</p>
       <p>Subject: ${formData.subject}</p>
       <p>Message: ${formData.message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Form submitted successfully');
    }
  });
});


// ============================== // CONTACT FORM END // ======================================= //

app.listen(port, () => {
  console.log("Api is running on port: " + port);
});
