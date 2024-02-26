import React from 'react'
import { useState } from 'react';
import edit from "../img/icons8-edit-50.png"
import remove from "../img/icons8-delete-48.png"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    NotificationContainer,
    NotificationManager,
  } from "react-notifications";
  import "react-notifications/lib/notifications.css";
import axios from 'axios'

export default function MyCakes() {
    var sellerId = localStorage.getItem("userId");
    var [cakes, setCakes]=  useState([]);
    var navigate = useNavigate();

    useEffect(()=>{
        async function getData(){
            var response = await fetch("https://bakery-backend-0taa.onrender.com/myCakes/"+sellerId);
            var data = await response.json();
            console.log(data);
            setCakes(data);
        }

        getData();
    }, [sellerId])

    function editPage(id){
        navigate("/editCakes", {state: {cakeId: id}});
    }

    function deleteCake(id){
        axios.delete("https://bakery-backend-0taa.onrender.com/cakes/"+id).then(()=>{
            NotificationManager.success("Cake Deleted!");
          //  setTimeout(() => {
          //   window.location.reload();
          //  }, 2000);
           
        }).catch((e)=>{
            NotificationManager.error("Something went wrong!");
            console.log(e);
        })
    }


  return (
    <div>
      <div className='order-section'>
        <NotificationContainer/>
      {cakes.map((item)=>{
        return(
            <div className='cake-container'>
                <div className='order-img'>
                    <img src={item.cakeImages[0]} alt='cake'/>
                </div>

                <div className='customer-container'>
                    <h2>Cake <span className='heading-color'>Info</span>: </h2>
                    <p><b>Cake Name: </b> {item.cakeName}</p>
                    <p><b>Cake Type: </b> {item.cakeType}</p>
                    <p><b>Price: </b> ${item.price}</p>
                </div>

                <div className='order-container'>
                    <center><h2>Manage <span className='heading-color'>Cake</span>: </h2></center>
                    <br/> 
                    <div className='icons-container'>
                    <img src={edit} alt='edit' className='mycakes-icons' onClick={()=>editPage(item._id)}/>
                    <img src={remove} alt='edit' className='mycakes-icons' onClick={()=>deleteCake(item._id)}/>
                    </div>
                </div>
            </div>
        )
      })}
    </div>
    </div>
  )
}
