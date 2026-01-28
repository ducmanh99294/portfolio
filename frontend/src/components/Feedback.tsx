import React, { useState } from 'react';
import '../assets/feedback.css';
import { Testimonial, Project } from '../types/feedback';

const Feedback: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'interior-design',
    message: '',
    allowSharing: false,
    subscribe: false
  });

  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Homeowner',
      company: 'Private Residence',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      rating: 5,
      content: 'Working with 3DArch was an absolute pleasure. They transformed our outdated living room into a modern masterpiece. Their attention to detail and willingness to incorporate our feedback made the process smooth and enjoyable.',
      projectType: 'Living Room Renovation',
      tags: ['Modern', 'Minimalist', 'Family-friendly'],
      date: 'March 2024'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CEO',
      company: 'TechStart Inc.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      rating: 5,
      content: 'The office redesign exceeded our expectations. The team understood our need for a collaborative yet professional space. The 3D renderings were so accurate that the final result matched perfectly.',
      projectType: 'Office Interior Design',
      tags: ['Office', 'Collaborative', 'Tech'],
      date: 'February 2024'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Restaurant Owner',
      company: 'Bella Vista Restaurant',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      rating: 4,
      content: 'Our restaurant needed a complete overhaul to match our new culinary direction. 3DArch delivered a stunning design that captures both elegance and warmth. Customer feedback has been incredibly positive since the renovation.',
      projectType: 'Restaurant Design',
      tags: ['Commercial', 'Hospitality', 'Elegant'],
      date: 'January 2024'
    },
    {
      id: 4,
      name: 'David Park',
      role: 'Architect',
      company: 'Urban Design Collective',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      rating: 5,
      content: 'As a fellow design professional, I was impressed by their technical expertise and creative vision. They handled the complex requirements of our luxury apartment project with precision and innovation.',
      projectType: 'Luxury Apartment Complex',
      tags: ['Luxury', 'Architectural', 'Complex'],
      date: 'December 2023'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Hotel Manager',
      company: 'Grand Horizon Hotel',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      rating: 5,
      content: 'The lobby redesign has completely transformed our guest experience. The team worked within our strict timeline and budget constraints while delivering a breathtaking result. Highly recommended!',
      projectType: 'Hotel Lobby Renovation',
      tags: ['Hospitality', 'Luxury', 'Renovation'],
      date: 'November 2023'
    },
    {
      id: 6,
      name: 'Robert Kim',
      role: 'Real Estate Developer',
      company: 'Skyline Properties',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      rating: 4,
      content: 'We\'ve used 3DArch for multiple show unit designs. Their ability to create aspirational yet realistic spaces has helped us sell properties faster. Their professionalism and reliability are outstanding.',
      projectType: 'Show Unit Design',
      tags: ['Real Estate', 'Show Unit', 'Luxury'],
      date: 'October 2023'
    }
  ];

  // Recent projects
  const recentProjects: Project[] = [
    {
      id: 1,
      title: 'Minimalist Apartment',
      description: 'Complete redesign of a 120sqm apartment with minimalist aesthetics',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      client: 'Private Client',
      duration: '6 weeks'
    },
    {
      id: 2,
      title: 'Corporate Headquarters',
      description: 'Modern office design for a tech company\'s new headquarters',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      client: 'TechCorp Inc.',
      duration: '12 weeks'
    },
    {
      id: 3,
      title: 'Boutique Hotel',
      description: 'Complete interior design for a 50-room boutique hotel',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      client: 'Urban Retreat Hotels',
      duration: '20 weeks'
    }
  ];

  // Stats data
  const stats = [
    { icon: 'fas fa-star', number: '4.9', label: 'Average Rating' },
    { icon: 'fas fa-users', number: '150+', label: 'Happy Clients' },
    { icon: 'fas fa-project-diagram', number: '200+', label: 'Projects Completed' },
    { icon: 'fas fa-clock', number: '98%', label: 'On-Time Delivery' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please provide a rating before submitting.');
      return;
    }
    
    // In a real app, you would send this data to your backend
    console.log('Feedback submitted:', { ...formData, rating });
    
    alert('Thank you for your feedback! We appreciate your input and will use it to improve our services.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      projectType: 'interior-design',
      message: '',
      allowSharing: false,
      subscribe: false
    });
    setRating(0);
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleStarHover = (value: number) => {
    setHoverRating(value);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="feedback-page">
      
      <div className="feedback-container">
        {/* Header Section */}
        <div className="feedback-header">
          <h1>Client Feedback & Reviews</h1>
          <p>
            Your satisfaction is our greatest achievement. Read what our clients have to say about 
            working with us, or share your own experience to help us serve you better.
          </p>
        </div>

        {/* Stats Section */}
        <div className="feedback-stats">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-icon">
                <i className={stat.icon}></i>
              </div>
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <div className="section-title">
            <h2>What Our Clients Say</h2>
            <p>Real feedback from clients who have experienced our design process</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.slice(0,3).map((testimonial) => (
              <div className="testimonial-card" key={testimonial.id}>
                <div className="testimonial-header">
                  <div className="client-avatar">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                  </div>
                  <div className="client-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}, {testimonial.company}</p>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star ${i < testimonial.rating ? 'filled' : ''}`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="testimonial-content">"{testimonial.content}"</p>
                
                <div className="project-tags">
                  <span className="project-tag">{testimonial.projectType}</span>
                  {testimonial.tags.map((tag, index) => (
                    <span key={index} className="project-tag">{tag}</span>
                  ))}
                </div>
                
                <div style={{ marginTop: '15px', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                  <i className="far fa-calendar"></i> {testimonial.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Form Section */}
        {/* <div className="feedback-form-section">
          <div className="form-header">
            <h2>Share Your Experience</h2>
            <p>We value your feedback. Help us improve by sharing your thoughts about working with us.</p>
          </div>

          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Smith"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company / Project</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your company or project name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectType">Project Type</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                >
                  <option value="interior-design">Interior Design</option>
                  <option value="architecture">Architecture</option>
                  <option value="furniture-design">Furniture Design</option>
                  <option value="renovation">Renovation</option>
                  <option value="commercial">Commercial Space</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Your Rating *</label>
                <div className="rating-input">
                  <div className="rating-stars">
                    {[5, 4, 3, 2, 1].map((value) => (
                      <React.Fragment key={value}>
                        <input
                          type="radio"
                          id={`star${value}`}
                          name="rating"
                          value={value}
                          checked={rating === value}
                          onChange={() => handleStarClick(value)}
                        />
                        <label
                          htmlFor={`star${value}`}
                          onMouseEnter={() => handleStarHover(value)}
                          onMouseLeave={handleStarLeave}
                        >
                          <i className={`fas fa-star ${value <= (hoverRating || rating) ? 'filled' : ''}`}></i>
                        </label>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="rating-value">
                    {rating > 0 ? `You rated: ${rating} star${rating > 1 ? 's' : ''}` : 'Click to rate'}
                  </div>
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Your Feedback *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about your experience working with us. What did you like? What could we improve?"
                  rows={4}
                />
              </div>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="allowSharing"
                name="allowSharing"
                checked={formData.allowSharing}
                onChange={handleInputChange}
              />
              <label htmlFor="allowSharing">
                I give permission to share my feedback (anonymously) on your website
              </label>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="subscribe"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleInputChange}
              />
              <label htmlFor="subscribe">
                Subscribe to our newsletter for design tips and updates
              </label>
            </div>

            <button type="submit" className="submit-btn">
              <i className="fas fa-paper-plane"></i> Submit Feedback
            </button>
          </form>
        </div> */}

        {/* Recent Projects Showcase */}
        <div className="projects-showcase">
          <div className="section-title">
            <h2>Recent Projects</h2>
            <p>See the work that earned us these glowing reviews</p>
          </div>

          <div className="projects-grid">
            {recentProjects.map((project) => (
              <div className="project-card" key={project.id}>
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-info">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="project-meta">
                    <span><i className="fas fa-user"></i> {project.client}</span>
                    <span><i className="fas fa-clock"></i> {project.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="feedback-cta">
          <h2>Ready to Share Your Vision?</h2>
          <p>
            Join our satisfied clients and experience the difference of working with a team 
            that truly cares about your project's success.
          </p>
          
          <div className="cta-buttons">
            <a href="/#contact" className="cta-btn cta-btn-primary">
              <i className="fas fa-envelope"></i>
              Start a Conversation
            </a>
            
            <a href="/#process" className="cta-btn cta-btn-secondary">
              <i className="fas fa-play-circle"></i>
              See Our Process
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;