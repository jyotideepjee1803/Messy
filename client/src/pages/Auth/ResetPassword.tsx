import { Box, Card, Grid, Link, Stack, Typography, alpha, useTheme } from '@mui/material'
import {bgGradient} from '../../theme/css';
import Logo from '../../components/logo/logo';
import Reset from '../../components/auth/Reset';
const ResetPassword = () => {
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
          <Typography variant="h4" mb={3}>Forgot your password?</Typography>

          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5}}>
            Don’t have an account?
            <Link variant="subtitle2" to='/register'>
              Get started
            </Link>
          </Typography> */}
          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Please enter the email address associated with your account and We
            will email you a link to reset your password.
          </Typography>
          <Reset/>
          <Grid container mt={2}>
            <Grid item xs>
              <Link href="/login" variant="body2" color='inherit'>
                Return to sign in
              </Link>
            </Grid>
          </Grid>
        </Card>
      </Stack>
    </Box>

    );
};
  
export default ResetPassword;