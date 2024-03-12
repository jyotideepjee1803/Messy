import React, { useState } from 'react'

import * as Yup from 'yup';
import {useFormik} from 'formik';

import axios, { getAxiosConfig } from '../../utils/axios'
import {Button, Stack, TextField} from '@mui/material';
import Toast from '../Toast';

const Reset = () => {

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState('success');

    const handleToastOpen = (message, severity) => {
      setToastMessage(message);
      setToastSeverity(severity);
      setToastOpen(true);
    };
  
    const handleToastClose = () => {
        setToastOpen(false);
    };

    const formik = useFormik({
      initialValues: {
        email: '',
      },
      validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
      }),
      onSubmit: async (values, { setSubmitting, setErrors }) => {
        const config = getAxiosConfig({});
  
        try {
          const {data} = await axios.post("/api/user/requestResetPassword", values, config);
          handleToastOpen('Request Sent', 'success');
          console.log(data)
        } catch (error) {
          handleToastOpen(error.response?.data?.message,'error');
          setErrors({ submit: 'Request failed. Please try again.' });
        } finally {
          setSubmitting(false);
        }
      },
    });

    return (
        <>
          <Toast
              open={toastOpen}
              severity={toastSeverity}
              message={toastMessage}
              onClose={handleToastClose}
          />
          <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
          <TextField
            id="email"
            name="email"
            label="Email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

        </Stack>

        <Button
            sx={{ mt: 4 }}
            fullWidth
            type="submit"
            variant="contained"
            color="inherit"
            disabled={formik.isSubmitting}
        >
          Send Request
        </Button>
        </form>
        </>
    );
}

export default Reset;