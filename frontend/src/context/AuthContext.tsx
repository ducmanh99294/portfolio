import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotify } from '../hooks/UseNotification';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider?: 'email' | 'google' | 'facebook' | 'instagram';
  createdAt: Date;
}

export interface RegisterCredentials {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    acceptTerms: boolean
}

export interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}


export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithInstagram: () => Promise<void>;
  loginAsGuest: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const notify = useNotify();

  // Mock users for demo (in real app, this would be API calls)
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      provider: 'email',
      createdAt: new Date()
    }
  ];

  // Check for saved user on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('auth_token');
        
        if (savedUser && savedToken) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          
          // In real app, validate token with backend
          console.log('Auto-login with saved user');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Email/Password Login
  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      const mockUser = mockUsers.find(u => u.email === credentials.email);
      
      if (!mockUser) {
        throw new Error('User not found. Try demo@example.com');
      }
      
      // Mock password validation (in real app, compare hashed passwords)
      if (credentials.password !== 'demo123') {
        throw new Error('Invalid password. Try "demo123"');
      }
      
      // Create auth token
      const token = btoa(`${mockUser.id}:${Date.now()}`);
      
      // Save to localStorage if remember me is checked
      if (credentials.rememberMe) {
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('auth_token', token);
      } else {
        sessionStorage.setItem('user', JSON.stringify(mockUser));
        sessionStorage.setItem('auth_token', token);
      }
      
      setUser(mockUser);
      notify.success(`Welcome back, ${mockUser.name}!`, 'Login Successful');
      navigate('/');
      
    } catch (error: any) {
      notify.error(error.message || 'Login failed', 'Login Error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Registration
  const register = async (data: RegisterData): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === data.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: data.email,
        name: data.name,
        provider: 'email',
        createdAt: new Date()
      };
      
      // Save user (in real app, send to backend)
      const token = btoa(`${newUser.id}:${Date.now()}`);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('auth_token', token);
      
      setUser(newUser);
      notify.success('Account created successfully!', 'Registration Complete');
      navigate('/');
      
    } catch (error: any) {
      notify.error(error.message || 'Registration failed', 'Registration Error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Social Login Handlers (Mock implementations)
  const loginWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock Google user
      const googleUser: User = {
        id: `google-${Date.now()}`,
        email: 'google.user@example.com',
        name: 'Google User',
        avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        provider: 'google',
        createdAt: new Date()
      };
      
      const token = btoa(`${googleUser.id}:${Date.now()}`);
      localStorage.setItem('user', JSON.stringify(googleUser));
      localStorage.setItem('auth_token', token);
      
      setUser(googleUser);
      notify.success('Signed in with Google', 'Login Successful');
      navigate('/');
      
    } catch (error: any) {
      notify.error('Google login failed', 'Login Error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithFacebook = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const facebookUser: User = {
        id: `facebook-${Date.now()}`,
        email: 'facebook.user@example.com',
        name: 'Facebook User',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        provider: 'facebook',
        createdAt: new Date()
      };
      
      const token = btoa(`${facebookUser.id}:${Date.now()}`);
      localStorage.setItem('user', JSON.stringify(facebookUser));
      localStorage.setItem('auth_token', token);
      
      setUser(facebookUser);
      notify.success('Signed in with Facebook', 'Login Successful');
      navigate('/');
      
    } catch (error: any) {
      notify.error('Facebook login failed', 'Login Error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithInstagram = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const instagramUser: User = {
        id: `instagram-${Date.now()}`,
        email: 'instagram.user@example.com',
        name: 'Instagram User',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        provider: 'instagram',
        createdAt: new Date()
      };
      
      const token = btoa(`${instagramUser.id}:${Date.now()}`);
      localStorage.setItem('user', JSON.stringify(instagramUser));
      localStorage.setItem('auth_token', token);
      
      setUser(instagramUser);
      notify.success('Signed in with Instagram', 'Login Successful');
      navigate('/');
      
    } catch (error: any) {
      notify.error('Instagram login failed', 'Login Error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Guest Login
  const loginAsGuest = (): void => {
    const guestUser: User = {
      id: 'guest',
      email: 'guest@example.com',
      name: 'Guest User',
      provider: undefined,
      createdAt: new Date()
    };
    
    sessionStorage.setItem('user', JSON.stringify(guestUser));
    sessionStorage.setItem('guest_mode', 'true');
    
    setUser(guestUser);
    notify.info('You are now browsing as a guest', 'Guest Mode Activated');
    navigate('/');
  };

  // Logout
  const logout = (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('guest_mode');
    
    setUser(null);
    notify.info('You have been logged out', 'Logout Successful');
    navigate('/login');
  };

  // Forgot Password
  const forgotPassword = async (email: string): Promise<void> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email) {
        throw new Error('Please enter your email address');
      }
      
      notify.success(
        `Password reset instructions sent to ${email}`,
        'Check Your Email',
        { duration: 5000 }
      );
      
    } catch (error: any) {
      notify.error(error.message || 'Failed to send reset email', 'Error');
      throw error;
    }
  };

  // Reset Password
  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!token || !newPassword) {
        throw new Error('Invalid reset request');
      }
      
      notify.success('Password has been reset successfully', 'Password Reset');
      
    } catch (error: any) {
      notify.error(error.message || 'Failed to reset password', 'Error');
      throw error;
    }
  };

  // Update Profile
  const updateProfile = async (data: Partial<User>): Promise<void> => {
    try {
      if (!user) throw new Error('Not authenticated');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      
      // Update storage
      const storage = localStorage.getItem('auth_token') ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(updatedUser));
      
      notify.success('Profile updated successfully', 'Update Complete');
      
    } catch (error: any) {
      notify.error(error.message || 'Failed to update profile', 'Error');
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loginWithGoogle,
    loginWithFacebook,
    loginWithInstagram,
    loginAsGuest,
    forgotPassword,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};