import './App.css';
import "./bootstrap.min.css"
import NavBar from './Components/NavBar';
import Header from './Components/Header';
import Features from './Components/Features';
import Contact from "./Components/Contact";
import About from "./Components/About";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddCakes from './Components/AddCakes';
import SubHeader from './Components/SubHeader';
import AllCakes from './Components/AllCakes';
import EditCake from './Components/EditCake';
import OrderCakes from './Components/OrderCakes';
import MyOrders from './Components/MyOrders';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Footer from './Components/Footer';
import Copyright from "./Components/Copyright";
import CustomerOrder from './Components/CustomerOrder';
import MyCakes from './Components/MyCakes';
import Wallet from './Components/Wallet';
import Stripe from './Components/Stripe/Stripe';
import TopSelling from './Components/Top Selling/TopSelling';
import TestimonialSlider from './Components/TestimonialSlider';
import Confirmation from './Components/Confirmation';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <NavBar /> <Header /> <Features /> <TopSelling /> <TestimonialSlider /> <Footer />{" "}
                <Copyright />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                {" "}
                <NavBar /> <SubHeader headerName="Contact Us" /> <Contact />{" "}
                <Footer /> <Copyright />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                {" "}
                <NavBar /> <SubHeader headerName="About Us" /> <About />{" "}
                <Footer /> <Copyright />
              </>
            }
          />
          <Route
            path="/addCakes"
            element={
              <>
                {" "}
                <NavBar /> <SubHeader headerName="Add Cake" /> <AddCakes />
                <Footer /> <Copyright />
              </>
            }
          />
          <Route
            path="/allCakes"
            element={
              <>
                {" "}
                <NavBar /> <SubHeader headerName="Cakes" /> <AllCakes />{" "}
                <Footer /> <Copyright />{" "}
              </>
            }
          />
          <Route
            path="/editCakes"
            element={
              <>
                {" "}
                <NavBar /> <SubHeader headerName="Edit Cake" /> <EditCake />{" "}
                <Footer /> <Copyright />{" "}
              </>
            }
          />
          <Route
            path="/orderCakes"
            element={
              <>
                {" "}
                <NavBar /> <SubHeader headerName="Order Cakes" /> <OrderCakes />{" "}
                <Footer /> <Copyright />{" "}
              </>
            }
          />
          <Route
            path="/myorders"
            element={
              <>
                {" "}
                <NavBar /> <SubHeader headerName="My Orders" /> <MyOrders />{" "}
                <Footer /> <Copyright />{" "}
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                {" "}
                <NavBar /> <SubHeader headerName="Create An Account" />{" "}
                <Signup /> <Footer /> <Copyright />{" "}
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                {" "}
                <NavBar /> <SubHeader headerName="Sign in" /> <Signin />{" "}
                <Footer /> <Copyright />{" "}
              </>
            }
          />
          <Route
            path="/customerorders"
            element={
              <>
                {" "}
                <NavBar /> <SubHeader headerName="My Orders" />{" "}
                <CustomerOrder /> <Footer /> <Copyright />{" "}
              </>
            }
          />
          <Route
            path="/myCakes"
            element={
              <>
                {" "}
                <NavBar /> <SubHeader headerName="My Cakes" /> <MyCakes />{" "}
                <Footer /> <Copyright />{" "}
              </>
            }
          />
          <Route
            path="/wallet"
            element={
              <>
                {" "}
                <NavBar /> <SubHeader headerName="My Wallet" /> <Wallet />{" "}
                <Footer /> <Copyright />{" "}
              </>
            }
          />
          <Route path="/payment/:orderId/:amount" element={<Stripe />} />
          <Route
           path="/confirmation/:orderId"
            element={
              <>
                {" "}
                <NavBar /> <SubHeader headerName="Order Confirmed" /> <Confirmation />{" "}
                <Footer /> <Copyright />{" "}
              </>
            }
          />
  
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
