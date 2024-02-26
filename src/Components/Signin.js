import axios from "axios";
import React, { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  var [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  var navigate = useNavigate();
  function login() {
    axios
      .post("https://bakery-backend-0taa.onrender.com/signin", formData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("accountType", res.data.accountType);
        localStorage.setItem("firstName", res.data.firstName);
        localStorage.setItem("userId", res.data._id);
        localStorage.setItem("loginStatus", true);
        navigate("/");
        NotificationManager.success("Login Successful!");
      })
      .catch((e) => {
        NotificationManager.error("Login Failed!");
        console.log(e);
      });
  }

  return (
    <div>
      <NotificationContainer />
      <div className="form-container signup-form">
        <h1>SIGN IN </h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="EMAIL: "
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="PASSWORD: "
          onChange={handleChange}
        />
        <br />
        <br />
        <button className="hero-btn" onClick={login}>
          Login
        </button>
        <br /> <br />
        <Link
          to="/signup"
          style={{
            color: "white",
            textDecoration: "underline",
            fontSize: "18px",
          }}
        >
          {" "}
          Create an account{" "}
        </Link>
      </div>
    </div>
  );
}
