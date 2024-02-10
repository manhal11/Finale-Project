import { Box, CircularProgress } from '@mui/material';
import React from 'react';

interface LoadingPageProps {
    nested?: boolean
};

const LoadingPage: React.FC<LoadingPageProps> = ({ nested = false }) => {
    return (<Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: nested ? '100%' : '100vw',
        height: nested ? '100%' : '100vh',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <CircularProgress />
    </Box >);
}

export default LoadingPage;