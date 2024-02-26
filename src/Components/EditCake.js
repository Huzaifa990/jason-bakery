import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useLocation } from "react-router-dom";

export default function EditCake() {
    var [images, setImages] = useState([]);
    var location = useLocation();
    var id = location.state.cakeId;
    console.log(id);

    useEffect(()=>{
      async function getData(){
        var response = await fetch("https://bakery-backend-0taa.onrender.com/cakes/"+id);
        var data = await response.json();
        console.log(data);
        document.getElementById("cakeName").value = data.cakeName;
        document.getElementById("cakeType").value = data.cakeType;
        document.getElementById("price").value = data.price;
        setImages(data.cakeImages);
      }

      getData();
    }, [id])

    function editCake(){
      var cakeName = document.getElementById("cakeName").value;
      var type = document.getElementById("cakeType");
      var cakeType = type[type.selectedIndex].value;
      var price = document.getElementById("price").value;
  
      var payload = {
        cakeName,
        cakeType,
        price,
        cakeImages: images
      };

      axios.put("https://bakery-backend-0taa.onrender.com/cakes/"+id, payload).then(()=>{
        NotificationManager.success("Information Updated!")
      }).catch((e)=>{
        console.log(e);

        NotificationManager.error("Something went wrong!");
      });
    }

    function readFile(e) {
      let files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        (function (file) {
          var reader = new FileReader();
          reader.onload = () => {
            setImages(images.concat(reader.result));
          };
          reader.readAsDataURL(file);
        })(files[i]);
      }
    }

  return (
    <div>
      <div className="form-container">
        <NotificationContainer />
        <h1>Edit Cake Details: </h1>
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
        <input type="file" name="cakeImages" id="cakeImages" multiple onChange={readFile}/>
        <br/>
        <div className="img-container">
          {images.map((item)=>{
            return(
              <div className="images-edit">
                <img src={item} alt="cake" width={200}/>
                <button onClick={()=> setImages(images.filter((e)=> e !== item ))}>Remove</button>
              </div>
            )
          })}
        </div>
        <br /> <br />
        <button className="hero-btn" onClick={editCake}>Edit Cake</button>
      </div>
    </div>
  );
}
