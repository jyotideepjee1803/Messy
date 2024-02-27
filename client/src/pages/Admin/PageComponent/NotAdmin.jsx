import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from '../../../routes/components';

import { Card, CardActionArea, CardMedia } from '@mui/material';
// ----------------------------------------------------------------------

export default function NotAdmin() {

  return (
    <>
      <Container>
        <Box
          sx={{
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            Not Authorised!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            This page can be only accessed by admin. Visit your dashboard.
          </Typography>

            <Card sx={{ maxWidth: 300, maxHeight: 260, mx: 'auto', my: { xs: 5, sm: 10 }, }}>
                 <CardActionArea>
                     <CardMedia
                    component="img"
                    image="/assets/illustrations/illustration_access_denied.png"
                    alt="green iguana"
                    />
                </CardActionArea>
            </Card>

          <Button href="/mess" size="large" variant="contained" component={RouterLink}>
            Go to Dashboard
          </Button>
        </Box>
      </Container>
    </>
  );
}
