import React from "react";
import Slider from "react-slick";
import avatar1 from "../img/avaters/avatar1.png";
import avatar2 from "../img/avaters/avatar2.png";
import avatar3 from "../img/avaters/avatar3.png";
import avatar4 from "../img/avaters/avatar4.png";

const TestimonialSlider = () => {
  const testimonialData = [
    {
      name: "Saira Hakim",
      position: "Local shop owner",
      content:
        "I recently ordered a cake from Sweet Tooth Bakery for my daughter's birthday, and I was blown away by the quality and taste! Not only was the cake beautifully decorated, but it also tasted absolutely delicious. It was moist, flavorful, and had just the right amount of sweetness. The entire process, from placing the order to delivery, was seamless and stress-free. Sweet Tooth Bakery truly exceeded my expectations, and I can't wait to order from them again for our next celebration!",
      avatar: avatar1,
    },
    {
      name: "John Smith",
      position: "Artiest",
      content:
        "I've been a loyal customer of Sweet Tooth Bakery for years, and for good reason! Their cakes are consistently amazing, and their customer service is second to none. Whether I'm ordering a cake for a special occasion or just treating myself to a sweet indulgence, I know I can always count on Sweet Tooth Bakery to deliver. Their attention to detail and dedication to quality truly sets them apart. I highly recommend Sweet Tooth Bakery to anyone looking for a delicious and memorable dessert experience!",
      avatar: avatar2,
    },
    {
      name: "Peter Jones",
      position: "Designer",
      content:
        "I recently hosted a party and ordered a custom cake from Sweet Tooth Bakery, and it was the highlight of the event! Not only did the cake look stunning, but it also tasted incredible. My guests couldn't stop raving about how delicious it was! What I appreciated most was the personalized service I received from the team at Sweet Tooth Bakery. They listened to my ideas and preferences and created a cake that exceeded my expectations in every way. I'm so grateful for their expertise and professionalism. Thank you, Sweet Tooth Bakery, for making my event truly special!",
      avatar: avatar3,
    },
    {
      name: "Lucy Porter",
      position: "Developer",
      content:
        "I stumbled upon Sweet Tooth Bakery while searching for a last-minute birthday cake, and I'm so glad I did! Not only did they have a wide selection of cakes to choose from, but their website made it easy to place my order quickly and efficiently. When I picked up the cake, I was pleasantly surprised by how beautiful it looked. But the real treat was when I tasted it – it was absolutely delicious! Moist, flavorful, and perfectly sweet. It was a hit with everyone at the party! Sweet Tooth Bakery saved the day, and I'll definitely be ordering from them again in the future.",
      avatar: avatar4,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="testimonail-section mt-150 mb-150">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1 text-center">
            <div className="testimonial-sliders">
              <Slider {...settings}>
                {testimonialData.map((testimonial, index) => (
                  <div key={index}>
                    <div className="single-testimonial-slider">
                      <div className="client-avatar avater">
                        <img src={testimonial.avatar} alt="avatar" />
                      </div>
                      <div className="client-meta">
                        <h3>
                          {testimonial.name} <span>{testimonial.position}</span>
                        </h3>
                        <p className="testimonial-body">
                          {testimonial.content}
                        </p>
                        <div className="last-icon">
                          <i className="fas fa-quote-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
