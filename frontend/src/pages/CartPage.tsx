import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../assets/cart.css';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    state, 
    removeFromCart, 
    updateQuantity, 
    removeFromSaved, 
    moveToCart,
    applyDiscount,
    clearCart,
    getTotalItems,
    getSubtotal,
    getTotal
  } = useCart();
  const [discountInput, setDiscountInput] = useState('');
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleQuantityChange = (id: string, delta: number) => {
    console.log(id)
    const item = state.items.find((item: any) => item.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity >= 1) {
        updateQuantity(id, newQuantity);
      }
    }
  };

  const handleQuantityInput = (id: string, value: string) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity >= 1) {
      updateQuantity(id, quantity);
    }
  };

  const handleApplyDiscount = () => {
    if (discountInput.trim()) {
      applyDiscount(discountInput.trim().toUpperCase());
      setDiscountInput('');
    }
  };

  const handleCheckout = () => {
    if (state.items.length === 0) return;
    
    setIsCheckoutLoading(true);
    
    // Simulate checkout process
    setTimeout(() => {
      alert('Checkout successful! In a real application, this would redirect to payment processing.');
      clearCart();
      setIsCheckoutLoading(false);
      navigate('/');
    }, 1500);
  };

  const handleRemoveItem = (id: string) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(id);
    }
  };

  const handleRemoveSavedItem = (id: string) => {
    if (window.confirm('Remove this item from your saved items?')) {
      removeFromSaved(id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const subtotal = getSubtotal();
  const discountAmount = subtotal * state.discountAmount;
  const taxAmount = (subtotal - discountAmount) * state.taxRate;
  const shippingCost = subtotal > 100 ? 0 : state.shippingCost;
  const total = getTotal();
  console.log(state)
  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Cart Header */}
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>Review your items and proceed to checkout</p>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '15px',
            color: 'var(--color-text-light)',
            fontSize: '1.1rem'
          }}>
            <span><i className="fas fa-shopping-cart"></i> {getTotalItems()} items</span>
            <span>•</span>
            <span><i className="fas fa-dollar-sign"></i> {formatPrice(total)} total</span>
          </div>
        </div>

        {/* Cart Content */}
        {state.items.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart"></i>
            <h3>Your Cart is Empty</h3>
            <p>Add some products to your cart and they will appear here</p>
            <Link to="/products" className="btn" style={{ 
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
              color: 'white',
              textDecoration: 'none'
            }}>
              <i className="fas fa-store"></i> Browse Products
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items">
              <h2 className="cart-section-title">Your Items ({state.items.length})</h2>
              
              {state.items.map((item: any) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.images[0]} alt={item.name} />
                    <div className="product-type-badge">
                      <i className={`fas ${item.type === '3d-model' ? 'fa-cube' : 'fa-box'}`}></i>
                      {item.type === '3d-model' ? '3D Model' : 'Physical'}
                    </div>
                  </div>
                  
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <span className="cart-item-category">{item.category}</span>
                    <p className="cart-item-description">{item.description}</p>
                    
                    {item.type === '3d-model' && (
                      <div style={{ 
                        display: 'flex', 
                        gap: '15px', 
                        marginTop: '10px',
                        flexWrap: 'wrap'
                      }}>
                        {item.fileFormat && (
                          <span style={{ 
                            color: 'var(--color-primary)', 
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <i className="fas fa-file"></i> {item.fileFormat}
                          </span>
                        )}
                        {item.fileSize && (
                          <span style={{ 
                            color: 'var(--color-primary)', 
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <i className="fas fa-database"></i> {item.fileSize}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      
                      <input
                        type="number"
                        className="quantity-input"
                        value={item.quantity}
                        onChange={(e) => handleQuantityInput(item.id, e.target.value)}
                        min="1"
                      />
                      
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    
                    <div className="cart-item-price">
                      <div className="unit-price">{formatPrice(item.price)} each</div>
                      <div className="total-price">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                    
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <i className="fas fa-trash"></i> Remove
                    </button>
                  </div>
                </div>
              ))}
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                marginTop: '30px'
              }}>
                <button 
                  className="remove-btn"
                  onClick={() => {
                    if (window.confirm('Clear all items from your cart?')) {
                      clearCart();
                    }
                  }}
                  style={{ padding: '12px 30px' }}
                >
                  <i className="fas fa-trash-alt"></i> Clear Cart
                </button>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="cart-summary">
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="summary-items">
                <div className="summary-row">
                  <span className="summary-label">Subtotal ({getTotalItems()} items)</span>
                  <span className="summary-value">{formatPrice(subtotal)}</span>
                </div>
                
                {state.discountAmount > 0 && (
                  <div className="summary-row">
                    <span className="summary-label">Discount ({state.discountCode})</span>
                    <span className="summary-value" style={{ color: '#4CAF50' }}>
                      -{formatPrice(discountAmount)}
                    </span>
                  </div>
                )}
                
                <div className="summary-row">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-value">
                    {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                  </span>
                </div>
                
                <div className="summary-row">
                  <span className="summary-label">Tax ({state.taxRate * 100}%)</span>
                  <span className="summary-value">{formatPrice(taxAmount)}</span>
                </div>
              </div>
              
              <div className="summary-total">
                <span className="total-label">Total</span>
                <span className="total-amount">{formatPrice(total)}</span>
              </div>
              
              {/* Discount Code */}
              <div className="discount-section">
                <div className="discount-title">
                  <i className="fas fa-tag"></i>
                  Discount Code
                </div>
                <div className="discount-input-group">
                  <input
                    type="text"
                    className="discount-input"
                    placeholder="Enter discount code"
                    value={discountInput}
                    onChange={(e) => setDiscountInput(e.target.value)}
                  />
                  <button 
                    className="apply-discount-btn"
                    onClick={handleApplyDiscount}
                  >
                    Apply
                  </button>
                </div>
                {state.discountAmount === 0 && state.discountCode && (
                  <div style={{ 
                    color: '#ff4757', 
                    fontSize: '0.85rem', 
                    marginTop: '8px' 
                  }}>
                    Invalid discount code
                  </div>
                )}
                {state.discountAmount > 0 && (
                  <div style={{ 
                    color: '#4CAF50', 
                    fontSize: '0.85rem', 
                    marginTop: '8px' 
                  }}>
                    {state.discountCode} applied ({state.discountAmount * 100}% off)
                  </div>
                )}
              </div>
              
              {/* Checkout Button */}
              {/* <button 
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={isCheckoutLoading}
              >
                {isCheckoutLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock"></i>
                    Proceed to Checkout
                  </>
                )}
              </button> */}
              
              <Link 
                to="/checkout"
                className="checkout-btn"
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <i className="fas fa-lock"></i>
                Proceed to Checkout
              </Link>
              {/* Continue Shopping */}
              <div className="continue-shopping">
                <Link to="/products">
                  <i className="fas fa-arrow-left"></i>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {/* Saved Items */}
        {state.savedItems.length > 0 && (
          <div className="saved-items-section">
            <h2 className="cart-section-title">Saved for Later ({state.savedItems.length})</h2>
            <p style={{ color: 'var(--color-text-light)', marginBottom: '20px' }}>
              Items you've saved for later purchase
            </p>
            
            <div className="saved-items-grid">
              {state.savedItems.map((item: any) => (
                <div key={item.id} className="saved-item">
                  <div className="saved-item-image">
                    <img src={item.images[0]} alt={item.name} />
                  </div>
                  
                  <div className="saved-item-info">
                    <h4>{item.name}</h4>
                    <span style={{ 
                      display: 'inline-block',
                      color: 'var(--color-primary)',
                      fontSize: '0.85rem',
                      marginBottom: '10px'
                    }}>
                      {item.category}
                    </span>
                    <div className="saved-item-price">{formatPrice(item.price)}</div>
                    
                    <div className="saved-item-actions">
                      <button 
                        className="saved-item-btn move-to-cart-btn"
                        onClick={() => moveToCart(item)}
                      >
                        <i className="fas fa-cart-plus"></i> Add to Cart
                      </button>
                      
                      <button 
                        className="saved-item-btn remove-saved-btn"
                        onClick={() => handleRemoveSavedItem(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Additional Info */}
        <div style={{ 
          marginTop: '60px', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '30px'
        }}>
          <div style={{ 
            backgroundColor: 'var(--color-card)', 
            padding: '25px', 
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <i className="fas fa-shipping-fast" style={{ 
              fontSize: '2.5rem', 
              color: 'var(--color-primary)', 
              marginBottom: '15px' 
            }}></i>
            <h4 style={{ color: 'var(--color-accent)', marginBottom: '10px' }}>Free Shipping</h4>
            <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem' }}>
              Free standard shipping on orders over $100
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'var(--color-card)', 
            padding: '25px', 
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <i className="fas fa-shield-alt" style={{ 
              fontSize: '2.5rem', 
              color: 'var(--color-primary)', 
              marginBottom: '15px' 
            }}></i>
            <h4 style={{ color: 'var(--color-accent)', marginBottom: '10px' }}>Secure Payment</h4>
            <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem' }}>
              All transactions are secure and encrypted
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'var(--color-card)', 
            padding: '25px', 
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <i className="fas fa-undo" style={{ 
              fontSize: '2.5rem', 
              color: 'var(--color-primary)', 
              marginBottom: '15px' 
            }}></i>
            <h4 style={{ color: 'var(--color-accent)', marginBottom: '10px' }}>Easy Returns</h4>
            <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem' }}>
              30-day return policy on physical products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;