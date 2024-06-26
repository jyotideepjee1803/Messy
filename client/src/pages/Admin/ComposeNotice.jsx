/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState} from 'react'
import { TextField, Button, Box, Card, CardHeader,  } from '@mui/material';
import axios, { getAxiosConfig } from '../../utils/axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Toast from '../../components/Toast';

import { useSelector } from "react-redux";
import {selectAppState} from '../../store/AppSlice';
import Scrollbar from '../../components/scrollbar';

const ComposeNotice = () => {
    const {clientSocket, isSocketConnected} = useSelector(selectAppState);

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

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const config = getAxiosConfig({ loggedInUser });

    const formik = useFormik({
      initialValues: {
        subject: '',
        body: '',
       
      },
      validationSchema: Yup.object({
        subject: Yup.string().required('Subject is required'),
        body : Yup.string().required('Body is required'),
      }),
      onSubmit: async (values, { setSubmitting, setErrors , resetForm }) => {
        try {
          const {data} = await axios.post('/api/admin/notice', values, config);
          if (isSocketConnected) clientSocket?.emit("sendNotification", {senderId:loggedInUser._id, content : data});
          handleToastOpen('Notice sent','success')
        } catch (error) {
          handleToastOpen(error.response?.data?.message,'error');
        } finally {
          setSubmitting(false);
        }
        resetForm();
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
        <Card sx={{p:1}}>
        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': {
              height: 1,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
        <CardHeader title='Compose Notice'/>
        <Box sx={{ p: 3, pb: 1, mb:2}}>
        <form onSubmit={formik.handleSubmit}>
        <TextField
            fullWidth
            id="subject"
            name='subject'
            placeholder='Subject'
            variant="standard"
            value={formik.values.subject}
            onChange={formik.handleChange}
            style={{ marginBottom: '20px' }}
        />
        <TextField
            fullWidth
            multiline
            id="body"
            name='body'
            rows={5}
            placeholder='Body'
            variant="standard"
            value={formik.values.body}
            onChange={formik.handleChange}
            style={{ marginBottom: '20px' }}
        />
        <Box ml={2} mt={2} textAlign="left" alignSelf={'left'}>
            <Button sx={{ mt: 4 }}
                type="submit"
                variant="contained"
                color="primary"
                disabled={formik.isSubmitting || formik.values.body.length <=0 || formik.values.subject.length <= 0}
            >
            Send
            </Button>
        </Box>
        </form>
        </Box>
        </Scrollbar>
        </Card>
    </>
    )
}

export default ComposeNotice;