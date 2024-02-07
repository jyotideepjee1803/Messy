import React from 'react';
import { motion } from "framer-motion";
import { fadeIn } from './variant';
import "./Contact.css";
import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material';

const Contact = () => {
  return (
    // <div className="contact-container">
    //   <div className="contact-content">
    //     <motion.div
    //       variants={fadeIn('right', 0.3)}
    //       initial='hidden'
    //       whileInView={'show'}
    //       viewport={{ once: false, amount: 0.3 }}        
    //      className="contact-text">
    //       <h4>Get in touch</h4>
    //     </motion.div>
    //     {/* form */}
    //     <motion.form 
    //      variants={fadeIn('left', 0.3)}
    //       initial='hidden'
    //       whileInView={'show'}
    //       viewport={{ once: false, amount: 0.3 }}
    //     className="contact-form">
    //       <input type='text' placeholder='Your name' />
    //       <input type='email' placeholder='Your email' />
    //       <textarea placeholder='Your message/If you came this far Say HI !'></textarea>
    //       <a href="mailto:b121030@iiit-bh.ac.in" class="button">Send</a>

    //     </motion.form>
    //   </div>
    // </div>
    <Box alignItems='center' justifyContent='center'>
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }} my={4}>
        <motion.div
          variants={fadeIn('right', 0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.3 }}        
         className="contact-text">
          <Typography color='primary' variant='h2' mb={4}>Contact Us</Typography>
        </motion.div>

        <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 420,
            }}
          >
            <motion.div
            variants={fadeIn('down', 0.3)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.3 }}
            >
            <Stack spacing={3}>
              <TextField
                id="name"
                name="name"
                label="Name"           
              />

              <TextField
                id="email"
                name="email"
                label="Email address"
              />

              <TextField
                id="message"
                name="message"
                label="Message"
                multiline
                rows={4}
              />

            </Stack>

            <Button
                sx={{ mt: 4 }}
                fullWidth
                type="submit"
                variant="contained"
                color="inherit"
            >
              Send
            </Button>
            </motion.div>
        </Card>
      </Stack>
    </Box>
  );
};

export default Contact;