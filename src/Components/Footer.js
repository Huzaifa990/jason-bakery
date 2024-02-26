import React from 'react'
import { Link} from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <div className="footer-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-box about-widget">
                <h2 className="widget-title">About us</h2>
                <p>
                  Welcome to Sweet Tooth Bakery, where sweetness meets delight
                  in every bite! At Sweet Tooth Bakery, we're passionate about
                  crafting irresistible cakes that bring joy to every occasion.
                  From classic flavors to custom creations, our team of skilled
                  bakers and decorators pour their heart into every cake,
                  ensuring a delicious experience that leaves a lasting
                  impression. Join us at Sweet Tooth Bakery, where every slice
                  is a moment to savor and every celebration is made sweeter.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-box get-in-touch">
                <h2 className="widget-title">Get in Touch</h2>
                <ul>
                  <li>123, New Street, London, England.</li>
                  <li>support@sweettoothbakery.co.uk</li>
                  <li>+44 0208 123 456</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-box pages">
                <h2 className="widget-title">Pages</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/allcakes">Shop</Link>
                  </li>
                  <li>
                    <Link to="/Contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-box subscribe">
                <h2 className="widget-title">Subscribe</h2>
                <p>Subscribe to our mailing list to get the latest updates.</p>
                <form action="/">
                  <input type="email" placeholder="Email" />
                  <button type="submit">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
