import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import logoIcim from 'assets/images/logo-icim.jpg';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password }),
            });

            const data = await response.json();
            console.log('Login response:', data);

            if (response.ok) {
                // Simpan token & user info dalam localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username || email);
                localStorage.setItem('user_type', data.user_type);

                const userType = Number(data.user_type);

                if (userType === 1) {
                    navigate('/admin-icims');
                } else if (userType === 2) {
                    navigate('/teacher');
                } else if (userType === 3) {
                    navigate('/academic-manager/students');
                } else {
                    navigate('/');
                }
            } else {
                setError(data.detail || 'Login failed');
            }
        } catch (err) {
            setError('Network error');
        }
    };

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="100vh" 
            sx={{ 
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none'
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                    top: '-200px',
                    right: '-200px',
                    pointerEvents: 'none'
                }
            }}
        >
            <Paper 
                elevation={12} 
                sx={{ 
                    display: 'flex',
                    maxWidth: 1400, 
                    width: '95%', 
                    minHeight: 650,
                    borderRadius: 4, 
                    overflow: 'hidden',
                    position: 'relative', 
                    zIndex: 1 
                }}
            >
                {/* Left Side - Branding */}
                <Box 
                    sx={{ 
                        flex: '0 0 45%',
                        background: 'linear-gradient(180deg, #1e40af 0%, #3b82f6 100%)',
                        color: 'white',
                        p: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                            opacity: 0.3
                        }
                    }}
                >
                    <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                        <Box mb={5}>
                            <img 
                                src={logoIcim} 
                                alt="Logo ICIM" 
                                style={{ 
                                    width: '180px', 
                                    height: 'auto',
                                    objectFit: 'contain',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                                }} 
                            />
                        </Box>
                        <Typography variant="h2" fontWeight="bold" gutterBottom>
                            Selamat Datang
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 5, opacity: 0.9 }}>
                            Kelab Insan Cemerlang Islam Melaka
                        </Typography>
                        <Typography variant="h6" sx={{ maxWidth: 400, opacity: 0.85, lineHeight: 1.8, fontWeight: 400 }}>
                            Portal pengurusan terpadu untuk pentadbiran, guru, dan pengurus akademik. 
                            Sistem maklumat lengkap untuk pengurusan institusi pendidikan.
                        </Typography>
                    </Box>
                </Box>

                {/* Right Side - Login Form */}
                <Box 
                    sx={{ 
                        flex: '0 0 55%',
                        p: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        bgcolor: 'white'
                    }}
                >
                    <Box sx={{ maxWidth: 480, mx: 'auto', width: '100%' }}>
                        <Typography variant="h4" fontWeight="700" gutterBottom color="primary">
                            Log Masuk
                        </Typography>
                        
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Masukkan maklumat akaun anda untuk meneruskan
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                label="Alamat Email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                fullWidth
                                margin="normal"
                                required
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Kata Laluan"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                fullWidth
                                margin="normal"
                                required
                                sx={{ mb: 3 }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{ 
                                    py: 1.8, 
                                    fontWeight: 700, 
                                    fontSize: '1.1rem',
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)'
                                }}
                            >
                                Log Masuk
                            </Button>
                            {error && (
                                <Alert severity="error" sx={{ mt: 3 }}>
                                    {error}
                                </Alert>
                            )}
                        </Box>

                        <Typography variant="caption" color="text.secondary" sx={{ mt: 4, display: 'block', textAlign: 'center' }}>
                            © 2026 Kelab Insan Cemerlang Islam Melaka
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
