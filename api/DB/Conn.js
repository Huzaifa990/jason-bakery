var mongoose = require("mongoose")

mongoose
  .connect(
    "mongodb+srv://jhamiltonramm:1234@jasonhr.w3foonr.mongodb.net/jason-bakery"
  )
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log(e);
  });