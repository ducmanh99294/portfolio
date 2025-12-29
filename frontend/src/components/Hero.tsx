import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap'; // Import GSAP
import '../assets/hero.css';
import heroImage from '../public/hero-house.jpg';

const Hero: React.FC = () => {
  // Tạo refs để tham chiếu đến các phần tử DOM cần animate
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Tạo một timeline để quản lý chuỗi animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Animation cho ảnh nền (Zoom nhẹ từ to về nhỏ + Fade in)
    tl.fromTo(
      imageRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5 }
    );

    // 2. Animation cho các dòng chữ (Bay từ dưới lên + Fade in)
    // stagger: 0.2 nghĩa là mỗi phần tử cách nhau 0.2s
    tl.fromTo(
      [titleRef.current, textRef.current, btnRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
      '-=1' // Bắt đầu chạy khi animation ảnh chưa kết thúc (tạo cảm giác mượt hơn)
    );

    // Cleanup function (tốt cho React 18 strict mode)
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="container hero-content">
        {/* Gán ref vào thẻ h1 */}
        <h1 ref={titleRef} style={{ opacity: 0 }}> {/* Ẩn mặc định để tránh chớp nháy */}
          3D <span className="highlight">Architectural & Interior</span> Design
        </h1>
        
        {/* Gán ref vào thẻ p */}
        <p ref={textRef} style={{ opacity: 0 }}>
          Specializing in creating realistic 3D models for residential properties
          and interiors. I transform your ideas into vivid designs with high
          precision and exceptional aesthetics.
        </p>
        
        {/* Gán ref vào nút */}
        <a href="#portfolio" className="btn" ref={btnRef} style={{ opacity: 0 }}>
          View Portfolio
        </a>
      </div>

      <div className="hero-bg">
        <img
          ref={imageRef} 
          src={heroImage}
          alt="Modern 3D house design visualization"
          className="hero-bg__image"
          style={{ opacity: 0 }} 
        />

        <div className="hero-bg__overlay-right"></div>
        <div className="hero-bg__overlay-top"></div>
      </div>
    </section>
  );
};

export default Hero;