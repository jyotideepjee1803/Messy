import { Alert, AlertColor, Snackbar } from '@mui/material';

interface ToastProps {
    open: boolean;
    severity : AlertColor | undefined;
    message : string;
    onClose: () => void;
}

const Toast = ({ open, severity, message, onClose } : ToastProps) => {
    return( 
        <>
        {open && 
            <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
            <Alert severity={severity} onClose={onClose} variant="filled" sx={{ position: 'fixed', bottom: 16, right: 16, zIndex:2 }}>
                {message}
            </Alert>
            </Snackbar>
        }
        </>
    )
}

export default Toast;
