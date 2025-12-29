import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Skill } from '../types';
import '../assets/skills.css'; // Đảm bảo import đúng file css trên

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const skills: Skill[] = [
    { id: 1, title: '3D Modeling', description: 'Creating detailed and accurate 3D models for architectural structures and interiors with high complexity.', icon: 'fas fa-cube' },
    { id: 2, title: 'Texturing & Materials', description: 'Applying realistic materials and textures to bring models to life with depth and authenticity.', icon: 'fas fa-palette' },
    { id: 3, title: 'Lighting & Rendering', description: 'Setting up lighting and rendering high-quality images to create photorealistic visualizations.', icon: 'fas fa-sun' },
    { id: 4, title: '3D Animation', description: 'Creating space presentation animations, allowing clients to "walk through" designs before construction.', icon: 'fas fa-video' },
    { id: 5, title: 'Interior Design', description: 'Arranging furniture optimally, selecting colors and materials to create perfect living spaces.', icon: 'fas fa-home' },
    { id: 6, title: 'Specialized Tools', description: 'Proficient in: 3Ds Max, Blender, SketchUp, V-Ray, Corona, AutoCAD, and Photoshop.', icon: 'fas fa-tools' },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animation tiêu đề
      tl.from(".section-title, .section-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });

      // Animation Card
      tl.from(".skill-card", {
        y: 60,              // Trượt từ dưới lên
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,       // Các card hiện lần lượt
        ease: "power3.out", // Hiệu ứng mượt mà, không nảy (để trông sang trọng)
        clearProps: "all"   // QUAN TRỌNG: Trả lại layout cho CSS Grid sau khi xong
      }, "-=0.5");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="skills" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="section-subtitle">
          I possess deep expertise in 3D architectural and interior design, 
          proficiently using the most advanced tools in the industry.
        </p>
        
        <div className="skills-container">
          {skills.map((skill) => (
            <div className="skill-card" key={skill.id}>
              <div className="skill-icon">
                <i className={skill.icon}></i>
              </div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;