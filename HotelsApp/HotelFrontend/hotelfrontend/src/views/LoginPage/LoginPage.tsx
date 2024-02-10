import { Box, Card, CardContent, Grid } from '@mui/material';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import LoginContent from './LoginContent';
import RegisterContent from './RegisterContent';
import { enterAsGuest, setLoginWindow } from '../../redux/reducers/authSlice';

export type LoginWindowType = 'Login' | 'Register';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const loginWindow = useAppSelector((state) => state.auth.loginWindow);
    const isInside = useAppSelector((state) => state.auth.loggedInMode !== 'LoggedOut');
    if (isInside) {
        return <Navigate to="/" />;
    }
    console.log(loginWindow);
    return (<Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        
        backgroundImage: 'url(\"media/background.jpg\")',
        backgroundColor: '#cccccc',

    }}>
        <Card sx={{ boxShadow: "5px 5px rgba(0,0,0,0.15)" }}>
            <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {loginWindow === 'Login'
                        ? <>
                            <LoginContent />
                            <Link onClick={() => dispatch(setLoginWindow('Register'))}>Create an account</Link>
                        </>
                        : <>
                            <RegisterContent />
                            <Link onClick={() => dispatch(setLoginWindow('Login'))}>Already have an account? Login</Link>
                        </>}
                    <Link onClick={() => dispatch(enterAsGuest())} sx={{mt: 1}}>Continue as Guest</Link>
                </Box>
            </CardContent>
        </Card>
    </Box>);
}

export default LoginPage;