import React from 'react';
import { motion } from "framer-motion";
import { fadeIn } from './variant';
import "./Contact.css";
import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      message: Yup.string().required('Message is required')
    }),
    onSubmit: (values) => {
      const { name, email, message } = values;
      const mailtoLink = `mailto:b121030@iiit-bh.ac.in?subject=Message from ${name}&body=${message}%0D%0A`;
      window.location.href = mailtoLink;
    }
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
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
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />

                <TextField
                  id="email"
                  name="email"
                  label="Email address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                  id="message"
                  name="message"
                  label="Message"
                  multiline
                  rows={4}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  error={formik.touched.message && Boolean(formik.errors.message)}
                  helperText={formik.touched.message && formik.errors.message}
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
            </form>
            </motion.div>
        </Card>
      </Stack>
    </Box>
  );
};

export default Contact;
