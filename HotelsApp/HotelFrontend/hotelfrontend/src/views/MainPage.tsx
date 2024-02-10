import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getLoggedUser } from 'redux/reducers/authSlice';
import HotelsPage from './HotelsPage/HotelsPage';

function MainPage() {
    const isInside = useAppSelector((state) => (state.auth.loggedInMode !== 'LoggedOut'));

    return (
        isInside
            ? (<Navigate to="/home" />)
            : (<Navigate to="/login" />)
    );
}

export default MainPage;