import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet';

export default function AllCakes() {

    var [cakes, setCakes] = useState([])
    var navigate = useNavigate();

    useEffect(()=>{
        async function getData(){
            var res = await fetch("https://bakery-backend-0taa.onrender.com/cakes")
            var data = await res.json()
            console.log(data);
            setCakes(data);
        }

        getData();
    }, [])


    function orderCake(id){
        navigate("/orderCakes", {state: {cakeId: id}});
    }
  return (
    <div className='main-cake'>
     <Helmet>
        <title>All Cakes</title>
        <meta name="description" content='This page show all cakes for Sweet Tooth Bakery.' />
        <meta name="keywords" content='choclate cake, sweet cake, sponge cake, unicorn cake' />
     </Helmet>
        <h2>Fresh Cakes: </h2>

        <div className='cakeContainer'>
            {cakes.map((item)=>{
                return(
                    <div className='cake'>
                        <img src={item.cakeImages[0]} alt="cake"/>
                        <h1>{item.cakeName}</h1>
                        <p>Cake Type: {item.cakeType}</p>
                        <div className='btns-cont'>
                            <button className='hero-btn cake-btn' onClick={()=>orderCake(item._id)}>${item.price}</button>
                        </div>
                    </div>
                )
            })}
        </div>
      
    </div>
  )
}
