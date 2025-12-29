import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/about.css';

// Đăng ký Plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  // Tạo ref cho container bao quanh để scope (giới hạn) vùng chọn của GSAP
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    // Sử dụng gsap.context để quản lý việc cleanup (dọn dẹp) tự động khi React unmount
    let ctx = gsap.context(() => {
      
      // Tạo Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current, // Phần tử kích hoạt
          start: "top 80%",              // Chạy khi đầu section chạm mốc 80% chiều cao màn hình
          end: "bottom 20%",
          toggleActions: "play none none reverse", // Lướt xuống thì chạy, lướt ngược lên quá vùng thì tua lại (hoặc để 'none' nếu muốn chạy 1 lần)
        }
      });

      // 1. Animation cho Tiêu đề & Subtitle
      tl.from(".section-title, .section-subtitle", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });

      // 2. Animation cho Ảnh (Trượt từ trái, scale nhẹ)
      tl.from(".about-img", {
        x: -50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5"); // Chạy sớm hơn 0.5s so với timeline (chồng lấn animation trước)

      // 3. Animation cho Text nội dung & Nút (Trượt từ phải)
      tl.from(".about-text > *", { // Chọn tất cả con trực tiếp của .about-text
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15, // Mỗi đoạn văn hiện cách nhau 0.15s
        ease: "power2.out"
      }, "-=0.8"); // Chạy song song với ảnh

    }, containerRef); // Scope: Chỉ tìm class bên trong containerRef này

    return () => ctx.revert(); // Dọn dẹp sạch sẽ khi component bị hủy
  }, []);

  return (
    <section className="section" id="about" ref={containerRef}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          With over 5 years of experience in 3D architectural and interior design, 
          I have created hundreds of models for projects ranging from apartments to luxury villas.
        </p>
        
        <div className="about-content">
          <div className="about-img">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80" 
              alt="Profile" 
            />
          </div>
          <div className="about-text">
            <h3>Professional 3D Architectural Designer</h3>
            <p>
              I am a professional 3D designer with a passion for creating beautiful and functional living spaces. 
              I believe every design should harmoniously combine aesthetics, functionality, and comfort for its inhabitants.
            </p>
            <p>
              I have collaborated with numerous architects, interior designers, and private clients to bring their ideas to life 
              through realistic 3D models, high-quality renders, and presentation animations.
            </p>
            <p>
              My design style focuses on sophistication and modernity while maintaining the warmth and familiarity of living spaces.
            </p>
            <div> {/* Bọc thẻ a trong div để animation mượt hơn nếu thẻ a là inline-block */}
                <a href="#contact" className="btn">Contact Me</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;