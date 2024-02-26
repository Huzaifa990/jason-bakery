import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function Wallet() {
  var id = localStorage.getItem("userId");
  var [paymentInfo, setPaymentInfo] = useState([]);
  var [analytics, setAnalytics] = useState({});

  useEffect(() => {
    async function getData() {
      var response = await fetch(`https://bakery-backend-0taa.onrender.com/wallet/${id}`);
      var data = await response.json();
      console.log(data);
      setPaymentInfo(data);

      var response2 = await fetch(`https://bakery-backend-0taa.onrender.com/analytics/${id}`);
      var data2 = await response2.json();
      setAnalytics(data2);
      console.log(data2);
    }

    getData();
  }, [id]);

  var i = 0;

  return (
    <>
      <div className="analytics_container">
        <div className="analytics_inner">
          <div className="graph">
            <h2 style={{ color: "white" }}>Analytics</h2>
            <Line
              data={{
                datasets: [
                  {
                    label: "Your Sales",
                    data: analytics.earnings,
                    backgroundColor: ["#F77D0A", "white", "white"],
                    borderColor: "#F77D0A",
                    hoverBackgroundColor: [
                      "orange",
                      "orange",
                      "orange",
                      "rgba(0,0,0,0.07)",
                    ],
                  },
                ],
                labels: analytics.dates,
              }}
              width={100}
              height={100}
              options={{
                legend: {
                  labels: {
                    backgroundColor: "#F28123",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: "white",
                    },
                    grid: {
                      color: "rgba(185, 185, 185, 0.427)",
                    },
                  },

                  x: {
                    ticks: {
                      color: "white",
                      beginAtZero: true,
                    },
                  },
                },
              }}
            />
          </div>

          <div className="totalEarnings">
            <h2>Total Earnings:</h2>
            <h1>${analytics.totalEarnings}</h1>
          </div>
        </div>
      </div>
      <div className="table_container">
        <h1>Earning Details: </h1>
        <table>
          <tr>
            <th>Sr#</th>
            <th>Cake Name</th>
            <th>Customer Name</th>
            <th>Earnings</th>
          </tr>

          {paymentInfo.map((item) => {
            i++;
            return (
              <tr>
                <td>{i}</td>
                <td>{item.cakeName}</td>
                <td>{item.customerName}</td>
                <td>${item.price}</td>
              </tr>
            );
          })}
        </table>
       
      </div>
    </>
  );
  
}
