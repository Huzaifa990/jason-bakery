import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

export default function AllCakes() {

    var [cakes, setCakes] = useState([])
    var navigate = useNavigate();

    useEffect(()=>{
        async function getData(){
            var res = await fetch("http://localhost:8080/cakes")
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
        <h1>Fresh Cakes: </h1>

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
