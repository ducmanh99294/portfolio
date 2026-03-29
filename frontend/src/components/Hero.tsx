import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap'; // Import GSAP
import '../assets/hero.css';
import heroInterior from "../public/hero-interior.jpg";
import heroSketch from "../public//hero-sketch.jpg";

const Hero: React.FC = () => {
  // Tạo refs để tham chiếu đến các phần tử DOM cần animate
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef2 = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

useEffect(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Background
  tl.fromTo(
    imageRef.current,
    { scale: 1.2, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.5 }
  );

  // Subtitle
  tl.fromTo(
    subtitleRef.current,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    "-=1"
  );

  // Title (chia chữ để animate đẹp hơn)
  const title = titleRef2.current;
  if (title) {
    const chars = title.innerText.split("");
    title.innerHTML = chars
      .map((c) => `<span class="char">${c === " " ? "&nbsp;" : c}</span>`)
      .join("");

    const charElements = title.querySelectorAll(".char");

    tl.fromTo(
      charElements,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
      },
      "-=0.6"
    );
  }

  // Description
  tl.fromTo(
    descRef.current,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    "-=0.5"
  );

  return () => tl.kill();
}, []);

  return (
    <section className="hero" id="home">
      <div className="hero-content-wrapper">
          <p ref={subtitleRef} className="hero-subtitle">
            Interior Design & Architectural Fabrication
          </p>

          <h1 ref={titleRef2} className="hero-title">
            <span>We build spaces</span>
            <span>you can feel.</span>
          </h1>

        <p ref={descRef} className="hero-description">
          Hover over the image to reveal the craft beneath the surface.
        </p>
      </div>

      <div 
          className="hero-bg"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}>
        <img
          ref={imageRef} 
          src={heroInterior}
          alt="Modern 3D house design visualization"
          className="hero-bg__image"
          style={{ opacity: 0 }} 
        />
<div
  className="hero-sketch-mask"
          style={{
            opacity: isHovering ? 1 : 0,
            backgroundImage: `url(${heroSketch})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          }}
        />

        {isHovering && (
          <div
            className="hero-glow"
            style={{
              background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, hsl(30 60% 50% / 0.15), transparent)`,
            }}
          />
        )}

        {/* Inset shadow overlay */}
        <div className="hero-shadow" />

        <div className="hero-bg__overlay-right"></div>
        <div className="hero-bg__overlay-top"></div>
      </div>
    </section>
  );
};

export default Hero;