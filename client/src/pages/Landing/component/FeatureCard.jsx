import { Card, Stack, Typography } from '@mui/material';
import React from 'react'

const FeatureCard = ({title, subtitle, sx, ...other}) => {
    return (
        <Card
          component={Stack}
          spacing={3}
          direction="row"
          sx={{
            px: 3,
            py: 5,
            borderRadius: 2,
            ...sx,
          }}
          {...other}
        >
          <Stack spacing={0.5}>
            <Typography variant="h4">{title}</Typography>
    
            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
              {subtitle}
            </Typography>
          </Stack>
        </Card>
      );
}

export default FeatureCard