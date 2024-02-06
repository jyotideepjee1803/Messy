import React from 'react'
import Login from '../../components/auth/Login'
import { CssBaseline, Grid } from '@mui/material'

const LoginPage = () => {
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Login/>
        </Grid>
    )
}

export default LoginPage