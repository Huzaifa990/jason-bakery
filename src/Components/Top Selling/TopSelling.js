import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

import "./styles.css";

// import required modules
import { EffectCoverflow } from "swiper/modules";
import { useNavigate } from 'react-router-dom';

export default function TopSelling() {

    const [cakes, setCakes] = useState([]);
    const naviagate = useNavigate();

   const handleApiData = async () => {
    const response = await fetch("https://bakery-backend-0taa.onrender.com/topselling");
    const data = await response.json();
    console.log(data);
    setCakes(data);
   }

   useEffect(() => {
    handleApiData();
   }, [])

   function orderCake(id) {
    naviagate("/orderCakes", {state: {cakeId: id}});
   }


  return (
    <div className="top-selling-container">
      <div className="swiper-container">
        <h1>Top Selling Cakes</h1>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          initialSlide={2}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow]}
          className="mySwiper"
        >
          {cakes.map((item) => {
            return (
              <SwiperSlide>
                <div className="cake">
                  <img src={item?.cakeImages[0]} alt="cakes" />
                  <h1>{item.cakeName}</h1>
                  <p>Cake Type: {item.cakeType}</p>
                  <div className="btns-cont">
                    <button
                      className="hero-btn cake-btn"
                      onClick={() => orderCake(item._id)}
                    >
                      ${item.price}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
         
          
        </Swiper>
      </div>
    </div>
  );
}
