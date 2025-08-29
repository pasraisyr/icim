import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Simpan token & user info dalam localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username || email);
                localStorage.setItem('user_type', data.user_type);
                // Redirect ikut role
                if (data.user_type === 1) {
                    navigate('/admin-icims');
                } else if (data.user_type === 2) {
                    navigate('/teacher');
                } else if (data.user_type === 3) {
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
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
            <Paper elevation={3} sx={{ p: 4, minWidth: 350 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
