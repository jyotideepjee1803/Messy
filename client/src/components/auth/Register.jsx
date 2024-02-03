import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios, { getAxiosConfig } from '../../utils/axios'
import { Alert, Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async(event)=>{
        event.preventDefault();

        const config = getAxiosConfig({});

        const data = new FormData(event.currentTarget);

        const name = data.get('firstName')+" "+data.get('lastName');
        const email = data.get('email');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword')
        const isAdmin = false;

        // Validate email
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError("Please Enter a Valid Email ID");
            return;
        }
        
        if (password !== confirmPassword) {
            setError("Passwords Do Not Match");
            return;
        }

        try{
            const {data} = await axios.post("/api/user/register", {name,email,password,isAdmin}, config);
            localStorage.setItem("loggedInUser",JSON.stringify(data));
            navigate("/mess");
        }catch(error){
            console.log(error);
            setError('Registration failed. Please try again.')
        }
    }

    return (
        <>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {error && <Alert severity='error'>{error}</Alert>}
          </Box>
        </Box>
        </>
    )  
}

export default Register