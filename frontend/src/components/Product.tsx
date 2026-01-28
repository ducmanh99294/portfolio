import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap'; // 1. Import GSAP
import '../assets/product.css';
import { Link } from 'react-router-dom';

const SimpleProductsPage: React.FC = () => {
  // Dữ liệu sản phẩm
  const products: any[] = [
    {
      id: 1,
      name: 'Modern Leather Sofa',
      category: 'Living Room',
      description: 'Contemporary sofa with premium leather upholstery and sleek design. Perfect for modern living spaces.',
      price: 1299.99,
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      dimensions: 'W 220cm x D 95cm x H 85cm',
      materials: ['Premium Leather', 'Solid Wood Frame'],
      features: ['Ergonomic Design', 'Easy to Clean', 'Durable Construction'],
      inStock: true,
      rating: 4.8,
      gallery: [],
      tags: ['Modern', 'Leather', 'Living Room']
    },
    {
      id: 2,
      name: 'Minimalist Dining Table',
      category: 'Dining Room',
      description: 'Scandinavian-inspired dining table with clean lines and natural wood finish. Seats 6-8 people.',
      price: 899.99,
      imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      dimensions: 'W 200cm x D 100cm x H 75cm',
      materials: ['Solid Oak', 'Metal Legs'],
      features: ['Expandable', 'Easy Clean Surface', 'Sturdy Construction'],
      inStock: true,
      rating: 4.6,
      gallery: [],
      tags: ['Minimalist', 'Wood', 'Dining']
    },
    {
      id: 3,
      name: 'Ergonomic Office Chair',
      category: 'Office',
      description: 'Professional chair with lumbar support and adjustable features for all-day comfort.',
      price: 499.99,
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      dimensions: 'W 65cm x D 65cm x H 110-130cm',
      materials: ['Breathable Mesh', 'Aluminum Base'],
      features: ['Adjustable Height', 'Lumbar Support', '360° Rotation'],
      inStock: true,
      rating: 4.7,
      gallery: [],
      tags: ['Ergonomic', 'Office', 'Comfort']
    },
    {
      id: 4,
      name: 'Platform Bed Frame',
      category: 'Bedroom',
      description: 'Low-profile platform bed with integrated lighting and clean, modern design.',
      price: 1599.99,
      imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      dimensions: 'W 180cm x D 200cm x H 40cm',
      materials: ['Walnut Wood', 'Steel Supports'],
      features: ['Integrated Lighting', 'Under-bed Storage', 'No Box Spring Needed'],
      inStock: true,
      rating: 4.9,
      gallery: [],
      tags: ['Bedroom', 'Modern', 'Storage']
    },
    // ... các sản phẩm khác
  ];

  const [selectedProduct, setSelectedProduct] = useState<any>(products[0]);
  
  // 2. Tạo ref bao quanh để GSAP target đúng elements
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Biến kiểm tra lần render đầu tiên để fix lỗi double animation
  const isFirstRender = useRef(true);

  // Animation 1: INTRO (Chỉ chạy 1 lần khi vào trang)
  useLayoutEffect(() => {
    if (!products || products.length === 0) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Intro Thumbnails
      tl.from(".thumb-btn", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all"
      });

      // Intro Main Image
      tl.from(".main-image", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");

      // Intro Text Info
      tl.from(".product-overlay-info", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, [products]);


  // Animation 2: CHANGE PRODUCT (Chỉ chạy khi đổi ảnh)
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // FIX QUAN TRỌNG: Nếu là lần đầu tiên load trang -> Bỏ qua animation này (để Animation 1 chạy)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; 
    }
    
    // Từ lần thứ 2 trở đi (khi user click) mới chạy cái này
    gsap.fromTo(".main-image", 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out", overwrite: true } // overwrite: true để ngắt các anim cũ nếu click quá nhanh
    );

    gsap.fromTo(".product-overlay-info",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, delay: 0.1, ease: "power2.out", overwrite: true }
    );

  }, [selectedProduct]);

  return (
      <div className="container" ref={containerRef}>
        <h2 className="section-title">Products</h2>
        <p className="section-subtitle">Some of the products that we have available.</p>
        <main className="gallery-section">
          <div className="gallery-container">
            {/* Cột trái */}
            <div className="thumbnail-list">
              {products.slice(0,4).map((product) => (
                <button
                  key={product.id}
                  className={`thumb-btn ${selectedProduct.id === product.id ? 'active' : ''}`}
                  onClick={() => setSelectedProduct(product)}
                  aria-label={`View ${product.name}`}
                >
                  <img src={product.imageUrl} alt={product.name} />
                </button>
              ))}
              
              <Link to={"/products"}><div className="more-text">
                more</div>
              </Link>
            </div>

            {/* Cột phải */}
            <div className="main-image-wrapper">
              <img 
                key={selectedProduct.id} 
                src={selectedProduct.imageUrl} 
                alt={selectedProduct.name} 
                className="main-image"
              />
              <div className="product-overlay-info">
                  <h2>{selectedProduct.name}</h2>
                  <p>${selectedProduct.price}</p>
              </div>
            </div>
          </div>
        </main>   </div>
    );
};

export default SimpleProductsPage;