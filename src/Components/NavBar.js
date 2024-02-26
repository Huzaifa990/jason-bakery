import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // function popup() {
  //   var div = document.getElementById("popup");
  //   div.style.display = "block";
  // }

  var loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
  var accountType = localStorage.getItem("accountType");

  function logout() {
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
               <ul className={`text-center ${isOpen ? "active" : ""}`}>
                 {/* Navigation links */}
                 <li>
                   <Link to="/">Home</Link>
                 </li>
                 <li>
                   <Link to="/allCakes">All Cakes</Link>
                 </li>
                 <li>
                   <Link to="/Contact">Contact</Link>
                 </li>
                 {/* Conditional navigation links */}
                 {accountType === "seller" && (
                   <>
                     <li>
                       <Link to="/addCakes">Add Cake</Link>
                     </li>
                     <li>
                       <Link to="/myorders">My Orders</Link>
                     </li>
                     <li>
                       <Link to="/myCakes">My Cakes</Link>
                     </li>
                     <li>
                       <Link to="/wallet">Wallet</Link>
                     </li>
                   </>
                 )}
                 {accountType === "customer" && (
                   <li>
                     <Link to="/customerorders">My Orders</Link>
                   </li>
                 )}
                 {/* User authentication buttons */}
                 <li>
                   <div className="header-icons">
                     {loginStatus !== true ? (
                       <Link className="shopping-cart" to="/signup">
                         <i
                           className="fas fa-user"
                           style={{ paddingRight: "5px" }}
                         ></i>{" "}
                         Signup/ Signin
                       </Link>
                     ) : (
                       <Link className="shopping-cart" to="/">
                         <i
                           className="fas fa-user"
                           style={{ paddingRight: "5px" }}
                         ></i>{" "}
                         Welcome {localStorage.getItem("firstName")}
                       </Link>
                     )}

                     {/* Logout button */}
                     {loginStatus === true ? (
                       <button className="logout-btn" onClick={logout}>
                         <i className="fas fa-door-open"></i> Logout
                       </button>
                     ) : null}
                   </div>
                 </li>
               </ul>
             </nav>
             {/* Mobile menu */}
             <Link className="mobile-show search-bar-icon">
               <i className="fas fa-search"></i>
             </Link>
             <div className="mobile-menu" onClick={toggleMenu}>
               {/* Hamburger icon or close icon */}
               <div className={`hamburger ${isOpen ? "open" : ""}`}>
                 {!isOpen ? (
                   <>
                     <div className="line"></div>
                     <div className="line"></div>
                     <div className="line"></div>
                   </>
                 ) : (
                   <i className="fas fa-times"></i>
                 )}
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>

     {/* Search popup */}
     <div className="popup" id="popup">
       <h1>Search</h1>
       <input type="text" placeholder="Search" />
     </div>
   </div>
 );

}
