import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../assets/checkout.css';
import {FormErrors,PaymentInfo,ShippingAddress} from '../types/checkout';
import { create } from 'domain';
import { createOrder } from '../api/checkoutApi';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, clearCart, getSubtotal, getTotal } = useCart();
  
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'paypal' | 'bank-transfer'>('credit-card');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  
  const subtotal = getSubtotal();
  const discountAmount = subtotal * state.discountAmount;
  const taxAmount = (subtotal - discountAmount) * state.taxRate;
  const shippingCost = subtotal > 100 ? 0 : state.shippingCost;
  const total = getTotal();
  
  // Generate order number on mount
  useEffect(() => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(`ORD-${randomNum}`);
  }, []);
  
  const validateShippingForm = () => {
    const errors: FormErrors = {};
    
    if (!shippingAddress.firstName.trim()) errors.firstName = 'First name is required';
    if (!shippingAddress.lastName.trim()) errors.lastName = 'Last name is required';
    if (!shippingAddress.email.trim()) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(shippingAddress.email)) errors.email = 'Email is invalid';
    if (!shippingAddress.phone.trim()) errors.phone = 'Phone number is required';
    if (!shippingAddress.address.trim()) errors.address = 'Address is required';
    if (!shippingAddress.city.trim()) errors.city = 'City is required';
    if (!shippingAddress.state.trim()) errors.state = 'State is required';
    if (!shippingAddress.zipCode.trim()) errors.zipCode = 'ZIP code is required';
    if (!shippingAddress.country.trim()) errors.country = 'Country is required';
    
    return errors;
  };
  
  const validatePaymentForm = () => {
    const errors: FormErrors = {};
    
    if (paymentMethod === 'credit-card') {
      if (!paymentInfo.cardNumber.trim()) errors.cardNumber = 'Card number is required';
      if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) errors.cardNumber = 'Card number must be 16 digits';
      if (!paymentInfo.cardName.trim()) errors.cardName = 'Name on card is required';
      if (!paymentInfo.expiryDate.trim()) errors.expiryDate = 'Expiry date is required';
      if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) errors.expiryDate = 'Format: MM/YY';
      if (!paymentInfo.cvv.trim()) errors.cvv = 'CVV is required';
      if (!/^\d{3,4}$/.test(paymentInfo.cvv)) errors.cvv = 'CVV must be 3-4 digits';
    }
    
    return errors;
  };
  
  const handleNextStep = () => {
    if (step === 'shipping') {
      const errors = validateShippingForm();
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setStep('payment');
      setFormErrors({});
    } else if (step === 'payment') {
      const errors = validatePaymentForm();
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      if (!acceptedTerms) {
        alert('Please accept the terms and conditions to proceed');
        return;
      }
      setStep('review');
      setFormErrors({});
    }
  };
  
  const handlePrevStep = () => {
    if (step === 'payment') {
      setStep('shipping');
    } else if (step === 'review') {
      setStep('payment');
    }
  };
  
  const handlePlaceOrder = async () => {
    try {
      setIsLoading(true);
      await createOrder(shippingAddress)
      setIsLoading(false);
      setShowSuccessModal(true);     
    } catch (e) {
      console.log(e)
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('shipping.')) {
      const field = name.split('.')[1];
      setShippingAddress(prev => ({
        ...prev,
        [field]: value
      }));
    } else if (name.startsWith('payment.')) {
      const field = name.split('.')[1];
      setPaymentInfo(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.substring(0, 16);
    
    // Format with spaces
    const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
    setPaymentInfo(prev => ({ ...prev, cardNumber: formatted }));
    
    if (formErrors.cardNumber) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.cardNumber;
        return newErrors;
      });
    }
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.substring(0, 4);
    
    // Format as MM/YY
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    
    setPaymentInfo(prev => ({ ...prev, expiryDate: value }));
    
    if (formErrors.expiryDate) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.expiryDate;
        return newErrors;
      });
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  const getMaskedCardNumber = () => {
    const lastFour = paymentInfo.cardNumber.replace(/\s/g, '').slice(-4);
    return `**** **** **** ${lastFour}`;
  };
  
  if (state.items.length === 0 && !showSuccessModal) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <i className="fas fa-shopping-cart" style={{ fontSize: '4rem', color: 'var(--color-primary)', marginBottom: '20px' }}></i>
            <h3 style={{ color: 'var(--color-accent)', marginBottom: '15px' }}>Your Cart is Empty</h3>
            <p style={{ color: 'var(--color-text-light)', marginBottom: '30px' }}>Add items to your cart before proceeding to checkout.</p>
            <button 
              onClick={() => navigate('/3d-products')}
              className="place-order-btn"
              style={{ maxWidth: '200px', margin: '0 auto' }}
            >
              <i className="fas fa-store"></i> Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="checkout-page">
      
      <div className="checkout-container">
        {/* Checkout Header with Steps */}
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your purchase in three simple steps</p>
          
          <div className="checkout-steps">
            <div className={`step ${step === 'shipping' ? 'active' : 'completed'}`}>
              <div className="step-circle">
                {step === 'shipping' ? <span>1</span> : <i className="fas fa-check"></i>}
              </div>
              <span className="step-label">Shipping</span>
            </div>
            
            <div className="step-connector"></div>
            
            <div className={`step ${step === 'payment' ? 'active' : step === 'review' ? 'completed' : ''}`}>
              <div className="step-circle">
                {step === 'payment' ? <span>2</span> : step === 'review' ? <i className="fas fa-check"></i> : <span>2</span>}
              </div>
              <span className="step-label">Payment</span>
            </div>
            
            <div className="step-connector"></div>
            
            <div className={`step ${step === 'review' ? 'active' : ''}`}>
              <div className="step-circle">
                <span>3</span>
              </div>
              <span className="step-label">Review</span>
            </div>
          </div>
        </div>
        
        {/* Checkout Content */}
        <div className="checkout-content">
          {/* Left Column - Form */}
          <div className="checkout-form-section">
            {step === 'shipping' && (
              <>
                <h2 className="section-title">Shipping Information</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="required" htmlFor="shipping.firstName">First Name</label>
                    <input
                      type="text"
                      id="shipping.firstName"
                      name="shipping.firstName"
                      className={`form-input ${formErrors.firstName ? 'error' : ''}`}
                      value={shippingAddress.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                    />
                    {formErrors.firstName && (
                      <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {formErrors.firstName}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label className="required" htmlFor="shipping.lastName">Last Name</label>
                    <input
                      type="text"
                      id="shipping.lastName"
                      name="shipping.lastName"
                      className={`form-input ${formErrors.lastName ? 'error' : ''}`}
                      value={shippingAddress.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                    />
                    {formErrors.lastName && (
                      <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {formErrors.lastName}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="required" htmlFor="shipping.email">Email Address</label>
                  <input
                    type="email"
                    id="shipping.email"
                    name="shipping.email"
                    className={`form-input ${formErrors.email ? 'error' : ''}`}
                    value={shippingAddress.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                  />
                  {formErrors.email && (
                    <div className="error-message">
                      <i className="fas fa-exclamation-circle"></i>
                      {formErrors.email}
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label className="required" htmlFor="shipping.phone">Phone Number</label>
                  <input
                    type="tel"
                    id="shipping.phone"
                    name="shipping.phone"
                    className={`form-input ${formErrors.phone ? 'error' : ''}`}
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                  {formErrors.phone && (
                    <div className="error-message">
                      <i className="fas fa-exclamation-circle"></i>
                      {formErrors.phone}
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label className="required" htmlFor="shipping.address">Street Address</label>
                  <input
                    type="text"
                    id="shipping.address"
                    name="shipping.address"
                    className={`form-input ${formErrors.address ? 'error' : ''}`}
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                  />
                  {formErrors.address && (
                    <div className="error-message">
                      <i className="fas fa-exclamation-circle"></i>
                      {formErrors.address}
                    </div>
                  )}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="required" htmlFor="shipping.city">City</label>
                    <input
                      type="text"
                      id="shipping.city"
                      name="shipping.city"
                      className={`form-input ${formErrors.city ? 'error' : ''}`}
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                    />
                    {formErrors.city && (
                      <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {formErrors.city}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label className="required" htmlFor="shipping.state">State</label>
                    <input
                      type="text"
                      id="shipping.state"
                      name="shipping.state"
                      className={`form-input ${formErrors.state ? 'error' : ''}`}
                      value={shippingAddress.state}
                      onChange={handleInputChange}
                      placeholder="NY"
                    />
                    {formErrors.state && (
                      <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {formErrors.state}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="required" htmlFor="shipping.zipCode">ZIP Code</label>
                    <input
                      type="text"
                      id="shipping.zipCode"
                      name="shipping.zipCode"
                      className={`form-input ${formErrors.zipCode ? 'error' : ''}`}
                      value={shippingAddress.zipCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                    />
                    {formErrors.zipCode && (
                      <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {formErrors.zipCode}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label className="required" htmlFor="shipping.country">Country</label>
                    <select
                      id="shipping.country"
                      name="shipping.country"
                      className={`form-input ${formErrors.country ? 'error' : ''}`}
                      value={shippingAddress.country}
                      onChange={handleInputChange}
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                    </select>
                    {formErrors.country && (
                      <div className="error-message">
                        <i className="fas fa-exclamation-circle"></i>
                        {formErrors.country}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            
            {step === 'payment' && (
              <>
                <h2 className="section-title">Payment Method</h2>
                
                <div className="payment-methods">
                  <div 
                    className={`payment-option ${paymentMethod === 'credit-card' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('credit-card')}
                  >
                    <div className="payment-icon">
                      <i className="fas fa-credit-card"></i>
                    </div>
                    <div className="payment-info">
                      <h4>Credit / Debit Card</h4>
                      <p>Pay with Visa, Mastercard, or American Express</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`payment-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <div className="payment-icon">
                      <i className="fab fa-paypal"></i>
                    </div>
                    <div className="payment-info">
                      <h4>PayPal</h4>
                      <p>Pay securely with your PayPal account</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`payment-option ${paymentMethod === 'bank-transfer' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('bank-transfer')}
                  >
                    <div className="payment-icon">
                      <i className="fas fa-university"></i>
                    </div>
                    <div className="payment-info">
                      <h4>Bank Transfer</h4>
                      <p>Transfer funds directly from your bank</p>
                    </div>
                  </div>
                </div>
                
                {paymentMethod === 'credit-card' && (
                  <div className="card-details">
                    <div className="card-preview">
                      <div className="card-chip"></div>
                      <div>
                        <div className="card-number">
                          {paymentInfo.cardNumber || '**** **** **** ****'}
                        </div>
                        <div className="card-info">
                          <span>{paymentInfo.cardName || 'CARDHOLDER NAME'}</span>
                          <span>{paymentInfo.expiryDate || 'MM/YY'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="required" htmlFor="payment.cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="payment.cardNumber"
                        name="payment.cardNumber"
                        className={`form-input ${formErrors.cardNumber ? 'error' : ''}`}
                        value={paymentInfo.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {formErrors.cardNumber && (
                        <div className="error-message">
                          <i className="fas fa-exclamation-circle"></i>
                          {formErrors.cardNumber}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label className="required" htmlFor="payment.cardName">Name on Card</label>
                      <input
                        type="text"
                        id="payment.cardName"
                        name="payment.cardName"
                        className={`form-input ${formErrors.cardName ? 'error' : ''}`}
                        value={paymentInfo.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                      />
                      {formErrors.cardName && (
                        <div className="error-message">
                          <i className="fas fa-exclamation-circle"></i>
                          {formErrors.cardName}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label className="required" htmlFor="payment.expiryDate">Expiry Date</label>
                        <input
                          type="text"
                          id="payment.expiryDate"
                          name="payment.expiryDate"
                          className={`form-input ${formErrors.expiryDate ? 'error' : ''}`}
                          value={paymentInfo.expiryDate}
                          onChange={handleExpiryDateChange}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {formErrors.expiryDate && (
                          <div className="error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {formErrors.expiryDate}
                          </div>
                        )}
                      </div>
                      
                      <div className="form-group">
                        <label className="required" htmlFor="payment.cvv">CVV</label>
                        <input
                          type="password"
                          id="payment.cvv"
                          name="payment.cvv"
                          className={`form-input ${formErrors.cvv ? 'error' : ''}`}
                          value={paymentInfo.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={4}
                        />
                        {formErrors.cvv && (
                          <div className="error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {formErrors.cvv}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'paypal' && (
                  <div style={{ 
                    padding: '30px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <i className="fab fa-paypal" style={{ fontSize: '3rem', color: '#003087', marginBottom: '20px' }}></i>
                    <h3 style={{ color: 'var(--color-accent)', marginBottom: '10px' }}>Pay with PayPal</h3>
                    <p style={{ color: 'var(--color-text-light)' }}>
                      You will be redirected to PayPal to complete your payment securely.
                    </p>
                  </div>
                )}
                
                {paymentMethod === 'bank-transfer' && (
                  <div style={{ 
                    padding: '30px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                    borderRadius: '10px'
                  }}>
                    <h3 style={{ color: 'var(--color-accent)', marginBottom: '15px' }}>Bank Transfer Details</h3>
                    <div style={{ color: 'var(--color-text-light)', lineHeight: '1.8' }}>
                      <p>Account Name: 3DArch Design Studio</p>
                      <p>Bank: Example Bank</p>
                      <p>Account Number: 1234 5678 9012</p>
                      <p>Routing Number: 021000021</p>
                      <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
                        Please use your order number as reference when making the transfer.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="terms-checkbox">
                  <input
                    type="checkbox"
                    id="accept-terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                  />
                  <label htmlFor="accept-terms">
                    I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>. 
                    I understand that 3D models are digital products and are non-refundable once downloaded.
                  </label>
                </div>
              </>
            )}
            
            {step === 'review' && (
              <>
                <h2 className="section-title">Review Your Order</h2>
                
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                  borderRadius: '12px', 
                  padding: '25px',
                  marginBottom: '30px'
                }}>
                  <h3 style={{ color: 'var(--color-accent)', marginBottom: '20px' }}>Shipping Details</h3>
                  <div style={{ color: 'var(--color-text-light)', lineHeight: '1.8' }}>
                    <p><strong>{shippingAddress.firstName} {shippingAddress.lastName}</strong></p>
                    <p>{shippingAddress.address}</p>
                    <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                    <p>{shippingAddress.country}</p>
                    <p style={{ marginTop: '15px' }}><i className="fas fa-envelope"></i> {shippingAddress.email}</p>
                    <p><i className="fas fa-phone"></i> {shippingAddress.phone}</p>
                  </div>
                </div>
                
                <div style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                  borderRadius: '12px', 
                  padding: '25px'
                }}>
                  <h3 style={{ color: 'var(--color-accent)', marginBottom: '20px' }}>Payment Method</h3>
                  <div style={{ color: 'var(--color-text-light)', lineHeight: '1.8' }}>
                    <p>
                      <strong>
                        {paymentMethod === 'credit-card' && 'Credit Card'}
                        {paymentMethod === 'paypal' && 'PayPal'}
                        {paymentMethod === 'bank-transfer' && 'Bank Transfer'}
                      </strong>
                    </p>
                    
                    {paymentMethod === 'credit-card' && (
                      <>
                        <p><i className="fas fa-credit-card"></i> {getMaskedCardNumber()}</p>
                        <p>Name: {paymentInfo.cardName}</p>
                        <p>Expires: {paymentInfo.expiryDate}</p>
                      </>
                    )}
                    
                    {paymentMethod === 'paypal' && (
                      <p>You will complete payment through PayPal</p>
                    )}
                    
                    {paymentMethod === 'bank-transfer' && (
                      <p>Bank transfer instructions will be emailed to you</p>
                    )}
                  </div>
                </div>
              </>
            )}
            
            <div className="checkout-actions">
              {step !== 'shipping' && (
                <button className="back-btn" onClick={handlePrevStep}>
                  <i className="fas fa-arrow-left"></i> Back
                </button>
              )}
              
              {step !== 'review' ? (
                <button className="place-order-btn" onClick={handleNextStep}>
                  Continue to {step === 'shipping' ? 'Payment' : 'Review'}
                  <i className="fas fa-arrow-right"></i>
                </button>
              ) : (
                <button 
                  className="place-order-btn" 
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-lock"></i>
                      Place Order
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="order-summary-section">
            <h2 className="section-title">Order Summary</h2>
            
            <div className="order-items">
              {state.items.map((item:any) => (
                <div key={item.id} className="order-item">
                  <div className="order-item-image">
                    <img src={item.images[0]} alt={item.name} />
                  </div>
                  <div className="order-item-info">
                    <h4>{item.name}</h4>
                    <div className="order-item-meta">
                      <span>Qty: {item.quantity}</span>
                      <span>{item.type === '3d-model' ? 'Digital' : 'Physical'}</span>
                    </div>
                    <div className="order-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="price-breakdown">
              <div className="breakdown-row">
                <span className="breakdown-label">Subtotal</span>
                <span className="breakdown-value">{formatPrice(subtotal)}</span>
              </div>
              
              {state.discountAmount > 0 && (
                <div className="breakdown-row">
                  <span className="breakdown-label">Discount ({state.discountCode})</span>
                  <span className="breakdown-value" style={{ color: '#4CAF50' }}>
                    -{formatPrice(discountAmount)}
                  </span>
                </div>
              )}
              
              <div className="breakdown-row">
                <span className="breakdown-label">Shipping</span>
                <span className="breakdown-value">
                  {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                </span>
              </div>
              
              <div className="breakdown-row">
                <span className="breakdown-label">Tax ({state.taxRate * 100}%)</span>
                <span className="breakdown-value">{formatPrice(taxAmount)}</span>
              </div>
              
              <div className="breakdown-total">
                <span className="total-label">Total</span>
                <span className="total-amount">{formatPrice(total)}</span>
              </div>
            </div>
            
            <div className="security-info">
              <div className="security-item">
                <i className="fas fa-shield-alt"></i>
                <p>Secure SSL encryption. Your payment information is protected.</p>
              </div>
              
              <div className="security-item">
                <i className="fas fa-lock"></i>
                <p>We never store your credit card information on our servers.</p>
              </div>
              
              <div className="security-item">
                <i className="fas fa-sync-alt"></i>
                <p>30-day return policy for physical products. Digital products are non-refundable.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal">
          <div className="modal-content">
            <div className="modal-icon">
              <i className="fas fa-check"></i>
            </div>
            
            <h2>Order Confirmed!</h2>
            <p>
              Thank you for your purchase. Your order has been successfully placed 
              and a confirmation email has been sent to <strong>{shippingAddress.email}</strong>.
            </p>
            
            <div className="order-details">
              <div className="order-detail-item">
                <span className="order-detail-label">Order Number:</span>
                <span className="order-detail-value">{orderNumber}</span>
              </div>
              
              <div className="order-detail-item">
                <span className="order-detail-label">Date:</span>
                <span className="order-detail-value">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="order-detail-item">
                <span className="order-detail-label">Total Amount:</span>
                <span className="order-detail-value">{formatPrice(total)}</span>
              </div>
              
              <div className="order-detail-item">
                <span className="order-detail-label">Payment Method:</span>
                <span className="order-detail-value">
                  {paymentMethod === 'credit-card' && 'Credit Card'}
                  {paymentMethod === 'paypal' && 'PayPal'}
                  {paymentMethod === 'bank-transfer' && 'Bank Transfer'}
                </span>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="modal-btn modal-btn-secondary"
                onClick={() => navigate('/')}
              >
                <i className="fas fa-home"></i> Back to Home
              </button>
              
              <button 
                className="modal-btn modal-btn-primary"
                onClick={() => navigate('/products')}
              >
                <i className="fas fa-shopping-bag"></i> Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;