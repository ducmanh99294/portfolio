import React from "react";
import { useState } from "react";

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
           <div className="feedback-form-section">
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
        </div>
   )
    };

export default Feedback;