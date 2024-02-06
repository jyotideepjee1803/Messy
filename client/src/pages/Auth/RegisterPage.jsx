import React from 'react'
import Register from '../../components/auth/Register'
import { Container, CssBaseline} from '@mui/material'

const RegisterPage = () => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Register/>
        </Container>
    )
}

export default RegisterPage