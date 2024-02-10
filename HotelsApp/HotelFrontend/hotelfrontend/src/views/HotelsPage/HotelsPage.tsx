import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getLoggedUser } from 'redux/reducers/authSlice';
import HotelDialog from './SubWindows/HotelDialog';
import HotelRatingBody from './SubWindows/HotelRatingBody/HotelRatingBody';
import HotelsAppBar from './HotelsAppBar';
import HotelsSearchBody from './SubWindows/HotelsSearchBody/HotelsSearchBody';
import LoadingPage from './LoadingPage';
import ChangePasswordDialog from './ChangePasswordDialog';

function HotelsPage() {
    const dispatch = useAppDispatch();
    const isLoadingAuth = useAppSelector((state) => state.auth.isLoading);
    const isInside = useAppSelector((state) => state.auth.loggedInMode !== 'LoggedOut');
    const isLoggedIn = useAppSelector((state) => state.auth.loggedInMode === 'LoggedIn');

    const hotelBodyMode = useAppSelector((state) => state.hotels.hotelBody.bodyMode);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getLoggedUser());
        }
    }, [isLoggedIn]);

    if (!isInside) {
        return <Navigate to="/" />;
    }

    return (<>
        {isLoadingAuth
            ? (<LoadingPage />)
            : (<Box sx={{
                flexGrow: 1,
                width: '100%',
                height: '100vh',
                backgroundColor: '#FEFCF3'
            }}>
                <HotelsAppBar />
                {
                    // Currently the search page is the home
                    hotelBodyMode === 'Home'
                        ? <HotelsSearchBody />
                        : hotelBodyMode === 'Search'
                            ? < HotelsSearchBody />
                            : hotelBodyMode === 'Ratings'
                                ? <HotelRatingBody />
                                : <Typography variant="h1">Error. </Typography>
                }
            </Box>)}
        <ChangePasswordDialog />
    </>);
}

export default HotelsPage;