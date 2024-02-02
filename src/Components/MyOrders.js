import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Stripe from "./Stripe/Stripe";

export default function MyOrders() {
  var [orders, setOrders] = useState([]);
  var sellerId = localStorage.getItem("userId");

  var [orderStatus, setOrderStatus] = useState("pending");

  useEffect(() => {
    async function getData() {
      var response = await fetch(
        `http://localhost:8080/orders/${sellerId}/${orderStatus}`
      );
      var data = await response.json();
      console.log(data);
      setOrders(data);
    }

    getData();

  }, [sellerId, orderStatus]);

  function updateStatus(
    status,
    id,
    cakePrice = 0,
    cakeName = "",
    customerName = ""
  ) {
    if (status === "completed") {
      updatePayment(id, cakePrice, cakeName, customerName);
    }
    var payload = {
      status,
    };

    axios
      .put(`http://localhost:8080/orderStatus/${id}`, payload)
      .then(() => {
        NotificationManager.success("Status Updated!");
      })
      .catch((e) => {
        console.log(e);
        NotificationManager.error("Something went wrong!");
      });
  }

  function updatePayment(orderId, price, cakeName, customerName) {
    var newDate = new Date();
    var date = newDate.toLocaleDateString();

    var payload = {
      orderId,
      sellerId,
      price,
      cakeName,
      customerName,
      date,
    };

    axios
      .post("http://localhost:8080/wallet", payload)
      .then(() => {
        console.log("Payment Updated!");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="order-section">
      <NotificationContainer />
      <div className="btn-container">
        <button onClick={() => setOrderStatus("pending")}>
          {" "}
          Pending Orders{" "}
        </button>
        <button onClick={() => setOrderStatus("ongoing")}>
          {" "}
          Ongoing Orders{" "}
        </button>
        <button onClick={() => setOrderStatus("completed")}>
          {" "}
          Completed Orders{" "}
        </button>
        <button onClick={() => setOrderStatus("canceled")}>
          {" "}
          Cancelled Orders{" "}
        </button>
        <button onClick={() => setOrderStatus("rejected")}>
          {" "}
          Rejected Orders{" "}
        </button>
      </div>

      {orders.map((item) => {
        return (
          <div className="cake-container">
            <div className="order-img">
              <img src={item.cakeImages[0]} alt="cake" />
            </div>

            <div className="customer-container">
              <h2>
                Customer <span className="heading-color">Info</span>:{" "}
              </h2>
              <p>
                <b>Customer Name: </b> {item.customerName}
              </p>
              <p>
                <b>Phone Number: </b> {item.phoneNumber}
              </p>
              <p>
                <b>Email: </b> {item.email}
              </p>
              <p>
                <b>Address: </b> {item.address}
              </p>
            </div>

            <div className="orders-container">
              <h2>
                Order <span className="heading-color">Info</span>:{" "}
              </h2>
              <p>
                <b>Cake Name: </b> {item.cakeName}
              </p>
              <p>
                <b>Total Bill: </b> ${item.cakePrice}
              </p>
              <p
                style={{
                  color:
                    item.status === "pending"
                      ? "yellow"
                      : item.status === "ongoing"
                      ? "orange"
                      : item.status === "rejected"
                      ? "red"
                      : item.status === "canceled"
                      ? "crimson"
                      : item.status === "completed"
                      ? "green"
                      : "grey",
                }}
              >
                <b>Order Status: </b> {item.status.toUpperCase()}
              </p>

              {item.status === "pending" ? (
                <>
                  <div className="btn-container">
                    <button
                      className="accept-btn"
                      style={{ backgroundColor: "#2ecc71", border: "none" }}
                      onClick={() => updateStatus("ongoing", item._id)}
                    >
                      {" "}
                      Accept{" "}
                    </button>
                    <button
                      className="reject-btn"
                      style={{
                        backgroundColor: "crimson",
                        border: "none",
                        marginLeft: "15px",
                      }}
                      onClick={() => updateStatus("rejected", item._id)}
                    >
                      {" "}
                      Reject
                    </button>
                  </div>
                </>
              ) : null}

              {item.status === "ongoing" ? (
                <>
                  <div className="btn-container">
                    <button
                      className="accept-btn"
                      style={{ backgroundColor: "#2ecc71", border: "none" }}
                      onClick={() =>
                        updateStatus(
                          "completed",
                          item._id,
                          item.cakePrice,
                          item.cakeName,
                          item.customerName
                        )
                      }
                    >
                      {" "}
                      Mark As Complete{" "}
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        );
      })}

      
    </div>
  );
}
