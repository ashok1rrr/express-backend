import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import api from '../api';
import './Login.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/login', {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem('token', response.data.token);
      login(response.data.token, { email: data.email });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError(error.response?.status === 400 
        ? 'Invalid email or password. Please try again.'
        : 'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}
    >
      {/* Theme Switcher Button */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: isDarkMode ? '#333' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>

      {/* Login Form */}
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        {/* Email Input */}
        <input
          {...register('email', { required: 'Email is required' })}
          placeholder="Email"
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}

        {/* Password Input */}
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}

        {/* Login Error Message */}
        {loginError && <p className="error-message">{loginError}</p>}

        {/* Submit Button */}
        <button type="submit">Login</button>

        {/* Signup Link */}
        <p>
          Don't have an account?{' '}
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </form>
    </motion.div>
  );
};

export default Login;
