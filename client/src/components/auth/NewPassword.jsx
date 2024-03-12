import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {useFormik} from 'formik';

import axios, { getAxiosConfig } from '../../utils/axios'
import {Button, IconButton, InputAdornment, Stack, TextField} from '@mui/material';
import Toast from '../Toast';
import Iconify from '../iconify';

const NewPassword = ({token, userId}) => {
    const navigate = useNavigate();

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState('success');

    const [showPassword, setShowPassword] = useState(false);
    const [showCnfPassword, setShowCnfPassword] = useState(false);

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
        password: '',
        confirmPassword: '',
      },
      validationSchema: Yup.object({
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      }),
      onSubmit: async (values, { setSubmitting, setErrors }) => {
        const config = getAxiosConfig({});

        const {password} = values
        try {
          await axios.post('/api/user/resetPassword', {userId,token,password}, config);
          handleToastOpen('Password updated', 'success');
          navigate('/login');
        } catch (error) {
          console.log(error);
          handleToastOpen(error.response?.data?.message,'error');
          setErrors({ submit: 'Password generation failed. Please try again.' });
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

          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            value={formik.values.confirmPassword}
            type={showCnfPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowCnfPassword(!showCnfPassword)}
                    edge="end"
                  >
                    <Iconify icon={showCnfPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            sx={{ mt: 4 }}
            fullWidth
            type="submit"
            variant="contained"
            color="inherit"
            disabled={formik.isSubmitting}
          >
            Update-password
          </Button>
          </Stack>
        </form>
    </>
    );
}

export default NewPassword;