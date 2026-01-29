import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../assets/productDetail.css';
import { ProductDetail } from '../types/productDetail'
import {getProductById} from "../api/productApi";
import { useNotify } from '../hooks/UseNotification';
import { useAuth } from '../context/AuthContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const notify = useNotify();
  const { user, isAuthenticated } = useAuth();
  useEffect(() => {
        const fetchProducts = async () => {
          if(!id) return;
          const data = await getProductById(id);
          if (data) {
            setProduct(data);
            setLoading(false);
          }
        };
    
        fetchProducts();
  })
  // Mock data - in real app, fetch from API
  // const mockProducts: ProductDetail[] = [
  //   {
  //     id: 1,
  //     name: 'Modern Leather Sofa',
  //     category: 'Living Room',
  //     description: 'Contemporary sofa with premium leather upholstery',
  //     detailedDescription: 'This modern leather sofa combines style and comfort with its premium top-grain leather upholstery and ergonomic design. The sofa features deep seating, tufted backrest, and solid wood frame construction. Perfect for modern living spaces, it offers both aesthetic appeal and practical comfort. The minimalist design with clean lines makes it versatile for various interior styles.',
  //     price: 1299.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  //     gallery: [
  //       'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //       'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //       'https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //       'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  //     ],
  //     has3D: true,
  //     file3D: 'https://example.com/models/sofa-modern-leather.glb',
  //     fileFormat: 'GLB (Binary glTF)',
  //     fileSize: '18.5 MB',
  //     polyCount: '45,230 polygons',
  //     dimensions: 'Width: 220cm | Depth: 95cm | Height: 85cm | Seat Height: 45cm',
  //     weight: '85 kg',
  //     materials: [
  //       { name: 'Top-grain Leather', icon: '' },
  //       { name: 'Solid Oak Wood', icon: '' },
  //       { name: 'High-density Foam', icon: 'fas fa-cube' },
  //       { name: 'Stainless Steel Legs', icon: 'fas fa-bolt' }
  //     ],
  //     features: [
  //       'Removable cushion covers for easy cleaning',
  //       'Stain-resistant leather finish',
  //       'Ergonomic lumbar support',
  //       'Modular design with optional extensions',
  //       'Hidden storage compartment',
  //       '5-year warranty on frame and materials'
  //     ],
  //     softwareCompatible: ['Blender', '3ds Max', 'SketchUp', 'Maya', 'Unity', 'Unreal Engine'],
  //     rating: 4.8,
  //     reviewCount: 124,
  //     downloadCount: 2341,
  //     lastUpdated: '2024-03-15',
  //     tags: ['Modern', 'Leather', 'Living Room', 'Luxury', 'Ergonomic'],
  //     relatedProducts: [2, 3, 4]
  //   },
  //   {
  //     id: 2,
  //     name: 'Minimalist Dining Table',
  //     category: 'Dining Room',
  //     description: 'Scandinavian-inspired dining table with natural finish',
  //     detailedDescription: 'A beautifully crafted dining table that embodies Scandinavian minimalism. Made from solid ash wood with a natural oil finish, this table features clean lines and a warm aesthetic. The tapered legs provide stability while maintaining a light, airy appearance. Perfect for family meals and entertaining guests.',
  //     price: 899.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  //     gallery: [
  //       'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //       'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //       'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  //     ],
  //     has3D: true,
  //     file3D: 'https://example.com/models/dining-table-minimalist.glb',
  //     fileFormat: 'GLB',
  //     fileSize: '12.7 MB',
  //     polyCount: '28,450 polygons',
  //     dimensions: 'Length: 200cm | Width: 100cm | Height: 75cm',
  //     weight: '45 kg',
  //     materials: [
  //       { name: 'Solid Ash Wood', icon: 'fas fa-tree' },
  //       { name: 'Powder-coated Steel', icon: 'fas fa-industry' },
  //       { name: 'Natural Oil Finish', icon: 'fas fa-paint-brush' }
  //     ],
  //     features: [
  //       'Expandable with additional leaf (sold separately)',
  //       'Heat-resistant and scratch-resistant surface',
  //       'Easy to clean and maintain',
  //       'Environmentally sustainable materials',
  //       'Assembly required (tools included)'
  //     ],
  //     softwareCompatible: ['Blender', 'SketchUp', '3ds Max', 'Rhino'],
  //     rating: 4.6,
  //     reviewCount: 89,
  //     downloadCount: 1567,
  //     lastUpdated: '2024-02-28',
  //     tags: ['Minimalist', 'Scandinavian', 'Dining', 'Wood'],
  //     relatedProducts: [1, 3, 5]
  //   },
  //   {
  //     id: 3,
  //     name: 'Ergonomic Office Chair',
  //     category: 'Office',
  //     description: 'Professional chair with advanced lumbar support',
  //     detailedDescription: 'Designed for long hours of comfortable work, this ergonomic office chair features advanced adjustable lumbar support, breathable mesh back, and waterfall seat edge to reduce pressure on legs. The chair includes adjustable armrests, seat height, and tilt tension control for personalized comfort.',
  //     price: 499.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  //     gallery: [
  //       'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //       'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //       'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  //     ],
  //     has3D: true,
  //     file3D: 'https://example.com/models/office-chair-ergonomic.glb',
  //     fileFormat: 'FBX',
  //     fileSize: '22.3 MB',
  //     polyCount: '65,800 polygons',
  //     dimensions: 'Width: 70cm | Depth: 70cm | Height: 115-130cm (adjustable)',
  //     weight: '25 kg',
  //     materials: [
  //       { name: 'Breathable Mesh', icon: 'fas fa-fan' },
  //       { name: 'Aluminum Frame', icon: 'fas fa-cogs' },
  //       { name: 'Memory Foam Seat', icon: 'fas fa-bed' },
  //       { name: 'PU Casters', icon: 'fas fa-cog' }
  //     ],
  //     features: [
  //       'Adjustable lumbar support (height and depth)',
  //       '360-degree swivel with smooth-rolling casters',
  //       'Tilt tension control and lock mechanism',
  //       'Waterfall seat edge design',
  //       'Weight capacity: 150kg',
  //       '10-year warranty on gas lift'
  //     ],
  //     softwareCompatible: ['3ds Max', 'Maya', 'Blender', 'Cinema 4D'],
  //     rating: 4.9,
  //     reviewCount: 203,
  //     downloadCount: 3245,
  //     lastUpdated: '2024-03-10',
  //     tags: ['Ergonomic', 'Office', 'Mesh', 'Adjustable'],
  //     relatedProducts: [2, 4, 6]
  //   }
  // ];

  const relatedProductsData = [
    {
      id: 4,
      name: 'Platform Bed Frame',
      category: 'Bedroom',
      price: 1599.99,
      imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Low-profile bed with integrated lighting'
    },
    {
      id: 5,
      name: 'Coffee Table',
      category: 'Living Room',
      price: 449.99,
      imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Modern glass coffee table'
    },
    {
      id: 6,
      name: 'Bookshelf Unit',
      category: 'Storage',
      price: 799.99,
      imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Modular bookshelf with lighting'
    }
  ];

  // useEffect(() => {
  //   // Simulate API call
  //   const fetchProduct = () => {
  //     const productId = parseInt(id || '1');
  //     const foundProduct = mockProducts.find(p => p.id === productId) || mockProducts[0];
  //     setProduct(foundProduct);
  //     setLoading(false);
  //   };

  //   fetchProduct();
  // }, [id]);

  if (loading) {
    return (
      <div className="product-detail-page">
   
        <div className="product-detail-container">
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '20px' }}></i>
            <h3 style={{ color: 'var(--color-accent)' }}>Loading Product Details...</h3>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-container">
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <i className="fas fa-exclamation-circle" style={{ fontSize: '4rem', color: 'var(--color-primary)', marginBottom: '20px' }}></i>
            <h3 style={{ color: 'var(--color-accent)', marginBottom: '15px' }}>Product Not Found</h3>
            <p style={{ color: 'var(--color-text-light)', marginBottom: '30px' }}>The product you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/products')}
              className="action-btn action-btn-primary"
              style={{ maxWidth: '200px', margin: '0 auto' }}
            >
              <i className="fas fa-arrow-left"></i> Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleDownload3D = () => {
    if (!product.has3D) {
      alert('3D model not available for download');
      return;
    }

    // In a real app, this would trigger the download
    const downloadData = {
      name: product.name,
      format: product.fileFormat,
      size: product.fileSize,
      url: product.model3d
    };

    alert(`Downloading 3D Model:\n\nName: ${downloadData.name}\nFormat: ${downloadData.format}\nSize: ${downloadData.size}\n\nDownload will start shortly...`);
    
    // Simulate download
    console.log('Initiating download:', downloadData);
  };

  const handleViewInAR = () => {
    alert('AR view would open here. This feature requires WebXR support and compatible device.');
  };

  const handleToggleViewMode = (mode: '3d' | '2d') => {
    setViewMode(mode);
    if (mode === '2d') {
      // Reset to first image when switching to 2D
      setActiveImage(1);
    }
    if (mode === '3d' && !isAuthenticated) {
      notify.warning(
        'Please log in to seen 3d model',
        'Authentication required',
        { duration: 3000 }
      );
        navigate('/login', {
          state: { redirectTo: window.location.pathname },
        });
      return;
    }
  };

  const relatedProducts = relatedProductsData.filter(p => 
    product?.relatedProducts?.includes(p.id)
  );

  return (
    <div className="product-detail-page">
      
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">3D Library</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category.toLowerCase()}`}>{product.category}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        {/* Main Content */}
        <div className="product-detail-main">
          {/* Left Column - Media */}
          <div className="product-media-section">
            {/* Viewer Controls */}
            <div className="viewer-controls">
              <button 
                className={`control-btn ${viewMode === '3d' ? 'active' : ''}`}
                onClick={() => handleToggleViewMode('3d')}
              >
                <i className="fas fa-cube"></i> 3D View
              </button>
              <button 
                className={`control-btn ${viewMode === '2d' ? 'active' : ''}`}
                onClick={() => handleToggleViewMode('2d')}
              >
                <i className="fas fa-image"></i> Images
              </button>
              {product.has3D && (
                <button 
                  className="control-btn"
                  onClick={handleViewInAR}
                >
                  <i className="fas fa-vr-cardboard"></i> View in AR
                </button>
              )}
            </div>

            {/* 3D Viewer or Main Image */}
            <div className="viewer-3d-container">
              {viewMode === '3d' ? (
                <div className="viewer-3d-placeholder">
                  <i className="fas fa-cube"></i>
                  <p>Interactive 3D Viewer</p>
                  <small>Model: {product.name}</small>
                  <small>Format: {product.fileFormat}</small>
                  <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button 
                      className="control-btn"
                      style={{ fontSize: '0.8rem' }}
                      onClick={() => alert('Rotate: Click and drag | Zoom: Scroll wheel | Pan: Right-click and drag')}
                    >
                      <i className="fas fa-info-circle"></i> Controls Help
                    </button>
                  </div>
                </div>
              ) : (
                <img 
                  src={product.images[activeImage]} 
                  alt={`${product.name} view ${activeImage + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px' }}
                />
              )}
            </div>

            {/* Image Gallery */}
            {viewMode === '2d' && (
              <div className="product-gallery">
                {product.images.map((img, index) => (
                  <div 
                    key={index}
                    className={`gallery-thumb ${activeImage === index ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Info */}
          <div className="product-info-section">
            {/* Product Header */}
            <div className="product-header">
              <span className="category-badge">{product.category}</span>
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : ''}`}></i>
                  ))}
                </div>
                <span className="rating-text">{product.rating} / 5.0 ({product.reviewCount} reviews)</span>
              </div>

              {product.has3D && (
                <div className="model-info">
                  <i className="fas fa-cube"></i>
                  <span>3D Model Available - {product.fileFormat} • {product.fileSize}</span>
                </div>
              )}
            </div>

            {/* Price Section */}
            <div className="price-section">
              <div className="price">
                <span className="current-price">${product.price.toFixed(2)}</span>
              </div>
              <p className="price-note">
                Price for physical product. 3D model download includes commercial use license.
              </p>

              <div className="product-actions">
                <button 
                  className="action-btn action-btn-primary"
                  onClick={() => alert('Physical product order would be processed here')}
                >
                  <i className="fas fa-shopping-cart"></i> Order Physical Product
                </button>

                {product.has3D ? (
                  <button 
                    className="action-btn action-btn-secondary"
                    onClick={handleDownload3D}
                  >
                    <i className="fas fa-download"></i> Download 3D Model
                  </button>
                ) : (
                  <button 
                    className="action-btn action-btn-disabled"
                    disabled
                  >
                    <i className="fas fa-cube"></i> 3D Model Not Available
                  </button>
                )}

                <button 
                  className="action-btn action-btn-secondary"
                  onClick={() => alert('Contact form would open here')}
                >
                  <i className="fas fa-envelope"></i> Request Customization
                </button>
              </div>
            </div>

            {/* Specifications */}
            <div className="specs-section">
              <h3 className="section-title">Specifications</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <i className="fas fa-ruler-combined"></i>
                  <div className="spec-content">
                    <h4>Dimensions</h4>
                    <p>{product.dimensions}</p>
                  </div>
                </div>

                <div className="spec-item">
                  <i className="fas fa-weight"></i>
                  <div className="spec-content">
                    <h4>Colors</h4>
                  {product?.colors?.map((color: string, index: any) => (
                    <div className="spec-item" key={index}>
                      <div className="spec-content">
                        <p>{color}</p>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>

                {product.has3D && (
                  <>
                    <div className="spec-item">
                      <i className="fas fa-file-code"></i>
                      <div className="spec-content">
                        <h4>File Format</h4>
                        <p>{product.fileFormat}</p>
                      </div>
                    </div>

                    <div className="spec-item">
                      <i className="fas fa-database"></i>
                      <div className="spec-content">
                        <h4>Polygon Count</h4>
                        <p>{product.polyCount}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Materials */}
            <div className="materials-section">
              <h3 className="section-title">Materials</h3>
              <div className="materials-list">
                {product.materials.map((material: string) => (
                  <span  className="material-tag">
                    {material}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="description-section">
              <h3 className="section-title">Product Description</h3>
              <div className="description-content">
                {product.detailedDescription.split('\n').map((paragraph, index) => (
                  <p key={index} style={{ marginBottom: '20px' }}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3D File Information */}
        {product.has3D && (
          <div className="file-info-section">
            <h3 className="section-title" style={{ textAlign: 'center', marginBottom: '30px' }}>
              <i className="fas fa-cube" style={{ marginRight: '10px' }}></i>
              3D Model Information
            </h3>

            <div className="file-info-grid">
              <div className="file-info-item">
                <i className="fas fa-file-download"></i>
                <h4>Downloads</h4>
                <p>{product.downloadCount.toLocaleString()}</p>
              </div>

              <div className="file-info-item">
                <i className="fas fa-file-code"></i>
                <h4>File Format</h4>
                <p>{product.fileFormat}</p>
              </div>

              <div className="file-info-item">
                <i className="fas fa-database"></i>
                <h4>File Size</h4>
                <p>{product.fileSize}</p>
              </div>

              <div className="file-info-item">
                <i className="fas fa-sync-alt"></i>
                <h4>Last Updated</h4>
                <p>{product.lastUpdated}</p>
              </div>
            </div>

            <div className="download-instructions">
              <h4>
                <i className="fas fa-info-circle"></i>
                How to Use This 3D Model
              </h4>
              <ul>
                <li>
                  <i className="fas fa-check"></i>
                  Compatible with: {product.softwareCompatible.join(', ')}
                </li>
                <li>
                  <i className="fas fa-check"></i>
                  Includes textures and materials (PBR ready)
                </li>
                <li>
                  <i className="fas fa-check"></i>
                  Commercial use license included
                </li>
                <li>
                  <i className="fas fa-check"></i>
                  Optimized for real-time rendering
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="specs-section">
          <h3 className="section-title">Features & Benefits</h3>
          <div className="specs-grid">
            {product?.features?.map((feature, index) => (
              <div className="spec-item" key={index}>
                <i className="fas fa-check" style={{ color: '#4CAF50' }}></i>
                <div className="spec-content">
                  <p>{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h3 className="section-title">Related Products</h3>
            <div className="related-grid">
              {relatedProducts.map(related => (
                <div 
                  key={related.id}
                  className="related-card"
                  onClick={() => navigate(`/product/${related.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="related-image">
                    <img src={related.imageUrl} alt={related.name} />
                  </div>
                  <div className="related-info">
                    <h4>{related.name}</h4>
                    <p>{related.description}</p>
                    <div className="related-price">${related.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Products */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <button 
            onClick={() => navigate('/products')}
            className="action-btn action-btn-secondary"
            style={{ maxWidth: '300px', margin: '0 auto' }}
          >
            <i className="fas fa-arrow-left"></i> Back to 3D Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;