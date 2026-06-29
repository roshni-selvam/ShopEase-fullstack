import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";   
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Collection from "./components/Collection";
import Register from "./components/Register";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import Checkout from "./components/Checkout";
import Wishlist from "./components/Wishlist";
import { CartProvider } from "./components/CartContext";
import { WishlistProvider } from "./components/WishlistContext";  // ← add
import ProductDetail from "./components/ProductDetail";
import AdminPanel from "./components/AdminPanel";
import MyOrder from "./components/MyOrder";


function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>          
          <Navbar search={search} setSearch={setSearch} />
         
          <Routes>
            <Route path="/" element={<><Hero /><About /><Collection /><Contact /></>} />
            <Route path="/shop/:category" element={<ProductList search={search} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/collections" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />  
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<AdminPanel/>}/>
            <Route path="/my-orders" element={<MyOrder />} />
            
          </Routes>
        </WishlistProvider>          
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;