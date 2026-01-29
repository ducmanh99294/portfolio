import React, { useState } from 'react';
import { ContactInfo } from '../types';
import '../assets/contact.css';
import { postContact } from '../api/contactApi';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const contactInfo: ContactInfo[] = [
    { type: 'Address', value: 'Danang, Vietnam', icon: 'fas fa-map-marker-alt' },
    { type: 'Email', value: 'contact@3darch.com', icon: 'fas fa-envelope' },
    { type: 'Phone', value: '+84 123 456 789', icon: 'fas fa-phone' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try{
      postContact(
        formData.email,
        formData.message,
        formData.name,
        formData.phone,
        formData.subject
      )
      alert('Thank you for your message! I will respond as soon as possible.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <p className="section-subtitle">Get in touch to discuss your project or if you have any questions.</p>
        
        <div className="contact-container">
          <div className="contact-info">
            {contactInfo.map((info, index) => (
              <div className="contact-item" key={index}>
                <div className="contact-icon">
                  <i className={info.icon}></i>
                </div>
                <div>
                  <h3>{info.type}</h3>
                  <p>{info.value}</p>
                </div>
              </div>
            ))}
            
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-behance"></i>
              </a>
            </div>
          </div>
          
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="phone"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>  

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;