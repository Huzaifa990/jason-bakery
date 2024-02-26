import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

export default function MyOrders() {
  let [orders, setOrders] = useState([]);
  let sellerId = localStorage.getItem("userId");
  let [orderStatus, setOrderStatus] = useState("pending");

  useEffect(() => {
    async function getData() {
      let response = await fetch(
        `https://bakery-backend-0taa.onrender.com/orders/${sellerId}/${orderStatus}`
      );
      let data = await response.json();
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
    let payload = {
      status,
    };
    axios
      .put(`https://bakery-backend-0taa.onrender.com/orderStatus/${id}`, payload)
      .then(() => {
        NotificationManager.success("Status Updated");
        // window.location.reload(); 
      })
      .catch((e) => {
        console.log(e);
        NotificationManager.error("something went wrong");
      });
  }

  function updatePayment(orderId, price, cakeName, customerName) {
    let newDate = new Date();
    let date = newDate.toLocaleDateString();
    let payload = {
      orderId,
      sellerId,
      price,
      cakeName,
      customerName,
      date,
    };
    axios
      .post("https://bakery-backend-0taa.onrender.com/wallet/", payload)
      .then(() => {
        console.log("Payment successful");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="order-section">
      <NotificationContainer />
      <div className="btn-container tap-bar">
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
        <button onClick={() => setOrderStatus("cancelled")}>
          {" "}
          Cancelled Order{" "}
        </button>
        <button onClick={() => setOrderStatus("rejected")}> Rejected Order </button>
      </div>
      {orders.length > 0 ? (
        <>
          {orders.map((item) => {
            return (
              <div className="cake-container">
                <div className="order-img">
                  <img src={item.cakeImages[0]} alt="cakes" />
                </div>
                <div className="customer-container">
                  <h2>Customer Info: </h2>
                  <p>
                    <b>Customer Name: </b>
                    {item.customerName}
                  </p>
                  <p>
                    <b>Phone Number: </b>
                    {item.phoneNumber}
                  </p>
                  <p>
                    <b>Email: </b>
                    {item.email}
                  </p>
                  <p>
                    <b>Address: </b>
                    {item.address}
                  </p>
                </div>

                <div className="order-container">
                  <h2>Order Info: </h2>
                  <p>
                    <b>Cake Name: </b>
                    {item.cakeName}
                  </p>
                  <p>
                    <b>Price Total: </b>${item.cakePrice}
                  </p>
                  <p
                    style={{
                      color:
                        item.status === "pending"
                          ? "yellow"
                          : item.status === "ongoing"
                          ? "orange"
                          : item.status === "completed"
                          ? "green"
                          : item.status === "cancelled"
                          ? "red"
                          : "gray",
                    }}
                  >
                    <b>Order Status: </b>
                    {item.status.toUpperCase()}
                  </p>
                  {item.status === "pending" ? (
                    <>
                      <div className="btn-container">
                        <button
                          className="accept-btn"
                          style={{ backgroundColor: "green", border: "none" }}
                          onClick={() => updateStatus("ongoing", item._id)}
                        >
                          {" "}
                          Accept{" "}
                        </button>
                        <button
                          className="reject-btn"
                          style={{
                            backgroundColor: "red",
                            border: "none",
                            marginLeft: "15px",
                          }}
                          onClick={() => updateStatus("rejected", item._id)}
                        >
                          {" "}
                          Reject{" "}
                        </button>
                      </div>
                    </>
                  ) : null}
                  {item.status === "ongoing" ? (
                    <>
                      <div className="btn-container">
                        <button
                          className="accept-btn"
                          style={{ backgroundColor: "green", border: "none" }}
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
                          Complete This Order{" "}
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <center>
            {" "}
            <h1
             className="orderH1"
            >
              No {orderStatus} Orders
            </h1>
          </center>
        </>
      )}
    </div>
  );
}
