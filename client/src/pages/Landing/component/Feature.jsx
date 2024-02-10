import React from 'react'
import { fadeIn } from './variant';
import { motion } from "framer-motion";
import { bgGradient } from '../../../theme/css'
import { Box, Grid, Typography, alpha } from '@mui/material';
import FeatureCard from './FeatureCard';
import { featData } from './FeatureData';

const Feature = () => {

    return (
        <Box
        sx={{
            ...bgGradient({
            color: alpha('#2fa8ff', 0.9),
            imgUrl: '/assets/background/overlay_4.jpg',
            }),
            marginTop:20,
            py: 4,
        }}
        textAlign='center'
        >
            <motion.div
              variants={fadeIn('down', 0.3)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.3 }}
            >
                <Typography color='white' variant='h2' mb={4}>Features</Typography>
            </motion.div>
            <Grid container justifyContent="center" spacing={3} mb={3}>
                {featData.map(item => (
                    <Grid item xs={12} sm={6} md={3}>
                    <FeatureCard
                        title={item.title}
                        subtitle={item.subtitle}
                        src = {item.src}
                    />
                    </Grid> 
                ))}
                {/* <Grid item xs={12} sm={6} md={3}>
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
                </Grid>  */}
            </Grid>
        </Box>
    )
}

export default Feature