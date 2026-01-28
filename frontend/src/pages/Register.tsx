import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, RegisterCredentials, RegisterErrors } from '../context/AuthContext';
import { useNotify } from '../hooks/UseNotification';
import { register } from '../api/userApi';
import '../assets/register.css';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithFacebook, loginWithInstagram } = useAuth();
  const notify = useNotify();
  
  const [formData, setFormData] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState<Partial<RegisterErrors>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof RegisterCredentials]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterErrors> = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and numbers';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms acceptance validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      notify.error('Please fix the form errors', 'Validation Error');
      return;
    }
    
    setIsLoading(true);
    try {
      await register(formData.email,formData.password);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (provider: 'google' | 'facebook' | 'instagram') => {
    setIsLoading(true);
    try {
      switch (provider) {
        case 'google':
          await loginWithGoogle();
          break;
        case 'facebook':
          await loginWithFacebook();
          break;
        case 'instagram':
          await loginWithInstagram();
          break;
      }
    } catch (error) {
      console.error(`${provider} registration error:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 10;
    
    // Complexity checks
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 15;
    
    // Determine label and color
    if (strength < 50) {
      return { strength, label: 'Weak', color: '#e74c3c' };
    } else if (strength < 75) {
      return { strength, label: 'Fair', color: '#f39c12' };
    } else if (strength < 90) {
      return { strength, label: 'Good', color: '#3498db' };
    } else {
      return { strength, label: 'Strong', color: '#2ecc71' };
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          {/* Logo Section */}
          <div className="register-logo">
            <div className="logo-circle">
              <i className="fas fa-user-plus"></i>
            </div>
            <h1>Join 3DArch</h1>
            <p>Create your account to start showcasing 3D designs</p>
          </div>

          {/* Registration Form */}
          <form className="register-form" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-with-icon">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('password')}
                  tabIndex={-1}
                  disabled={isLoading}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-meter">
                    <div 
                      className="strength-bar" 
                      style={{
                        width: `${passwordStrength.strength}%`,
                        backgroundColor: passwordStrength.color
                      }}
                    ></div>
                  </div>
                  <span className="strength-label" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}
              
              {/* Password Requirements */}
              <div className="password-requirements">
                <p className="requirements-title">Password must contain:</p>
                <ul>
                  <li className={formData.password.length >= 8 ? 'valid' : ''}>
                    <i className={`fas ${formData.password.length >= 8 ? 'fa-check-circle' : 'fa-circle'}`}></i>
                    At least 8 characters
                  </li>
                  <li className={/[a-z]/.test(formData.password) ? 'valid' : ''}>
                    <i className={`fas ${/[a-z]/.test(formData.password) ? 'fa-check-circle' : 'fa-circle'}`}></i>
                    One lowercase letter
                  </li>
                  <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                    <i className={`fas ${/[A-Z]/.test(formData.password) ? 'fa-check-circle' : 'fa-circle'}`}></i>
                    One uppercase letter
                  </li>
                  <li className={/\d/.test(formData.password) ? 'valid' : ''}>
                    <i className={`fas ${/\d/.test(formData.password) ? 'fa-check-circle' : 'fa-circle'}`}></i>
                    One number
                  </li>
                </ul>
              </div>
              
              {errors.password && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  tabIndex={-1}
                  disabled={isLoading}
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="form-group terms-group">
              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <label htmlFor="acceptTerms">
                  I agree to the <Link to="/terms" target="_blank">Terms of Service</Link> and <Link to="/privacy" target="_blank">Privacy Policy</Link>
                </label>
              </div>
              {errors.acceptTerms && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.acceptTerms}
                </div>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="register-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Creating Account...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus"></i>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>Or sign up with</span>
          </div>

          {/* Social Registration */}
          <div className="social-register">
            <button
              type="button"
              className="social-btn google"
              onClick={() => handleSocialRegister('google')}
              disabled={isLoading}
            >
              <i className="fab fa-google"></i>
              Sign up with Google
            </button>

            <button
              type="button"
              className="social-btn facebook"
              onClick={() => handleSocialRegister('facebook')}
              disabled={isLoading}
            >
              <i className="fab fa-facebook-f"></i>
              Sign up with Facebook
            </button>

            <button
              type="button"
              className="social-btn instagram"
              onClick={() => handleSocialRegister('instagram')}
              disabled={isLoading}
            >
              <i className="fab fa-instagram"></i>
              Sign up with Instagram
            </button>
          </div>

          {/* Login Link */}
          <div className="login-link">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </div>

          {/* Back Home */}
          <div className="back-home">
            <Link to="/">
              <i className="fas fa-arrow-left"></i>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Creating your account...</p>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;