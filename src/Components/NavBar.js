import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
  var navigate = useNavigate();
  function popup(){ 
    var div = document.getElementById("popup");
    div.style.display = "block";
  }

  var loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
  var accountType = localStorage.getItem("accountType");

  function logout(){
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("firstName");
    localStorage.removeItem("accountType");
    localStorage.removeItem("userId");
    navigate("/");
    
  }
  return (
      <div className="top-header-area" id="sticker">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 text-center">
              <div className="main-menu-wrap">
                <nav className="main-menu text-center">
                  <ul className="text-center">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    {/* <li>
                      <a href="#">Review Orders</a>
                      <ul className="sub-menu">
                        <li>
                          <a href="smash-cake-details.php">Smash Cake Orders</a>
                        </li>
                        <li>
                          <a href="sponge-cake-details.php">
                            Spong Cake Orders
                          </a>
                        </li>
                      </ul>
                    </li> */} 
                    
                    <li>
                      <Link to="/allCakes">All Cakes</Link>
                    </li>
                    {accountType === "seller"?
                    <>
                      <li>
                        <Link to="/addCakes">Add Cake</Link>
                      </li>
                    </>:
                    null}

                    {accountType === "seller"?
                    <>
                      <li>
                        <Link to="/myorders">My Orders</Link>
                      </li>
                    </>:
                    null}

                    {accountType === "seller"?
                    <>
                      <li>
                        <Link to="/myCakes">My Cakes</Link>
                      </li>
                    </>:
                    null}

                    {accountType === "seller"?
                    <>
                      <li>
                        <Link to="/wallet">Wallet</Link>
                      </li>
                    </>:
                    null}
                    
                    {accountType === "customer"?
                    <>
                      <li>
                        <Link to="/customerorders">My Orders</Link>
                      </li>
                    </>:
                    null}
                    
                    

                   
                    <li>
                      <div className="header-icons">
                        <Link className="mobile-hide search-bar-icon" onClick={popup}>
                          <i className="fas fa-search"></i>
                        </Link>
                        {loginStatus !== true?
                        <>

                          <Link className="shopping-cart" to="/signup">
                            <i className="fas fa-user" style={{paddingRight: "5px"}}></i> Signup/ Signin
                          </Link>

                        </>: 
                        
                        <>
                        <Link className="shopping-cart" to="/">
                          <i className="fas fa-user" style={{paddingRight: "5px"}}></i> Welcome {localStorage.getItem("firstName")}
                        </Link>
                        </>}
                        
                        
                        {/* <button onClick={popup}>
                        <i className="fas fa-search"></i>
                        </button> */}
                        {loginStatus === true?
                        <>
                          <button className="logout-btn" onClick={logout}><i class="fas fa-door-open"></i> Logout</button>
                        </>: null}
                      </div>
                    </li>
                  </ul>
                </nav>
                <Link className="mobile-show search-bar-icon">
                  <i className="fas fa-search"></i>
                </Link>
                <div className="mobile-menu"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="popup" id="popup">
          <h1>Search</h1>
          <input type="text" placeholder="Search"/>
        </div>
      </div>
  );
}
