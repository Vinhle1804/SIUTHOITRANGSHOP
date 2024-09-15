import { Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import Test from "./pages/test.jsx";
import Test2 from "./pages/test2.jsx";
import Test3 from "./pages/test3.jsx";
import Nam from "./pages/nam.jsx";
import Nu from "./pages/nu.jsx";
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import ProductDetail from "./pages/productDetail.jsx";
import Checkout from "./pages/checkout.jsx";

function App() {
  return (
    <Routes>
      <Route path="/test" element={<Test/>} />
      <Route path="/test2" element={<Test2/>} />
      <Route path="/test3" element={<Test3/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      
      <Route path="/" element={<Home/>} />
      <Route path="/nam"element={<Nam/>}/>
      <Route path="/nu" element={<Nu/>}/>
      <Route path="/new"/>
      <Route path="/hot"/>
      <Route path="/product/:id" element={<ProductDetail />} /> 
      <Route path="/checkout" element={<Checkout/>} /> 
      
      
    </Routes>
  );
}

export default App;
