import React, { useState } from 'react';
import '../assets/header.css';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useCart } from '../context/CartContext';
import { getMe } from '../api/userApi';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleCheckLogin = async () => {
     try {
      await getMe();
    } catch {
      navigate("/login", {
        state: { redirectTo: window.location.pathname },
      });
    }
  };  
  const totalItems = getTotalItems();
  
  return (
    <header className="header">
      <div className="container header-container">
        <HashLink smooth to="/#" className="logo">
          3D<span>Arch</span>
        </HashLink>

        <div className="menu-toggle" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>

        <nav className={isMenuOpen ? 'active' : ''}>
          <ul>
            <li><HashLink smooth to="/#" onClick={closeMenu}>Home</HashLink></li>
            <li><HashLink smooth to="/products" onClick={closeMenu}>Products</HashLink></li>
            <li><HashLink smooth to="/#contact" onClick={closeMenu}>Contact</HashLink></li>

            <li>
              <Link
                  to="/cart"
                  onClick={() => {
                    closeMenu();
                    handleCheckLogin();
                  }}
                  className="cart-link"
                >
                <i className="fas fa-shopping-cart"></i>
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
