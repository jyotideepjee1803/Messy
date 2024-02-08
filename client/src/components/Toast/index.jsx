import { Alert } from '@mui/material';

const Toast = ({ open, severity, message, onClose }) => {
    return( 
        <>
        {open && 
            <Alert severity={severity} onClose={onClose} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                {message}
            </Alert>
        }
        </>
    )
}

export default Toast;