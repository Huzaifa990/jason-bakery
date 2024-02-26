import axios from "axios";
import React, { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




export default function Signup() {
  let navigate = useNavigate();
    var [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      accountType: ''
    })

    var [confirmPassword, setConfirmPassword] = useState('');

    const handleChange = (event)=>{
      const {name, value} = event.target;
      setFormData({ ...formData, [name]: value });
    }

    function createAccount(){
        

        if(formData.password === confirmPassword){
            axios.post("https://bakery-backend-0taa.onrender.com/signup", formData).then(()=>{
                NotificationManager.success("Signup Successful!");
                 navigate("/signin");
            }).catch((e)=>{
              NotificationManager.error("Signup Failed!");
                console.log(e);
            })
        }
        else{
            NotificationManager.error("Passwords do not match!");
        }
    }

  return (
    
    <div>
      <NotificationContainer/>
      <div className="form-container signup-form">
        <h1>SIGN UP </h1>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="FIRST NAME: "
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="LAST NAME: "
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <input type="email" name="email" id="email" placeholder="EMAIL: " onChange={handleChange}/>

          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="PHONE NUMBER: "
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="PASSWORD: "
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="CONFIRM PASSWORD: "
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <br/> 

        <select id="accountType" value={formData.accountType} onChange={handleChange} name="accountType" style={{width: "100%"}}>
          <option value="default">CHOOSE A TYPE</option>
          <option value="customer">CUSTOMER</option>
          <option value="seller">SELLER</option>
        </select>
        <br /> <br />
        <button className="hero-btn" onClick={createAccount}>Register</button>
        <br/> <br/>
        <Link to="/signin" style={{color: "white", textDecoration: "underline", fontSize: "18px"}}> Already have an account? </Link>
      </div>
    </div>
  );
}
