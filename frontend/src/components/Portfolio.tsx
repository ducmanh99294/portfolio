import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortfolioItem } from '../types';
import '../assets/portfolio.css';

// Đăng ký Plugin
gsap.registerPlugin(ScrollTrigger);

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'Modern Villa',
      description: 'Complete 3D design of a 2-story villa with minimalist style, combining open spaces and natural light.',
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80'
    },
    {
      id: 2,
      title: 'Luxury Apartment',
      description: '3D model of a 3-bedroom apartment with sophisticated interior design focused on functionality and aesthetics.',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1558&q=80'
    },
    {
      id: 3,
      title: 'Contemporary Townhouse',
      description: '3D design of a 4-story townhouse with impressive façade and interior spaces optimized for multi-generational families.',
      imageUrl: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 4,
      title: 'Creative Workspace',
      description: 'Office interior design with an open concept, combining work and relaxation areas.',
      imageUrl: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%", // Bắt đầu chạy khi section chạm 70% màn hình
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // 1. Tiêu đề xuất hiện trước
      tl.from(".section-title, .section-subtitle", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });

      // 2. Các dự án (items) xuất hiện lần lượt
      tl.from(".portfolio-item", {
        y: 80,           // Trượt từ dưới lên 80px
        opacity: 0,      // Từ mờ sang rõ
        duration: 1,     // Thời gian chạy 1s cho mỗi item
        stagger: 0.2,    // Mỗi item cách nhau 0.2s
        ease: "power3.out", // Hiệu ứng trượt êm, sang trọng (phù hợp với kiến trúc)
        clearProps: "all" // Quan trọng: Xóa các thuộc tính transform sau khi chạy xong để không ảnh hưởng hiệu ứng hover CSS (nếu có)
      }, "-=0.5"); // Chạy đè lên animation tiêu đề 0.5s để mượt hơn

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="portfolio" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Portfolio</h2>
        <p className="section-subtitle">Some of my notable projects from recent times.</p>
        
        <div className="portfolio-grid">
          {portfolioItems.map((item) => (
            <div className="portfolio-item" key={item.id}>
              <div className="portfolio-img">
                <img src={item.imageUrl} alt={item.title} />
              </div>
              <div className="portfolio-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;