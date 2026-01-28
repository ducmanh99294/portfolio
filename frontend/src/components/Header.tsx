import React, { useState } from 'react';
import '../assets/header.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart(); // ✅ LẤY TỪ CONTEXT

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const totalItems = getTotalItems(); // ✅ reactive

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
              <Link to="/cart" onClick={closeMenu} className="cart-link">
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
