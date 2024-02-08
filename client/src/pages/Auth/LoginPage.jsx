import React from 'react'
import Login from '../../components/auth/Login'
import { Box, Card, Stack, Typography, alpha, useTheme } from '@mui/material'
import {bgGradient} from '../../theme/css';
import Logo from '../../components/logo/logo';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const theme = useTheme();
    return (
      <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Messy</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5}}>
            Don’t have an account?
            <Link variant="subtitle2" to='/register'>
              Get started
            </Link>
          </Typography>

          <Login/>
        </Card>
      </Stack>
    </Box>

    )
}

export default LoginPage