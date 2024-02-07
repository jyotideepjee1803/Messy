import React from 'react'
import { bgGradient } from '../../../theme/css'
import { useTheme } from '@emotion/react'
import { Box, Grid, alpha } from '@mui/material';
import FeatureCard from './FeatureCard';

const Feature = () => {
    const theme = useTheme();

    return (
        <Box
        sx={{
            ...bgGradient({
            color: alpha(theme.palette.background.complement, 0.9),
            imgUrl: '/assets/background/overlay_4.jpg',
            }),
            height:400,
            marginTop:20,
        }}
        >
            <Grid container justifyContent="center" spacing={3} mb={3}>
                
                <Grid item xs={12} sm={6} md={3}>
                <FeatureCard
                    title={'Meal planning'}
                    subtitle={'Efficiently schedule and manage meals'}
                />
                </Grid> 
                <Grid item xs={12} sm={6} md={3}>
                <FeatureCard
                    title={'Meal planning'}
                    subtitle={'Efficiently schedule and manage meals'}
                />
                </Grid> 
                <Grid item xs={12} sm={6} md={3}>
                <FeatureCard
                    title={'Meal planning'}
                    subtitle={'Efficiently schedule and manage meals'}
                />
                </Grid> 
            </Grid>
        </Box>
    )
}

export default Feature