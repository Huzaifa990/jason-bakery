import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

export default function CustomerOrder() {
  var [orders, setOrders] = useState([]);
  var customerId = localStorage.getItem("userId");
  var [orderStatus, setOrderStatus] = useState("pending");
  var [orderId, setOrderId] = useState("");
  var [cancellationFee, setCancellationFee] = useState(0);

  useEffect(() => {
    async function getData() {
      var response = await fetch(
        `https://bakery-backend-0taa.onrender.com/customerOrders/${customerId}/${orderStatus}`
      );
      var data = await response.json();
      console.log(data);
      setOrders(data);
    }

    getData();
  }, [customerId, orderStatus]);

  function openConfirmBox(id){
    setOrderId(id);
    document.getElementById("overlay").style.visibility = "visible";
  }

  function openOngoingCofirmBox(id, orderPrice){
      setOrderId(id);
      setCancellationFee(Math.floor(orderPrice * 0.20));
      document.getElementById("overlay2").style.visibility = "visible";
  }

  function closeOngoingCofirmBox(id){
    setOrderId(id);
    document.getElementById("overlay2").style.visibility = "hidden";
}

  function closeConfirmBox(){
    document.getElementById("overlay").style.visibility = "hidden";
  }

  function cancelPendingOrder(){
    var payload = {
      status: "cancelled"
    }

    axios.put(`https://bakery-backend-0taa.onrender.com/orderStatus/${orderId}`, payload).then(()=>{
    NotificationManager.success("Order Cancelled!");
    closeConfirmBox();
    // window.location.reload();
    }).catch((e)=>{
      NotificationManager.error("Something went wrong!");
      console.log(e);
    })
  }

  function cancelOngoingOrder(){
    var payload = {
      status: "canceled"
    }

    axios.put(`https://bakery-backend-0taa.onrender.com/orderStatus/${orderId}`, payload).then(()=>{
    NotificationManager.success("Order Canceled!");
    closeOngoingCofirmBox();
    // window.location.reload();
    }).catch((e)=>{
      NotificationManager.error("Something went wrong!");
      console.log(e);
    })
  }
  return (

    <div>
        <NotificationContainer/>
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
          Cancelled Orders{" "}
        </button>
       
      </div>
      <div className="order-section">
        {orders.length > 0?
        <>
          {orders.map((item) => {
            return (
              <div className="cake-container">
                <div className="order-img">
                  <img src={item.cakeImages[0]} alt="cake" />
                </div>

                <div className="customer-container">
                  <h2>
                    Your <span className="heading-color">Info</span>:{" "}
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

                <div className="order-container">
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
                          : item.status === "cancelled"
                          ? "crimson"
                          : item.status === "completed"
                          ? "green"
                          : "grey",
                    }}
                  >
                    <b>Order Status: </b> {item.status.toUpperCase()}
                  </p>

                  {item.status === "pending"?
                  <>
                    <button className="reject-btn" onClick={()=>openConfirmBox(item._id)} style={{
                          backgroundColor: "crimson",
                          border: "none",
                          marginLeft: "15px",
                          color:"white",
                          padding: "10px 30px",
                          borderRadius: "30px"
                        }}>Cancel Order</button>
                  </>: item.status === "ongoing"?
                  <>
                    <button className="reject-btn" style={{
                          backgroundColor: "crimson",
                          border: "none",
                          marginLeft: "15px",
                          color: "white",
                          padding: "10px 30px",
                          borderRadius: "30px"
                        }} onClick={()=>openOngoingCofirmBox(item._id , item.cakePrice)}>Cancel Order</button>
                  </>: null}
                </div>
              </div>
            );
          })}
        </>: 
        <>
         <center>
          <h1 className="orderH1"
              >No {orderStatus} orders!</h1>
        </center>
        </>}
      </div>

      <div id="overlay">
        <div className="confirmation">
          <h1>Are you sure you want to cancel this order?</h1>
          <div className="confirmation_btns">
            <button className="btnYes" onClick={cancelPendingOrder}>Yes</button>
            <button className="btnNo" onClick={closeConfirmBox}> No </button>
          </div>
        </div>
      </div>


      <div id="overlay2">
        <div className="confirmation">
          <h1>Are you sure you want to cancel this order? You will be charged an extra ${cancellationFee} as a cancelation fee!</h1>
          <div className="confirmation_btns">
            <button className="btnYes" onClick={cancelOngoingOrder}>Yes</button>
            <button className="btnNo" onClick={closeOngoingCofirmBox}> No </button>
          </div>
        </div>
      </div>
    </div>
  );
}
