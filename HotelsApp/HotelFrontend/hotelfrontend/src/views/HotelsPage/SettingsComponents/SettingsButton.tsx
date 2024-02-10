import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import { logout, openChangePasswordDialog } from 'redux/reducers/authSlice';
import { useAppDispatch } from 'redux/hooks';

function SettingsButton() {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 2 }}>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                
            >
                <SettingsIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    handleClose();
                    dispatch(openChangePasswordDialog());
                }}>Change Password</MenuItem>
                <MenuItem onClick={() => {
                    handleClose();
                    dispatch(logout());
                }}>Logout</MenuItem>
            </Menu>
        </Box>
    );
}

export default SettingsButton;