import React, { useState, useEffect } from 'react';
import '../assets/product2.css';
import { Link, useNavigate } from 'react-router-dom';
import {Product3D} from '../types/product';
import { useNotify } from '../hooks/UseNotification';
import { getProduct } from '../api/productApi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [imageMode, setImageMode] = useState<'2d' | '3d'>('2d');
  const [products, setProducts] = useState<Product3D[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product3D | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const notify = useNotify();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProduct();
      if (data) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  // Sample 3D products data
  // const products: Product3D[] = [
  //   {
  //     id: 1,
  //     name: 'Modern Sofa Set',
  //     category: 'Living Room',
  //     description: 'Contemporary sofa set with modular design. Features premium upholstery and ergonomic seating.',
  //     price: 1899.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //     has3D: true,
  //     file3D: 'https://example.com/models/sofa.glb',
  //     dimensions: 'W 220cm x D 95cm x H 85cm',
  //     materials: ['Premium Fabric', 'Solid Wood', 'High-density Foam'],
  //     tags: ['Modern', 'Modular', 'Living Room', 'Comfort'],
  //     rating: 4.8,
  //     downloadCount: 1243,
  //     fileSize: '15.2 MB',
  //     fileFormat: 'GLB'
  //   },
  //   {
  //     id: 2,
  //     name: 'Minimalist Dining Table',
  //     category: 'Dining Room',
  //     description: 'Scandinavian-inspired dining table with solid wood top and metal legs. Seats 6-8 comfortably.',
  //     price: 899.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //     has3D: true,
  //     file3D: 'https://example.com/models/dining-table.glb',
  //     dimensions: 'W 200cm x D 100cm x H 75cm',
  //     materials: ['Solid Oak', 'Powder-coated Steel'],
  //     tags: ['Minimalist', 'Scandinavian', 'Dining', 'Wood'],
  //     rating: 4.6,
  //     downloadCount: 987,
  //     fileSize: '12.7 MB',
  //     fileFormat: 'GLB'
  //   },
  //   {
  //     id: 3,
  //     name: 'Ergonomic Office Chair',
  //     category: 'Office',
  //     description: 'Professional office chair with lumbar support, adjustable arms, and breathable mesh back.',
  //     price: 499.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //     has3D: true,
  //     file3D: 'https://example.com/models/office-chair.glb',
  //     dimensions: 'W 65cm x D 65cm x H 110-130cm',
  //     materials: ['Breathable Mesh', 'Aluminum Frame', 'Memory Foam'],
  //     tags: ['Ergonomic', 'Office', 'Adjustable', 'Comfort'],
  //     rating: 4.9,
  //     downloadCount: 2156,
  //     fileSize: '18.3 MB',
  //     fileFormat: 'GLB'
  //   },
  //   {
  //     id: 4,
  //     name: 'Platform Bed Frame',
  //     category: 'Bedroom',
  //     description: 'Low-profile platform bed with integrated lighting and storage drawers. No box spring needed.',
  //     price: 1599.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //     has3D: true,
  //     file3D: 'https://example.com/models/bed-frame.glb',
  //     dimensions: 'W 180cm x D 200cm x H 40cm',
  //     materials: ['Walnut Wood', 'Steel Frame', 'LED Lighting'],
  //     tags: ['Bedroom', 'Platform', 'Storage', 'Modern'],
  //     rating: 4.7,
  //     downloadCount: 876,
  //     fileSize: '22.1 MB',
  //     fileFormat: 'GLB'
  //   },
  //   {
  //     id: 5,
  //     name: 'Bookshelf Unit',
  //     category: 'Storage',
  //     description: 'Modular bookshelf with adjustable shelves and integrated lighting. Wall-mountable design.',
  //     price: 799.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //     has3D: false,
  //     dimensions: 'W 180cm x D 35cm x H 200cm',
  //     materials: ['Engineered Wood', 'Metal Hardware', 'LED Strips'],
  //     tags: ['Storage', 'Bookshelf', 'Modular', 'Wall-mounted'],
  //     rating: 4.5,
  //     downloadCount: 543
  //   },
  //   {
  //     id: 6,
  //     name: 'Coffee Table',
  //     category: 'Living Room',
  //     description: 'Modern coffee table with tempered glass top and geometric metal base.',
  //     price: 449.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //     has3D: true,
  //     file3D: 'https://example.com/models/coffee-table.glb',
  //     dimensions: 'W 120cm x D 60cm x H 45cm',
  //     materials: ['Tempered Glass', 'Powder-coated Steel'],
  //     tags: ['Coffee Table', 'Modern', 'Glass', 'Geometric'],
  //     rating: 4.4,
  //     downloadCount: 654,
  //     fileSize: '9.8 MB',
  //     fileFormat: 'GLB'
  //   },
  //   {
  //     id: 7,
  //     name: 'Accent Armchair',
  //     category: 'Living Room',
  //     description: 'Velvet accent chair with curved design and gold metal legs. Makes a statement in any room.',
  //     price: 699.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //     has3D: true,
  //     file3D: 'https://example.com/models/accent-chair.glb',
  //     dimensions: 'W 85cm x D 90cm x H 95cm',
  //     materials: ['Premium Velvet', 'Solid Wood Frame', 'Gold Metal'],
  //     tags: ['Accent Chair', 'Velvet', 'Luxury', 'Statement Piece'],
  //     rating: 4.7,
  //     downloadCount: 432,
  //     fileSize: '11.5 MB',
  //     fileFormat: 'FBX'
  //   },
  //   {
  //     id: 8,
  //     name: 'TV Console',
  //     category: 'Living Room',
  //     description: 'Sleek TV console with ample storage space, cable management, and modern design.',
  //     price: 899.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //     has3D: false,
  //     dimensions: 'W 180cm x D 45cm x H 60cm',
  //     materials: ['Engineered Wood', 'Metal Legs', 'Wood Veneer'],
  //     tags: ['TV Console', 'Storage', 'Modern', 'Cable Management'],
  //     rating: 4.3,
  //     downloadCount: 321
  //   },
  //   {
  //     id: 9,
  //     name: 'Bar Stool Set',
  //     category: 'Kitchen',
  //     description: 'Set of 3 industrial-style bar stools with adjustable height and comfortable seating.',
  //     price: 399.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //     has3D: true,
  //     file3D: 'https://example.com/models/bar-stool.glb',
  //     dimensions: 'Seat Height: 65-75cm',
  //     materials: ['Metal Frame', 'Wooden Seat', 'Adjustable Mechanism'],
  //     tags: ['Bar Stool', 'Kitchen', 'Industrial', 'Adjustable'],
  //     rating: 4.2,
  //     downloadCount: 789,
  //     fileSize: '8.9 MB',
  //     fileFormat: 'GLB'
  //   },
  //   {
  //     id: 10,
  //     name: 'Outdoor Lounge Set',
  //     category: 'Outdoor',
  //     description: 'Weather-resistant outdoor furniture set with comfortable cushions. Perfect for patio or garden.',
  //     price: 2299.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1567446537710-0e9b8d4d8c4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //     has3D: true,
  //     file3D: 'https://example.com/models/outdoor-lounge.glb',
  //     dimensions: 'Sofa: W 180cm x D 90cm x H 85cm',
  //     materials: ['Synthetic Rattan', 'Waterproof Cushions', 'Aluminum Frame'],
  //     tags: ['Outdoor', 'Patio', 'Weather-resistant', 'Comfortable'],
  //     rating: 4.6,
  //     downloadCount: 567,
  //     fileSize: '25.4 MB',
  //     fileFormat: 'GLB'
  //   },
  //   {
  //     id: 11,
  //     name: 'Study Desk',
  //     category: 'Office',
  //     description: 'Minimalist study desk with spacious work surface and built-in storage compartments.',
  //     price: 599.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //     has3D: false,
  //     dimensions: 'W 140cm x D 70cm x H 75cm',
  //     materials: ['Solid Wood', 'Metal Frame', 'Wood Veneer'],
  //     tags: ['Desk', 'Office', 'Study', 'Minimalist'],
  //     rating: 4.5,
  //     downloadCount: 432
  //   },
  //   {
  //     id: 12,
  //     name: 'Sideboard Cabinet',
  //     category: 'Storage',
  //     description: 'Elegant sideboard with sliding doors, interior lighting, and ample storage space.',
  //     price: 1199.99,
  //     imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  //     has3D: true,
  //     file3D: 'https://example.com/models/sideboard.glb',
  //     dimensions: 'W 160cm x D 45cm x H 85cm',
  //     materials: ['Wood Veneer', 'Metal Hardware', 'LED Lighting'],
  //     tags: ['Sideboard', 'Storage', 'Cabinet', 'Elegant'],
  //     rating: 4.8,
  //     downloadCount: 345,
  //     fileSize: '19.7 MB',
  //     fileFormat: 'GLB'
  //   }
  // ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'Chair', name: 'Chair' },
    { id: 'Table', name: 'Table' },
    { id: 'Cabinet', name: 'Cabinet' },
    { id: 'Sofa', name: 'Sofa' },
    { id: 'Bed', name: 'Bed' },
    { id: 'Decor', name: 'Decor' },
  ];

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloadCount - a.downloadCount;
      case 'has3d':
        return (b.has3D ? 1 : 0) - (a.has3D ? 1 : 0);
      default:
        return a._id - b._id;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  // Event handlers
  const handleView3D = (product: Product3D) => {
    if (!product.has3D) {
      notify.info('3D model not available for this product');
      return;
    }
    setImageMode('3d');
    setSelectedProduct(product);
    navigate(`/products/${product._id}`)
  };

  const handleAddToCart = async (product: any) => {
    if (!isAuthenticated) {
      notify.warning(
        'Please log in to add products to your cart',
        'Authentication required',
        { duration: 3000 }
      );
        navigate('/login', {
          state: { redirectTo: window.location.pathname },
        });
      return;
    }

    try {
      await addToCart(product._id);

      notify.success(
        'Product has been added to your cart',
        'Success',
        { duration: 3000 }
      );
    } catch {
      notify.error(
        'Failed to add product to cart',
        'Error',
        {
          duration: 3000,
          action: {
            label: 'View cart',
            onClick: () => navigate('/cart'),
          },
        }
      );
    }
  };

  const handleViewDetails = (product: Product3D) => {
    // Could open a modal or navigate to detail page
    alert(`Viewing details for: ${product.name}\nThis would open a detailed view with more information.`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="three-d-products-page">
      <div className="three-d-products-container">
        {/* Header Section */}
        <div className="products-header">
          <h1>3D Product Library</h1>
          <p>
            Browse our collection of furniture designs with interactive 3D models. 
            View products in 2D images or explore them in 3D. Download models for your own projects.
          </p>
          
          {/* <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <i className="fas fa-th-large"></i> Grid View
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <i className="fas fa-list"></i> List View
            </button>
          </div> */}
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-grid">
            <div className="filter-group search-input">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-group">
              <label>Category</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Sort By</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="downloads">Most Downloaded</option>
                <option value="has3d">3D Models First</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Showing {sortedProducts.length} products</label>
              <div style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginTop: '5px' }}>
                <i className="fas fa-cube"></i> {products.filter(p => p.has3D).length} with 3D models
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <div className="product-card-3d" key={product._id}>
                {/* Product Media */}
                <div className="product-media">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="product-image"
                  />
                  
                  {/* 3D Badge */}
                  {product.has3D && (
                    <div className="badge-3d">
                      <i className="fas fa-cube"></i>
                      3D Model Available
                    </div>
                  )}
                  
                  {/* View Mode Toggle */}
                  <div className="view-mode-toggle">
                    <button 
                      className={`mode-btn ${imageMode === '2d' ? 'active' : ''}`}
                      onClick={() => setImageMode('2d')}
                    >
                      <i className="fas fa-image"></i> 2D
                    </button>
                    <button 
                      className={`mode-btn ${imageMode === '3d' ? 'active' : ''}`}
                      onClick={() => handleView3D(product)}
                      disabled={!product.has3D}
                      style={{ opacity: product.has3D ? 1 : 0.5 }}
                    >
                      <i className="fas fa-cube"></i> 3D
                    </button>
                  </div>
                  
                  {/* 3D Viewer Placeholder (would be replaced with actual 3D viewer) */}
                  {imageMode === '3d' && selectedProduct?._id === product._id && (
                    <div className="viewer-3d-placeholder">
                      <i className="fas fa-cube"></i>
                      <p>3D Viewer for {product.name}</p>
                      <small>Interactive 3D model would appear here</small>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="product-info-3d">
                  <span className="product-category-3d">{product.category}</span>
                  
                  <h3 className="product-title">{product.name}</h3>
                  
                  <p className="product-description-3d">{product.description}</p>
                  
                  <div className="product-specs-3d">
                    <div className="spec-item-3d">
                      <i className="fas fa-ruler-combined"></i>
                      <span>{product.dimensions}</span>
                    </div>
                    <div className="spec-item-3d">
                      <i className="fas fa-star"></i>
                      <span>{product.rating}/5 ({product.sellCount})</span>
                    </div>
                    {product.has3D && product.fileFormat && (
                      <div className="spec-item-3d">
                        <i className="fas fa-file"></i>
                        <span>{product.fileFormat} • {product.fileSize}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="product-tags-3d">
                    {product.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="product-tag-3d">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="product-actions-3d">
                    {/* <button 
                      className="action-btn action-btn-primary"
                      onClick={() => handleViewDetails(product)}
                    >
                      <i className="fas fa-eye"></i> View Details
                    </button> */}
                    <Link 
                    to={`/product/${product._id}`}
                    className="action-btn action-btn-primary"
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                    <i className="fas fa-eye"></i> View Details
                    </Link>
                      <button 
                        className="action-btn action-btn-secondary"
                        onClick={() => handleAddToCart(product)}
                      >
                        <i className="fas fa-shopping-cart"></i> Add to cart
                      </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>No Products Found</h3>
              <p>Try adjusting your search or filter criteria to find what you're looking for.</p>
              <button 
                className="action-btn action-btn-primary"
                style={{ marginTop: '20px', maxWidth: '200px', margin: '20px auto 0' }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('name-asc');
                }}
              >
                <i className="fas fa-redo"></i> Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: any;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            
            <div style={{ color: 'var(--color-text-light)', marginLeft: '20px' }}>
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div style={{ 
          marginTop: '60px', 
          padding: '30px', 
          backgroundColor: 'var(--color-card)',
          borderRadius: '20px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: 'var(--color-accent)', marginBottom: '20px' }}>Library Statistics</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px'
          }}>
            <div>
              <div style={{ fontSize: '2.5rem', color: 'var(--color-primary)', fontWeight: '700' }}>
                {products.length}
              </div>
              <div style={{ color: 'var(--color-text-light)' }}>Total Products</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', color: 'var(--color-primary)', fontWeight: '700' }}>
                {products.filter(p => p.has3D).length}
              </div>
              <div style={{ color: 'var(--color-text-light)' }}>3D Models</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', color: 'var(--color-primary)', fontWeight: '700' }}>
                {products.reduce((sum, p) => sum + p.sellCount, 0).toLocaleString()}
              </div>
              <div style={{ color: 'var(--color-text-light)' }}>Total Sell</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', color: 'var(--color-primary)', fontWeight: '700' }}>
                {categories.length - 1}
              </div>
              <div style={{ color: 'var(--color-text-light)' }}>Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;