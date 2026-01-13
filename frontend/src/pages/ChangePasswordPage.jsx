import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Import your images
import loginImage from '../assets/login-bg.png';
import wavingHand from '../assets/waving-hand.png';

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false
  });

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleClickShowPassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Change password data:', formData);
    // Handle password change logic here
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
      {/* Left Side - Image (60%) - Hidden on mobile */}
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
          alt="Change Password Visual"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>

      {/* Right Side - Change Password Form (40% on desktop, 100% on mobile) */}
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
          {/* Header Section */}
          <Box sx={{ 
              mb: 4, 
              textAlign: 'center'
            }}>
              {/* Set New Password with waving hand */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                mb: 1,
                justifyContent: 'left'
              }}>
                <Typography 
                  variant="h3" 
                  // component="h1"
                  component={Link}
                to="/login"
                  sx={{
                    fontWeight: 700,
                    color: '#212529',
                    fontSize: { 
                      xs: '2rem',
                      sm: '2.125rem',
                      md: '2.25rem'
                    },
                    lineHeight: 1.2,
                    textDecoration: "none"
                  }}
                >
                  Set New Password
                </Typography>
                <Box
                  component="img"
                  src={wavingHand}
                  alt="Waving hand"
                  sx={{
                    width: { 
                      xs: '32px', 
                      sm: '34px', 
                      md: '36px'
                    },
                    height: { 
                      xs: '32px', 
                      sm: '34px', 
                      md: '36px'
                    }
                  }}
                />
              </Box>

              {/* Subheading */}
              <Typography 
                variant="h6"
                sx={{
                  color: '#212529',
                  fontWeight: 500,
                  fontSize: { 
                    xs: '1rem', 
                    sm: '1.05rem',
                    md: '1.1rem'
                  },
                  textAlign: 'left'
                }}
              >
                Please kindly set your new password.
              </Typography>
            </Box>

          {/* Change Password Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            {/* New Password Field */}
            <TextField
              fullWidth
              label="New Password"
              type={showPassword.newPassword ? 'text' : 'password'}
              variant="outlined"
              value={formData.newPassword}
              onChange={handleChange('newPassword')}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#dee2e6',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1C43A6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1C43A6',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#6c757d',
                  '&.Mui-focused': {
                    color: '#1C43A6',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#6c757d' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => handleClickShowPassword('newPassword')}
                      sx={{ color: '#6c757d' }}
                    >
                      {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              label="Confirm Password"
              type={showPassword.confirmPassword ? 'text' : 'password'}
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#dee2e6',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1C43A6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1C43A6',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#6c757d',
                  '&.Mui-focused': {
                    color: '#1C43A6',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#6c757d' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => handleClickShowPassword('confirmPassword')}
                      sx={{ color: '#6c757d' }}
                    >
                      {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Set Password Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              component={Link}
              to="/work-dashboard"
              sx={{
                backgroundColor: '#1C43A6',
                color: 'white',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#15337D',
                },
              }}
            >
              Set Password
            </Button>
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
};

export default ChangePasswordPage;