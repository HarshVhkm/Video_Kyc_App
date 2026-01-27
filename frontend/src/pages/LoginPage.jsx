import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config/api";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import { VisibilityOff, Visibility, Email, Lock } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

import loginImage from '../assets/login-bg.png';
import wavingHand from '../assets/waving-hand.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const roleMap = {
    agent: 1,
    auditor: 2,
    "super-admin": 3,
  };

  useEffect(() => {
    localStorage.removeItem("agtLoginId");
    localStorage.removeItem("otpExpiry");
    localStorage.removeItem("token");
    localStorage.removeItem("roleId");
  }, []);

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    if (error) setError('');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password || !formData.role) {
      setError('Please fill all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          roleId: roleMap[formData.role], // ✅ added
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text.substring(0, 200));
        throw new Error("Server returned an unexpected response.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      localStorage.setItem('agtLoginId', data.agtLoginId);
      localStorage.setItem('roleId', roleMap[formData.role]); // ✅ added

      if (data.expiresAt) {
        localStorage.setItem('otpExpiry', data.expiresAt);
      } else {
        const fallbackExpiry = new Date(Date.now() + 5 * 60 * 1000);
        localStorage.setItem('otpExpiry', fallbackExpiry.toISOString());
      }

      localStorage.removeItem('token');
      navigate('/otp');

    } catch (error) {
      console.error('Login error:', error);

      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        setError("Cannot connect to server. Please try again later.");
      } else {
        setError(error.message || 'Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'white',
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        border: 'none',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          width: { xs: '0%', lg: '60%' },
          height: '100vh',
          display: { xs: 'none', lg: 'flex' },
          overflow: 'hidden'
        }}
      >
        <Box
          component="img"
          src={loginImage}
          alt="Login Visual"
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <Box
        sx={{
          width: { xs: '100%', lg: '40%' },
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 0, lg: 0 }
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 5, md: 6 },
            width: '100%',
            maxWidth: { xs: '100%', sm: '450px', md: '500px' },
            background: 'white',
            borderRadius: { xs: 0, sm: '16px' },
            height: { xs: '100%', sm: 'auto' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { xs: 'center', sm: 'flex-start' }
          }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, justifyContent: 'left' }}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: '#212529',
                  fontSize: { xs: '2rem', sm: '2.125rem', md: '2.25rem' },
                  lineHeight: 1.2
                }}
              >
                Hello, Again!
              </Typography>
              <Box
                component="img"
                src={wavingHand}
                alt="Waving hand"
                sx={{
                  width: { xs: '32px', sm: '34px', md: '36px' },
                  height: { xs: '32px', sm: '34px', md: '36px' }
                }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: '#212529',
                fontWeight: 500,
                fontSize: { xs: '1rem', sm: '1.05rem', md: '1.1rem' },
                display: 'flex'
              }}
            >
              Welcome Back
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: '8px',
                '& .MuiAlert-message': { fontSize: '0.875rem' }
              }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              value={formData.email}
              onChange={handleChange('email')}
              required
              disabled={loading}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#6c757d' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Enter your Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={formData.password}
              onChange={handleChange('password')}
              required
              disabled={loading}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#6c757d' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControl fullWidth sx={{ mb: 4 }} disabled={loading}>
              <InputLabel>Select Role</InputLabel>
              <Select
                value={formData.role}
                onChange={handleChange('role')}
                label="Select Role"
                required
              >
                <MenuItem value="agent">Agent</MenuItem>
                <MenuItem value="auditor">Auditor</MenuItem>
                <MenuItem value="super-admin">Super Admin</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography component={Link} to="/forgot-password">
                Forgot Password?
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
};

export default LoginPage;
