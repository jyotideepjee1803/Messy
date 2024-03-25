import { Button, Card, Stack, TextField, Typography } from '@mui/material'
import React, {useRef, useState } from 'react'
import emailjs from '@emailjs/browser';
import Toast from '../../components/Toast';

const FeedbackPage = () => {
    const form = useRef();
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

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

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const serviceId = process.env.REACT_APP_SERVICE_ID;
        const templateId = process.env.REACT_APP_TEMPLATE_ID;
        try {
        setSubmitting(true);
        
        await emailjs.sendForm(serviceId, templateId, form.current, {
            publicKey: process.env.REACT_APP_EMAIL_KEY,
        });

        handleToastOpen('Feedback sent','success');
        setMessage('');    
    } catch (error) {
        handleToastOpen(error.response?.data?.message,'error');
    } 
    finally {
        setSubmitting(false);
    }
    };

    return (
        <>
        <Toast
            open={toastOpen}
            severity={toastSeverity}
            message={toastMessage}
            onClose={handleToastClose}
        />
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 700,
          }}
        >
          <Typography variant="h4" mb={2}>Feedback</Typography>
            <form ref={form} onSubmit={handleSubmit}>
            <Stack spacing={3}>
            <TextField
                name="message"
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                value={message}
                onChange={handleChange}
                className="highlighted-textarea"
            />
            </Stack>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={submitting}
                style={{ marginTop: '1rem' }}
            >
                Submit
            </Button>
            </form>
        </Card>
      </Stack>
    </>
    )
}

export default FeedbackPage