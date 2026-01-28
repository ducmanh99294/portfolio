import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, LoginCredentials } from '../context/AuthContext';
import { useNotify } from '../hooks/UseNotification';
import { login } from '../api/userApi';
import '../assets/login.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithGoogle, loginWithFacebook, loginWithInstagram, loginAsGuest } = useAuth();
  const notify = useNotify();
  const from = location.state?.from?.pathname || "/";
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const { forgotPassword } = useAuth();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof LoginCredentials]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginCredentials> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      await login(formData.email,formData.password);
      navigate(from, { replace: true });
    } catch (error) {
      // Error is already handled by auth context
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@example.com',
      password: 'demo123',
      rememberMe: true
    });
    
    notify.info('Demo credentials filled. Click Login to continue.', 'Demo Mode');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail.trim()) {
      notify.error('Please enter your email address', 'Email Required');
      return;
    }
    
    setIsLoading(true);
    try {

      await forgotPassword(forgotPasswordEmail);
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
    } catch (error) {
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'instagram') => {
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
      console.error(`${provider} login error:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          {/* Logo Section */}
          <div className="login-logo">
            <div className="logo-circle">
              <i className="fas fa-cube"></i>
            </div>
            <h1>3DArch</h1>
            <p>Sign in to access your 3D design portfolio</p>
          </div>

          {/* Forgot Password Modal */}
          {showForgotPassword && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2 style={{ color: 'var(--color-accent)', marginBottom: '20px', textAlign: 'center' }}>
                  Reset Password
                </h2>
                <p style={{ color: 'var(--color-text-light)', marginBottom: '25px', textAlign: 'center' }}>
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
                
                <form onSubmit={handleForgotPassword}>
                  <div className="form-group">
                    <label htmlFor="forgotEmail">Email Address</label>
                    <div className="input-with-icon">
                      <i className="fas fa-envelope"></i>
                      <input
                        type="email"
                        id="forgotEmail"
                        className="form-input"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        placeholder="your@email.com"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                    <button
                      type="button"
                      className="social-btn"
                      onClick={() => setShowForgotPassword(false)}
                      style={{ flex: 1 }}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="login-btn"
                      style={{ flex: 1 }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane"></i>
                          Send Instructions
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit}>
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

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.password}
                </div>
              )}
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              
              <button
                type="button"
                className="forgot-password"
                onClick={() => setShowForgotPassword(true)}
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>Or continue with</span>
          </div>

          {/* Social Login */}
          <div className="social-login">
            <button
              type="button"
              className="social-btn google"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
            >
              <i className="fab fa-google"></i>
              Sign in with Google
            </button>

            <button
              type="button"
              className="social-btn facebook"
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading}
            >
              <i className="fab fa-facebook-f"></i>
              Sign in with Facebook
            </button>

            <button
              type="button"
              className="social-btn instagram"
              onClick={() => handleSocialLogin('instagram')}
              disabled={isLoading}
            >
              <i className="fab fa-instagram"></i>
              Sign in with Instagram
            </button>
          </div>

          {/* Demo Button */}
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="social-btn"
              disabled={isLoading}
              style={{ width: '100%' }}
            >
              <i className="fas fa-user-circle"></i>
              Use Demo Account
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="signup-link">
            Don't have an account?
            <Link to="/register">Create account</Link>
          </div>

          {/* Guest Access */}
          <div className="guest-access">
            <p>Just want to browse?</p>
            <button
              type="button"
              className="guest-btn"
              onClick={loginAsGuest}
              disabled={isLoading}
            >
              <i className="fas fa-user-secret"></i>
              Continue as Guest
            </button>
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
    </div>
  );
};

export default LoginPage;