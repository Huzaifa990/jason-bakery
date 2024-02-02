import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Stripe from "./Stripe/Stripe";
import closeImg from "../img/icons8-close-50.png";

export default function OrderCakes() {
  var location = useLocation();
  var id = location.state.cakeId;
  var [cakeId, setCakeId] = useState("");
  var [cakeImages, setCakeImages] = useState([]);
  var customerId = localStorage.getItem("userId");
  var [sellerId, setSellerId] = useState("");

  var [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    document.getElementById("overlay").style.visibility = "visible";

    async function getData() {
      var res = await fetch("http://localhost:8080/cakes/" + id);
      var data = await res.json();
      console.log(data);

      document.getElementById("cakeName").value = data.cakeName;
      document.getElementById("cakePrice").value = data.price;
      setCakeId(data._id);
      setCakeImages(data.cakeImages);
      setSellerId(data.sellerId);
    }

    getData();
  }, [id]);

  function placeOrder() {
    var customerName = document.getElementById("customerName").value;
    var address = document.getElementById("address").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var email = document.getElementById("email").value;
    var cakeName = document.getElementById("cakeName").value;
    var cakePrice = document.getElementById("cakePrice").value;

    var payload = {
      cakeId,
      cakeImages,
      cakeName,
      cakePrice,
      customerName,
      address,
      phoneNumber,
      email,
      customerId,
      sellerId,
    };

    axios
      .post("http://localhost:8080/order", payload)
      .then(() => {
        NotificationManager.success("Order Placed!");
      })
      .catch((e) => {
        NotificationManager.error("Something went wrong!");
        console.log(e);
      });
  }
  return (
    <div>
      <NotificationContainer />
      <div className="form-container order-container">
        <h1>Order Cake: </h1>
        <div className="img-container">
          {cakeImages.map((item) => {
            return <img src={item} width={200} alt="cake" />;
          })}
        </div>
        <label>Cake Name:</label>
        <input
          type="text"
          name="cakeName"
          id="cakeName"
          placeholder="CAKE NAME: "
          readOnly
        />
        <br /> <br />
        <label>Cake Price:</label>
        <input
          type="text"
          name="cakePrice"
          id="cakePrice"
          placeholder="PRICE: "
          readOnly
        />
        <br /> <br />
        <label>Customer Name:</label>
        <input
          type="text"
          name="customerName"
          id="customerName"
          placeholder="NAME: "
        />
        <br /> <br />
        <label>Delivery Address:</label>
        <textarea
          name="address"
          id="address"
          rows={6}
          cols={60}
          placeholder="ADDRESS"
        ></textarea>
        <br /> <br />
        <label>Contact Info.:</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="PHONE NUMBER: "
        />
        <br /> <br />
        <label>Personal Email:</label>
        <input type="email" name="email" id="email" placeholder="EMAIL: " />
        <br /> <br />
        <label>Select your payment method: </label>
        <select id="paymentMethod">
          <option value="default">----- Chose a payment method -----</option>
          <option value="card">Pay by card</option>
          <option value="cash">Cash on Delivery</option>
        </select>
        <br /> <br />
        <button
          disabled={btnDisabled}
          className="hero-btn"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>

      <div id="overlay">
        <div className="confirmation">
          <img src={closeImg} alt="icon" width={30} />
          <center>
            <h1>Enter card details: </h1>
            <p style={{ fontWeight: "bold" }}>
              You will be charged <span className="priceTag">$999</span> for
              this transcaction
            </p>
          </center>
          <Stripe />
        </div>
      </div>
    </div>
  );
}
