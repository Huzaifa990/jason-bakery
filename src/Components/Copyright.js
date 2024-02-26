import React from 'react'
import {Link} from 'react-router-dom';

export default function Copyright() {
  return (
    <div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <p style={{color: "#F28123", fontWeight: "bold"}}>
                Copyrights &copy; 2024 -{" "}
                {/* <Link to="https://imransdesign.com/">Imran Hossain</Link>, All */}
                All Rights Reserved.
              </p>
            </div>
            <div className="col-lg-6 text-right col-md-12">
              <div className="social-icons">
                <ul>
                  <li>
                    <Link to="#" target="_blank">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" target="_blank">
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" target="_blank">
                      <i className="fab fa-instagram"></i>
                    </Link>
                 </li>
                  <li>
                    <Link to="#" target="_blank">
                      <i className="fab fa-linkedin"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#" target="_blank">
                      <i className="fab fa-dribbble"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
