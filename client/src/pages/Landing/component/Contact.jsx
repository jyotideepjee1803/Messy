import React from 'react';
import { motion } from "framer-motion";
import { fadeIn } from './variant';
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <motion.div
          variants={fadeIn('right', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.3 }}        
         className="contact-text">
          <h4>Get in touch</h4>
        </motion.div>
        {/* form */}
        <motion.form 
         variants={fadeIn('left', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.3 }}
        className="contact-form">
          <input type='text' placeholder='Your name' />
          <input type='email' placeholder='Your email' />
          <textarea placeholder='Your message/If you came this far Say HI !'></textarea>
          <a href="mailto:b121030@iiit-bh.ac.in" class="button">Send</a>

        </motion.form>
      </div>
    </div>
  );
};

export default Contact;