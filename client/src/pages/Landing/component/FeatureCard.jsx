import { Card, CardActionArea, CardMedia, Stack, Typography } from '@mui/material';
import React from 'react'

const FeatureCard = ({title, subtitle, sx, ...other}) => {
    return (
        <Card
          component={Stack}
          spacing={3}
          direction="row"
          sx={{
            borderRadius: 2,
            ...sx,
          }}
          {...other}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image="/assets/illustrations/illustration_payment.png"
              alt="green iguana"
            />
            <Stack spacing={0.5}>
              <Typography variant="h4">{title}</Typography>
      
              <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                {subtitle}
              </Typography>
            </Stack>
          </CardActionArea>
        </Card>
      );
}

export default FeatureCard