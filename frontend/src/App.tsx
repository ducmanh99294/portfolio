import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Product2 from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import About from "./components/About";
import './assets/global.css';
import RegisterPage from "./pages/Register";

function App() {
  const location = useLocation();
  const noHeaderFooterPaths = ["/login", "/register"];
  const hideHeaderFooter = noHeaderFooterPaths.includes(location.pathname);

  return (
    <div className="App">
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<Product2 />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
