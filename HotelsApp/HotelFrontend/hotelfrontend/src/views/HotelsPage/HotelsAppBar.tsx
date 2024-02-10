import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logout } from 'redux/reducers/authSlice';
import { resetHotelsData } from 'redux/reducers/hotelsSlice';
import SettingsButton from './SettingsComponents/SettingsButton';

function HotelsAppBar() {
    const dispatch = useAppDispatch();
    const isGuestIn = useAppSelector((state) => state.auth.loggedInMode === 'GuestIn');
    const loggedUser = useAppSelector((state) => state.auth.loggedUser);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" component="div">
                    Welcome to the Recommendation System
                </Typography>
                <div style={{ flex: '1 0 0' }}/>
                {loggedUser && < SettingsButton />}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    {isGuestIn
                        ? <>
                            <Typography variant="caption">You are not logged in. </Typography>
                            <Button size="small" color="inherit" variant="text" onClick={() => dispatch(logout())}>Login</Button>
                        </>
                        : <>
                            {loggedUser && <Typography variant="caption">Hello {loggedUser.username}</Typography>}
                            <Button size="small" color="inherit" variant="text" onClick={() => {
                                dispatch(logout());
                                dispatch(resetHotelsData());
                            }}>Logout</Button>
                        </>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default HotelsAppBar;