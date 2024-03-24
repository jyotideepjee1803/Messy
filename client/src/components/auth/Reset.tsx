import React, { useState } from 'react'

import * as Yup from 'yup';
import {useFormik} from 'formik';

import axios, { getAxiosConfig } from '../../utils/axios'
import {AlertColor, Button, Stack, TextField} from '@mui/material';
import Toast from '../Toast';
import { AxiosErrorType } from '../../utils/AppTypes';
import { AxiosRequestConfig } from 'axios';

const Reset = () => {

    const [toastOpen, setToastOpen] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastSeverity, setToastSeverity] = useState<AlertColor>('success');

    const handleToastOpen = (message: string, severity: AlertColor) => {
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
          const {data} = await axios.post("/api/user/requestResetPassword", values, config as AxiosRequestConfig);
          handleToastOpen('Request Sent', 'success');
          console.log(data)
        } catch (error) {
          handleToastOpen((error as AxiosErrorType).response?.data?.message || (error as Error).message,'error');
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