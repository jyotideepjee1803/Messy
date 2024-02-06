import React from 'react'
import { useNavigate } from 'react-router-dom'

import axios, { getAxiosConfig } from '../../utils/axios'
import { Avatar, Box, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const config = getAxiosConfig({});
        
        const email = data.get('email');
        const password = data.get('password');

        try{
            const {data} = await axios.post("/api/user/login", {email,password}, config);
            localStorage.setItem("loggedInUser",JSON.stringify(data));
            navigate("/mess");
        }catch(error){
            console.log(error);
        }
    };

    return (
        <>
        <Grid item xs={false} sm={4} md={7} 
         sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{my: 8,mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        </>
    );
}

export default Login