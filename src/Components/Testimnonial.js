import React from 'react'
import avatar1 from "../img/avaters/avatar1.png";



export default function Testimnonial() {
  return (
    <div>
      <div className="testimonail-section mt-150 mb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-10 offset-lg-1 text-center">
					<div className="testimonial-sliders">
						<div className="single-testimonial-slider">
							<div className="client-avater">
								<img src={avatar1} alt="avatars"/>
							</div>
							<div className="client-meta">
								<h3>Saira Hakim <span>Local shop owner</span></h3>
								<p className="testimonial-body">
									"Sed ut perspiciatis unde omnis iste natus error veritatis et quasi architecto beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"
								</p>
								<div className="last-icon">
									<i className="fas fa-quote-right"></i>
								</div>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
    </div>
  )
}
