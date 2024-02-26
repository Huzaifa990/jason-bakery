import React, { useEffect } from 'react'
import Tick from '../img/tick.png';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Confirmation() {
  const {orderId} = useParams();

  useEffect(() => {
    async function updateOrder() {
        axios.put("https://bakery-backend-0taa.onrender.com/orderStatus/"+orderId, {paymentStatus: true}).then(() => {

        }).catch((e) => {
             console.log(e);
        })
       
    }
    updateOrder();
  },[orderId])
  return (
    <div>
        <center>
            <img src={Tick} alt='tick' />
            <h1>Thank you for placing your order!</h1>
            <h3>Order has been successful.</h3>
        </center>
      
    </div>
  )
}
