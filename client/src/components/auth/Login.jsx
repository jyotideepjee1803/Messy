import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import * as Yup from 'yup';
import {useFormik} from 'formik';

import axios, { getAxiosConfig } from '../../utils/axios'
import {Button, IconButton, InputAdornment, Stack, TextField} from '@mui/material';
import Toast from '../Toast';
import Iconify from '../iconify'

const Login = () => {
    const navigate = useNavigate();

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState('success');

    const [showPassword, setShowPassword] = useState(false);

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
        password : '',
      },
      validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
      }),
      onSubmit: async (values, { setSubmitting, setErrors }) => {
        const config = getAxiosConfig({});
  
        try {
          const {data} = await axios.post("/api/user/login", values, config);
          localStorage.setItem("loggedInUser",JSON.stringify(data));
          navigate("/mess");
        } catch (error) {
          handleToastOpen(error.response?.data?.message,'error');
          setErrors({ submit: 'Login failed. Please try again.' });
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

          <TextField
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
          Login
        </Button>
        </form>
        </>
    );
}

export default Login