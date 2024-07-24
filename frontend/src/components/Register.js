import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import { TextField, Button, Container, Typography, Link, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { closeSnackbar } from '../reducers/userReducers';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { userInfo,snackbar,token,error} = useSelector((state) => state.user);

    const { firstName, lastName, email, password, confirmPassword } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        console.log("user info reg:",snackbar)
        if (snackbar.message === "Registration successful") {
            console.log("insidee")
            navigate('/login');
        }
    }, [snackbar,navigate,dispatch]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
           let result = dispatch(register(formData));
          // console.log("res :",error)
        //    if (!error && token) {
        //     navigate('/login');
        // }
        } else {
            alert('Passwords do not match');
        }
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeSnackbar());
    };
    return (
        <Container maxWidth="sm">
                 <Box alignItems="center" p={1} sx={{ color: "#1E81B0", mb: 1, fontFamily: "sans-serif", fontSize: 41 }}>
                Signup
            </Box>
                <Box sx={{ mt: 1,border: "4px #3563f0 solid",p:6 ,borderRadius :"3%"}}>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        label="First Name" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        name="firstName" 
                        value={firstName} 
                        onChange={handleChange} 
                    />
                    <TextField 
                        label="Last Name" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        name="lastName" 
                        value={lastName} 
                        onChange={handleChange} 
                    />
                    <TextField 
                        label="Email" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        name="email" 
                        value={email} 
                        onChange={handleChange} 
                    />
                    <TextField 
                        label="Password" 
                        type="password" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        name="password" 
                        value={password} 
                        onChange={handleChange} 
                    />
                    <TextField 
                        label="Confirm Password" 
                        type="password" 
                        variant="outlined" 
                        fullWidth 
                        margin="normal" 
                        name="confirmPassword" 
                        value={confirmPassword} 
                        onChange={handleChange} 
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 2 }}
                    >
                        Signup
                    </Button>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Link href="/login">
                            Already have an account? Login
                        </Link>
                    </Box>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        fullWidth 
                        sx={{ mt: 2 }}
                    >
                        Signup with Google
                    </Button>
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

export default Register;
