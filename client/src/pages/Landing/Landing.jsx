import React from 'react';
import { motion } from "framer-motion";
import { fadeIn } from './component/variant';
import Contact from './component/Contact'; // Import the Contact component
import "./Styles.css";
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/logo';
import { Box, Button, Typography} from '@mui/material';
import Feature from './component/Feature';

export const LandingPage = () => {
    const navigate = useNavigate();
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        console.log('Contact Section:', contactSection);

        if (contactSection) {
        window.scrollTo({
            top: contactSection.offsetTop,
            behavior: 'smooth'
        });
        } else {
        console.log('Contact section not found!');
        }
    };

    return (
        <Box>
            <Box
            component="header"
            sx={{
                top: 0,
                left: 0,
                width: 1,
                lineHeight: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent : 'space-between',
                // position: 'fixed',
                // p: (theme) => ({ xs: theme.spacing(2, 2, 0), sm: theme.spacing(3, 3, 0) }),
                px : 3
            }}
            >
                <Logo />
                <Box
                    sx={{
                        py: 2,
                        px: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        alignSelf : 'flex-end'
                    }}
                >
                    <Button onClick={scrollToContact}>
                        Contact
                    </Button>
                    <Button onClick={()=>{navigate('/login')}}>
                        Login
                    </Button>
                </Box>
            </Box>
            
            <Box>
                <Box  sx={{alignItems: 'center', display:'flex', flexDirection:'row', justifyContent: 'space-between', marginBottom:10}}>
                    <motion.div 
                        variants={fadeIn('right', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.3 }}
                        className='middle'
                    >
                        <Box maxWidth={600}>
                            <Typography variant='h2' paragraph >
                                STREAMLINE YOUR MESS. EFFORTLESS MANAGEMENT, HAPPY TUMMIES!
                            </Typography>
                            <Button variant="contained" color="primary" sx={{maxWidth:200, height:50}} onClick={()=>navigate('/register')}> Get started</Button>
                        </Box>
                    </motion.div>

                   
                    <motion.div
                    variants={fadeIn('left', 0.3)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='random-image'>
                        <Box alignItems='center' justifyContent='center'>
                            <img src="/assets/illustrations/illustration_payment.png" height={500} width={500} alt='mess'/>
                        </Box>
                    </motion.div>
                </Box>

                <Feature/>
                <Contact/>
            </Box>
            <div className='yo'>
                 <p>&copy;2024 <span>| Developed by JYOTI and Mridul</span></p>
            </div>
        </Box>
        
    );
};
