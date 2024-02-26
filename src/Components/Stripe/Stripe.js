import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";

import Checkout from "./Checkout";
import "./style.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51O9YFOHyOtnDQiYKScyPqF88CzaD6kFd4u9L6iriBXXofQNLl32Zyid3EPwpna8ZGtNYS9z3vMTUlBS77wjBy87j00odd8qXi2");

export default function Stripe() {
  const [clientSecret, setClientSecret] = useState("");
  const {amount} = useParams();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://bakery-backend-0taa.onrender.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({price: amount}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const appearance = {
    theme: 'night',
  };
  const options = {
    clientSecret,
    appearance,
  };


  return (
    <div className="stripe-container">
      <div className="App">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <Checkout amount={amount}/>
          </Elements>
        )}
      </div>
    </div>
  );
}