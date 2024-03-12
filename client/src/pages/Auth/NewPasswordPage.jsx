import { Box, Card, Grid, Link, Stack, Typography, alpha, useTheme } from '@mui/material'
import {bgGradient} from '../../theme/css';
import Logo from '../../components/logo/logo';
import NewPassword from '../../components/auth/NewPassword';
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
    const [queryParameters] = useSearchParams()
    const token = queryParameters.get("token");
    const userId = queryParameters.get("id");
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
         
          <NewPassword token={token} userId={userId}/>
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