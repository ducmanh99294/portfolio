import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface AddToCartButtonProps {
  product: {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    images: string[];
    type: 'physical' | '3d-model';
    fileFormat?: string;
    fileSize?: string;
    dimensions?: string;
    materials?: string[];
  };
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addToCart, addToSaved } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    const cartItem = {
      id: Date.now(), // Generate unique ID
      productId: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      images: product.images,
      quantity: 1,
      type: product.type,
      fileFormat: product.fileFormat,
      fileSize: product.fileSize,
      dimensions: product.dimensions,
      materials: product.materials
    };
    
    // addToCart(cartItem);
    
    // Reset button state
    setTimeout(() => {
      setIsAdding(false);
      alert(`${product.name} added to cart!`);
    }, 500);
  };

  const handleSaveForLater = () => {
    const savedItem = {
      id: Date.now(),
      productId: product.id,
      name: product.name,
      category: product.category,
      images: product.images,
      price: product.price,
      addedAt: new Date().toISOString()
    };
    
    addToSaved(savedItem);
    setShowOptions(false);
    alert(`${product.name} saved for later!`);
  };

  const handleQuickAdd = () => {
    handleAddToCart();
    setShowOptions(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="btn"
        onClick={() => setShowOptions(!showOptions)}
        disabled={isAdding}
        style={{
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
          color: 'white',
          padding: '12px 30px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          position: 'relative'
        }}
      >
        {isAdding ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            Adding...
          </>
        ) : (
          <>
            <i className="fas fa-cart-plus"></i>
            Add to Cart
          </>
        )}
      </button>
      
      {showOptions && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'var(--color-card)',
          border: '1px solid rgba(139, 115, 85, 0.3)',
          borderRadius: '8px',
          padding: '15px',
          marginTop: '10px',
          zIndex: 100,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}>
          <button
            onClick={handleQuickAdd}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              marginBottom: '10px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              justifyContent: 'center'
            }}
          >
            <i className="fas fa-cart-plus"></i>
            Quick Add to Cart
          </button>
          
          <button
            onClick={handleSaveForLater}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'transparent',
              color: 'var(--color-accent)',
              border: '2px solid var(--color-accent)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              justifyContent: 'center'
            }}
          >
            <i className="far fa-heart"></i>
            Save for Later
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;