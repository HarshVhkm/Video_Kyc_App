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
import { Email, CalendarToday, Lock } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Import your images
import loginImage from '../assets/login-bg.png';
import wavingHand from '../assets/waving-hand.png';

const ForgotPasswordPage = () => {
    const [step, setStep] = useState(1); // 1: Initial form, 2: OTP verification
    const [formData, setFormData] = useState({
        email: '',
        dateOfBirth: '',
        otp: ''
    });

    const handleChange = (field) => (event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleGetOTP = (event) => {
        event.preventDefault();
        console.log('Get OTP data:', formData);
        // Simulate API call to get OTP
        setStep(2);
    };

    const handleVerifyOTP = (event) => {
        event.preventDefault();
        console.log('Verify OTP:', formData.otp);
        // Handle OTP verification and redirect
        // For demo, we'll just log and you can add your navigation logic
    };

    const handleResendOTP = () => {
        console.log('Resending OTP...');
        // Handle resend OTP logic
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
                    alt="Forgot Password Visual"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </Box>

            {/* Right Side - Forgot Password Form (40% on desktop, 100% on mobile) */}
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
                        {/* Heading with waving hand */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1,
                            justifyContent: 'left'
                        }}>
                            <Typography
                                variant="h3"
                                component="h1"
                                sx={{
                                    fontWeight: 700,
                                    color: '#212529',
                                    fontSize: {
                                        xs: '2rem',
                                        sm: '2.125rem',
                                        md: '2.25rem'
                                    },
                                    lineHeight: 1.2
                                }}
                            >
                                {step === 1 ? 'Forgot Password?' : 'OTP Verification?'}
                            </Typography>
                            {step === 1 && (
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
                            )}
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
                            {step === 1
                                ? "No worries, we'll send you reset instructions."
                                : `We sent a code to ${formData.email}`}
                        </Typography>
                    </Box>

                    {/* Form Content */}
                    <Box component="form" onSubmit={step === 1 ? handleGetOTP : handleVerifyOTP} sx={{ width: '100%' }}>

                        {step === 1 ? (
                            /* Initial Form - Email and Date of Birth */
                            <>
                                {/* Email Field */}
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    variant="outlined"
                                    value={formData.email}
                                    onChange={handleChange('email')}
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
                                                <Email sx={{ color: '#6c757d' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                {/* Date of Birth Field */}
                                <TextField
                                    fullWidth
                                    label="Date of Birth"
                                    type="date"
                                    variant="outlined"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange('dateOfBirth')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
                                    // InputProps={{
                                    //     startAdornment: (
                                    //         <InputAdornment position="start">
                                    //             <CalendarToday sx={{ color: '#6c757d' }} />
                                    //         </InputAdornment>
                                    //     ),
                                    // }}
                                />

                                {/* Get OTP Button */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
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
                                    Get OTP
                                </Button>
                                {/* Back to Login Link */}
                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                    <Typography
                                        component={Link}
                                        to="/login"
                                        sx={{
                                            color: '#1C43A6',
                                            textDecoration: 'none',
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                            '&:hover': {
                                                textDecoration: 'underline',
                                                color: '#15337D'
                                            }
                                        }}
                                    >
                                        Back to Login
                                    </Typography>
                                </Box>
                            </>
                        ) : (
                            /* OTP Verification Form */
                            <>
                                {/* OTP Field */}
                                <TextField
                                    fullWidth
                                    label="Enter 6-digit OTP"
                                    variant="outlined"
                                    value={formData.otp}
                                    onChange={handleChange('otp')}
                                    inputProps={{
                                        maxLength: 6,
                                        pattern: '[0-9]*'
                                    }}
                                    sx={{
                                        mb: 2,
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
                                    }}
                                />

                                {/* Resend OTP Link */}
                                <Box sx={{ textAlign: 'right', mb: 4 }}>
                                    <Typography
                                        component="button"
                                        type="button"
                                        onClick={handleResendOTP}
                                        sx={{
                                            color: '#1C43A6',
                                            textDecoration: 'none',
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                                color: '#15337D'
                                            }
                                        }}
                                    >
                                        Resend OTP
                                    </Typography>
                                </Box>

                                {/* Verify Button */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    component={Link}
                                    to="/change-password"
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
                                    Verify
                                </Button>
                            </>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Paper>
    );
};

export default ForgotPasswordPage;