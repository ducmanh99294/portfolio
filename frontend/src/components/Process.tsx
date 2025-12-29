import React, { useState, useEffect } from 'react';
import '../assets/process.css';

const WorkProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Data for process steps
  const processSteps = [
    {
      id: 1,
      icon: 'fas fa-handshake',
      title: 'Initial Consultation & Order',
      duration: '1-2 Days',
      description: 'We start by understanding your vision, requirements, and expectations. This is where we establish clear communication channels and project scope.',
      features: [
        'Free initial consultation',
        'Project requirement analysis',
        'Budget and timeline discussion',
        'Contract signing and project kickoff'
      ],
      color: '#8B7355'
    },
    {
      id: 2,
      icon: 'fas fa-lightbulb',
      title: 'Ideation & Concept Development',
      duration: '3-5 Days',
      description: 'Our creative team brainstorms and develops initial concepts based on your requirements. We explore different design directions and possibilities.',
      features: [
        'Mood board creation',
        'Color palette selection',
        'Initial concept sketches',
        'Material and finish suggestions'
      ],
      color: '#9A825F'
    },
    {
      id: 3,
      icon: 'fas fa-pencil-alt',
      title: 'Sketching & Preliminary Design',
      duration: '5-7 Days',
      description: 'We create preliminary sketches and 2D layouts to visualize the initial concepts. This stage includes spatial planning and functional layout.',
      features: [
        '2D floor plans',
        'Preliminary sketches',
        'Spatial arrangement',
        'Furniture layout planning'
      ],
      color: '#A89169'
    },
    {
      id: 4,
      icon: 'fas fa-comments',
      title: 'Client Review & Feedback',
      duration: '2-3 Days',
      description: 'We present the initial designs to you and gather your feedback. Your input is crucial at this stage to ensure we\'re on the right track.',
      features: [
        'Design presentation',
        'Client feedback collection',
        'Revision planning',
        'Detailed discussion session'
      ],
      color: '#B6A073'
    },
    {
      id: 5,
      icon: 'fas fa-edit',
      title: 'Revisions & Refinement',
      duration: '4-6 Days',
      description: 'Based on your feedback, we refine and improve the designs. This iterative process continues until you\'re completely satisfied.',
      features: [
        'Design modifications',
        'Detail enhancements',
        'Material adjustments',
        'Cost optimization'
      ],
      color: '#C4AF7D'
    },
    {
      id: 6,
      icon: 'fas fa-check-circle',
      title: 'Final Design Delivery',
      duration: '2-3 Days',
      description: 'We deliver the final, polished design package including all necessary files, renderings, and specifications for implementation.',
      features: [
        'High-resolution 3D renderings',
        'Detailed specifications',
        'Material lists and sources',
        'Implementation guidelines'
      ],
      color: '#D4B896'
    }
  ];

  // Stats data
  const stats = [
    { number: '100%', label: 'Client Satisfaction' },
    { number: '48h', label: 'Average Response Time' },
    { number: '3x', label: 'Revision Cycles Included' },
    { number: '95%', label: 'Projects On Time' }
  ];

  // Feedback options
  const feedbackOptions = [
    { icon: 'fas fa-video', text: 'Schedule Video Call', action: () => alert('Video call scheduling feature coming soon!') },
    { icon: 'fas fa-comment-dots', text: 'Send Message', action: () => alert('Messaging feature coming soon!') },
    { icon: 'fas fa-file-upload', text: 'Upload Reference Images', action: () => alert('File upload feature coming soon!') },
    { icon: 'fas fa-question-circle', text: 'Ask Questions', action: () => alert('FAQ/Questions feature coming soon!') }
  ];

  useEffect(() => {
    // Simple scroll animation trigger
    const handleScroll = () => {
      const steps = document.querySelectorAll('.process-step');
      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCtaClick = (type: string) => {
    if (type === 'start') {
      alert('Starting a new project! This would open a project initiation form.');
    } else if (type === 'portfolio') {
      window.location.href = '/#portfolio';
    }
  };

  return (
    <div className="work-process-page">
      <div className="work-process-container">
        {/* Header Section */}
        <div className="work-process-header">
          <h1>Our Work Process</h1>
          <p>
            At 3DArch, we follow a transparent and collaborative workflow that ensures your vision 
            is perfectly realized. From initial concept to final delivery, you're involved at every 
            step of the journey.
          </p>
          
          <div className="process-stats">
            {stats.map((stat, index) => (
              <div className="stat-item" key={index}>
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="process-timeline">
          <div className="timeline-line"></div>
          
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div 
                className="process-step" 
                key={step.id}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="step-number">{step.id}</div>
                
                <div className="step-content">
                  <div className="step-icon">
                    <i className={step.icon}></i>
                  </div>
                  
                  <h3>{step.title}</h3>
                  <span className="step-duration">{step.duration}</span>
                  
                  <p>{step.description}</p>
                  
                  <ul className="step-features">
                    {step.features.map((feature, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {step.id === 4 && (
                    <div className="client-note">
                      <i className="fas fa-info-circle" style={{ color: step.color }}></i>
                      <span style={{ color: step.color, marginLeft: '8px', fontWeight: '500' }}>
                        This is a collaborative phase where your feedback shapes the final design
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Feedback Section */}
        <div className="interactive-section">
          <h2>Your Feedback Matters</h2>
          <p>
            We believe in continuous collaboration. At <strong>ANY</strong> point during the process, 
            you can provide feedback, ask questions, or request changes. Your satisfaction is our priority.
          </p>
          
          <div className="feedback-buttons">
            {feedbackOptions.map((option, index) => (
              <button 
                key={index}
                className="feedback-btn"
                onClick={option.action}
              >
                <i className={option.icon}></i>
                {option.text}
              </button>
            ))}
          </div>
          
          <div className="flexible-process-note">
            <i className="fas fa-sync-alt" style={{ color: 'var(--color-primary)', fontSize: '1.5rem' }}></i>
            <p style={{ marginTop: '15px', color: 'var(--color-text-light)' }}>
              <strong>Flexible Process:</strong> Our workflow adapts to your needs. Need more revisions? 
              Want to see additional options? Just let us know!
            </p>
          </div>
        </div>

        {/* Communication Channels */}
        <div className="communication-section" style={{ marginTop: '60px' }}>
          <h2 style={{ textAlign: 'center', color: 'var(--color-accent)', marginBottom: '30px' }}>
            Always Accessible
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '30px',
            marginTop: '40px'
          }}>
            <div style={{ 
              backgroundColor: 'var(--color-card)', 
              padding: '30px', 
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <i className="fas fa-clock" style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '20px' }}></i>
              <h3 style={{ color: 'var(--color-accent)', marginBottom: '15px' }}>Regular Updates</h3>
              <p style={{ color: 'var(--color-text-light)' }}>
                Receive progress updates every 48 hours with visual previews
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: 'var(--color-card)', 
              padding: '30px', 
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <i className="fas fa-comments" style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '20px' }}></i>
              <h3 style={{ color: 'var(--color-accent)', marginBottom: '15px' }}>Direct Communication</h3>
              <p style={{ color: 'var(--color-text-light)' }}>
                Direct access to the design team via your preferred channel
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: 'var(--color-card)', 
              padding: '30px', 
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <i className="fas fa-file-alt" style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '20px' }}></i>
              <h3 style={{ color: 'var(--color-accent)', marginBottom: '15px' }}>Documented Feedback</h3>
              <p style={{ color: 'var(--color-text-light)' }}>
                All feedback is documented and tracked for clear communication
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2>Ready to Start Your Project?</h2>
          <p>
            Let's bring your vision to life with our proven workflow and collaborative approach.
            Get in touch to discuss your project requirements.
          </p>
          
          <div className="cta-buttons">
            <button 
              className="cta-btn-primary"
              onClick={() => handleCtaClick('start')}
            >
              <i className="fas fa-rocket"></i>
              Start a Project
            </button>
            
            <button 
              className="cta-btn-secondary"
              onClick={() => handleCtaClick('portfolio')}
            >
              <i className="fas fa-eye"></i>
              View Our Portfolio
            </button>
          </div>
        </div>

        {/* Process Summary */}
        <div className="process-summary" style={{ 
          backgroundColor: 'rgba(139, 115, 85, 0.1)', 
          padding: '40px', 
          borderRadius: '20px',
          marginTop: '60px'
        }}>
          <h3 style={{ color: 'var(--color-accent)', textAlign: 'center', marginBottom: '20px' }}>
            Key Takeaways
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px',
            marginTop: '30px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <i className="fas fa-users" style={{ color: 'var(--color-primary)', fontSize: '1.2rem', marginTop: '5px' }}></i>
              <div>
                <h4 style={{ color: 'var(--color-accent)', marginBottom: '8px' }}>Collaborative Approach</h4>
                <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem' }}>
                  You're involved at every stage, not just at the beginning and end
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <i className="fas fa-history" style={{ color: 'var(--color-primary)', fontSize: '1.2rem', marginTop: '5px' }}></i>
              <div>
                <h4 style={{ color: 'var(--color-accent)', marginBottom: '8px' }}>Flexible Timeline</h4>
                <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem' }}>
                  Process adapts to your schedule and feedback timing
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <i className="fas fa-shield-alt" style={{ color: 'var(--color-primary)', fontSize: '1.2rem', marginTop: '5px' }}></i>
              <div>
                <h4 style={{ color: 'var(--color-accent)', marginBottom: '8px' }}>Quality Assurance</h4>
                <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem' }}>
                  Multiple review stages ensure the highest quality output
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkProcess;