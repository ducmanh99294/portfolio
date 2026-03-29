import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/portfolio.css';
import portfolio1 from "../public/portfolio-1.jpg";
import portfolio2 from "../public/portfolio-2.jpg";
import portfolio3 from "../public/portfolio-3.jpg";
// Đăng ký Plugin
gsap.registerPlugin(ScrollTrigger);

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const projects: any[] = [
    // {
    //   id: 1,
    //   title: 'Modern Villa',
    //   description: 'Complete 3D design of a 2-story villa with minimalist style, combining open spaces and natural light.',
    //   imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80'
    // },
    // {
    //   id: 2,
    //   title: 'Luxury Apartment',
    //   description: '3D model of a 3-bedroom apartment with sophisticated interior design focused on functionality and aesthetics.',
    //   imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1558&q=80'
    // },
    // {
    //   id: 3,
    //   title: 'Contemporary Townhouse',
    //   description: '3D design of a 4-story townhouse with impressive façade and interior spaces optimized for multi-generational families.',
    //   imageUrl: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    // },
    // {
    //   id: 4,
    //   title: 'Creative Workspace',
    //   description: 'Office interior design with an open concept, combining work and relaxation areas.',
    //   imageUrl: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    // },
  {
    image: portfolio1,
    title: "The Hearth Residence",
    subtitle: "Stone · Timber · Light",
    alt: "Living room with stone fireplace and timber beams",
  },
  {
    image: portfolio2,
    title: "Artisan Kitchen",
    subtitle: "Walnut · Concrete · Copper",
    alt: "Modern kitchen with handcrafted wooden cabinetry",
  },
  {
    image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop",
    title: "The Sanctuary",
    subtitle: "Stone · Cedar · Water",
    alt: "Luxury bathroom with freestanding stone bathtub",
  },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // 🔥 TIMELINE CHÍNH
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // 👉 TITLE REVEAL (tách từng dòng)
      tl.from(".work-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });

      tl.from(".work-title span", {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out"
      }, "-=0.3");

      // 👉 ITEMS (cinematic hơn)
      tl.from(".work-item", {
        y: 100,
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)",
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        clearProps: "all"
      }, "-=0.4");


      // 🔥 PARALLAX IMAGE (rất đáng giá)
      gsap.utils.toArray<HTMLElement>(".work-image-wrapper").forEach((el) => {
        const img = el.querySelector("img");

        gsap.to(img, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="work-section">
      <div className="work-header">
        <p className="work-subtitle">
          Selected Work
        </p>

        <h2 className="work-title">
          <span>Rooms that remember</span>
          <span>who built them.</span>
        </h2>
      </div>

      <div className="work-grid">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className={`work-item ${
              i === 0 ? "span-7" : i === 1 ? "span-5" : "span-12"
            }`}
          >
            <div className={`work-image-wrapper ${i === 2 ? "tall" : ""}`}>
              <img
                src={project.image}
                alt={project.alt}
                className="work-image"
              />
              <div className="work-overlay-depth" />
            </div>

            <div className="work-info">
              <p className="work-item-subtitle">
                {project.subtitle}
              </p>
              <h3 className="work-item-title">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;