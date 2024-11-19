import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from '../../../routes/components';

import { Card, CardActionArea, CardMedia } from '@mui/material';
// ----------------------------------------------------------------------

export default function AlertCard(props) {
    console.log(props);
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
            justifyContent: 'flex-start',
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            {props.title}
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            {props.subtitle}
          </Typography>

            <Card sx={{ maxWidth: 300, maxHeight: 260, mx: 'auto', my: { xs: 3, sm: 8 }, }}>
                 <CardActionArea>
                     <CardMedia
                    component="img"
                    image={props.img}
                    alt="green iguana"
                    />
                </CardActionArea>
            </Card>

          <Button href={props.redir} size="large" variant="contained" component={RouterLink}>
            {props.buttonText}
          </Button>
        </Box>
      </Container>
    </>
  );
}
