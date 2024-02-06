import React from 'react';
import { motion } from "framer-motion";
import { fadeIn } from '../../components/variants';
import Contact from '../Landing/ContactPage'; // Import the Contact component
import "../Landing/Styles.css";
import { useNavigate } from 'react-router-dom';

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
    <div>
      <div className='nav'>
        <div className='messy'>
          <h2>MESSY</h2>
        </div>
        <div className='lgn'>
          <button className='login-button' onClick={()=>{navigate('/login')}}>LOGIN</button>
          <button className='signup-button' onClick={scrollToContact}>Contact</button>
        </div>
      </div>

      <div className='footer'>
        <motion.div 
        variants={fadeIn('right', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.3 }}
        className='middle'>

          <div>HI! Welcome to MESSY. </div>
          <button className='started'>Get started</button>
        </motion.div>

        <motion.div
        variants={fadeIn('left', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.3 }}
         className='random-image'></motion.div>
      </div>
      <div id='contact'>
      <Contact /> 
      </div>

      <div className='yo'>
        <p>&copy;2024 <span>| Developed by JYOTI and Mridul</span></p>
      </div>
    </div>
  );
};
