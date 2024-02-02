import './App.css';
import "./bootstrap.min.css"
import NavBar from './Components/NavBar';
import Header from './Components/Header';
import Features from './Components/Features';
import Testimnonial from './Components/Testimnonial';
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
import CustomerOrder from './Components/CustomerOrder';
import MyCakes from './Components/MyCakes';
import Wallet from './Components/Wallet';
import Stripe from './Components/Stripe/Stripe';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<> <NavBar/> <Header/> <Features/> <Testimnonial/> <Footer/> </>}/>
          <Route path='/addCakes' element={<> <NavBar/> <SubHeader headerName = "Add Cake"/> <AddCakes/><Footer/>  </>}/>
          <Route path='/allCakes' element={<> <NavBar/> <SubHeader headerName = "Cakes"/> <AllCakes/> <Footer/> </>}/>
          <Route path='/editCakes' element={<> <NavBar/> <SubHeader headerName = "Edit Cake"/> <EditCake/> <Footer/> </>}/>
          <Route path='/orderCakes' element={<> <NavBar/> <SubHeader headerName = "Order Cakes"/> <OrderCakes/> <Footer/> </>}/>
          <Route path='/myorders' element={<> <NavBar/> <SubHeader headerName = "My Orders"/> <MyOrders/> <Footer/> </>}/>
          <Route path='/signup' element={<> <NavBar/> <SubHeader headerName = "Create An Account"/> <Signup/> <Footer/> </>}/>
          <Route path='/signin' element={<> <NavBar/> <SubHeader headerName = "Sign in"/> <Signin/> <Footer/> </>}/>
          <Route path='/customerorders' element={<> <NavBar/> <SubHeader headerName = "My Orders"/> <CustomerOrder/> <Footer/> </>}/>
          <Route path='/myCakes' element={<> <NavBar/> <SubHeader headerName = "My Cakes"/> <MyCakes/> <Footer/> </>}/>
          <Route path='/wallet' element={<> <NavBar/> <SubHeader headerName = "My Wallet"/> <Wallet/> <Footer/> </>}/>
          <Route path='/payment' element={<Stripe/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
