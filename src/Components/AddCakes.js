import React, { useState } from "react";
import axios from "axios";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useNavigate } from "react-router-dom";

export default function AddCakes() {
  var [cakeImages, setCakeImages] = useState([]);
  var navigate = useNavigate();

  var accountType = localStorage.getItem("accountType");
  if(accountType !== "seller" || accountType === null){
    navigate("/");
  }

  function readFile(e) {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      (function (file) {
        var reader = new FileReader();
        reader.onload = () => {
          setCakeImages(cakeImages.concat(reader.result));
        };
        reader.readAsDataURL(file);
      })(files[i]);
    }
  }

  function addData() {
    var cakeName = document.getElementById("cakeName").value;
    var type = document.getElementById("cakeType");
    var cakeType = type[type.selectedIndex].value;
    var price = document.getElementById("price").value;
    var sellerId = localStorage.getItem("userId");

    var payload = {
      cakeName,
      cakeType,
      cakeImages,
      price,
      sellerId
    };

    axios
      .post("https://bakery-backend-0taa.onrender.com/cakes", payload)
      .then((res) => {
        NotificationManager.success("Cake Uploaded!");
        navigate("/allcakes");
        console.log(res);
      })
      .catch((e) => {
        NotificationManager.error("Something went wrong!");
        console.log(e);
      });
  }

  return (
    
    <div className="form-container">
      <NotificationContainer/>
      <h1>Add Cake Details: </h1>
      <input
        type="text"
        name="cakeName"
        id="cakeName"
        placeholder="CAKE NAME: "
      />
      <br /> <br />
      <select id="cakeType" name="cakeType">
        <option value="default">CHOOSE A TYPE</option>
        <option value="smashCake">Smash Cake</option>
        <option value="spongCake">Spong Cake</option>
      </select>
      <br /> <br />
      <input type="number" name="price" id="price" placeholder="PRICE: " />
      <br /> <br />
      <input
        type="file"
        name="cakeImages"
        id="cakeImages"
        onChange={readFile}
        multiple
      />
      <div className="img-container">
        {cakeImages.map((item) => {
          return <img src={item} alt="cake" width={200} />;
        })}
      </div>
      <br /> <br />
      <button className="hero-btn" onClick={addData}>
        Add Cake
      </button>
    </div>
  );
}
