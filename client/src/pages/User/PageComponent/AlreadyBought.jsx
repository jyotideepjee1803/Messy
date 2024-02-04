import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from '../../../routes/components';

import { Card, CardActionArea, CardMedia } from '@mui/material';
// ----------------------------------------------------------------------

export default function AlreadyBought() {

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
            You've already bought coupon!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
          You have already bought coupon for this week. Visit the purchase page later to buy coupon for next week.
                        You can visit the My Coupon section to see your coupons.
          </Typography>

            <Card sx={{ maxWidth: 300, maxHeight: 260, mx: 'auto', my: { xs: 5, sm: 10 }, }}>
                 <CardActionArea>
                     <CardMedia
                    component="img"
                    image="/assets/illustrations/illustration_payment.png"
                    alt="green iguana"
                    />
                </CardActionArea>
            </Card>

          <Button href="/mycoupon" size="large" variant="contained" component={RouterLink}>
            Go to My Coupon
          </Button>
        </Box>
      </Container>
    </>
  );
}
