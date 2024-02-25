import React, { useEffect, useRef } from 'react';
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

    const targetRef = useRef(null);

    useEffect(() => {
        // localStorage persists data even after page refresh, unlike state
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (user && Date.now() < user.expiryTime) navigate("/mess");
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    // Function to handle click event and scroll to target component
    const handleClick = () => {
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
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
                pl:3
            }}
            >
                <Logo />
                <Box
                    sx={{
                        py: 2,
                        display: 'flex',
                        alignItems: 'center',
                        alignSelf : 'flex-end'
                    }}
                >
                    <Button  variant="contained" color="primary" onClick={handleClick}>
                        Contact
                    </Button>
                    <Button variant="contained" color="primary" sx={{mx:4}} onClick={()=>{navigate('/login')}}>
                        Login
                    </Button>
                </Box>
            </Box>
            
            <Box>
                <Box sx={{
                    alignItems: 'center', 
                    display:'flex', 
                    flexDirection:'row', 
                    // justifyContent:'space-between'
                }}>
                    <motion.div 
                        variants={fadeIn('right', 0.1)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.3 }}
                        className='middle'
                    >
                        <Box maxWidth={600}>
                            <Typography variant='h2' paragraph>
                                STREAMLINE YOUR <Typography component='span' color='primary' variant='h2'> MESS. </Typography> EFFORTLESS MANAGEMENT, HAPPY TUMMIES!
                            </Typography>
                            <Button variant="contained" color="primary" sx={{maxWidth:200, height:50}} onClick={()=>navigate('/register')}> Get started</Button>
                        </Box>
                    </motion.div>
                    <Box ml={5} mr={5} className='landingImage'>
                        <img height={500} src='assets/illustrations/illustration_phone.png' alt='phone' style={{position:'absolute', marginTop:130}}/>
                        <img className='frame' height={500} src='assets/illustrations/illustration_pc.png' alt='phone' style={{marginTop:30, marginLeft:40}}/>
                    </Box>
                </Box>

                <Feature/>
                <div ref={targetRef}>
                    <Contact/>
                </div>
            </Box>
            <div className='yo'>
                 <p>&copy;2024 <span>| Developed by JYOTI and Mridul</span></p>
            </div>
        </Box>
        
    );
};
