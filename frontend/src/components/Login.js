import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { TextField, Button, Container, Typography, Link, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { closeSnackbar } from '../reducers/userReducers';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userInfo, snackbar, loading, error, token } = useSelector((state) => state.user);
    // const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
       // console.log("token info:",token)
        if (token != null) {
            navigate('/');
        }
    }, [token,navigate]);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
        console.log("user :", userInfo, loading, token)
        // if (token != null) {
        //     navigate('/');
        // }
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeSnackbar());
    };

    // Only call handleCloseSnackbar when snackbar.open changes
    // useEffect(() => {
    //     if (snackbar.open) {
    //         const timer = setTimeout(() => {
    //             dispatch(closeSnackbar());
    //         }, 6000);
    //         return () => clearTimeout(timer); // Cleanup the timer on unmount
    //     }
    // }, [snackbar.open, dispatch]);
    return (
        <Container maxWidth="sm" sx={{mt :5}}>
            <Box alignItems="center" p={1} sx={{ color: "#1E81B0", mb: 1, fontFamily: "sans-serif", fontSize: 41 }}>
                Login
            </Box>
            <Box sx={{ mt: 1,border: "4px #3563f0 solid",p:6 ,borderRadius :"03%"}}>
                {/* <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography> */}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary"
                        fullWidth
                        disabled={loading}
                        style={{ position: 'relative' }}
                    >
                        {loading && <CircularProgress size={24} style={{ position: 'absolute', left: '50%', top: '50%', marginLeft: -12, marginTop: -12 }} />}
                        Login
                    </Button>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Link href="/register">
                            Don't have an account? Signup
                        </Link>
                    </Box>
                    {/* <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login with Google
                    </Button> */}
                </form>
            </Box>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login;
