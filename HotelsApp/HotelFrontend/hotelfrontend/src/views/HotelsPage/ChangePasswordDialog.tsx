import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, Grid, TextField, Typography } from '@mui/material';
import { PayloadAction } from '@reduxjs/toolkit';
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { changePassword, closeChangePasswordDialog, logout, setDialogData } from 'redux/reducers/authSlice';

function ChangePasswordDialog() {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.auth.changePasswordDialog.isOpen);
    const isLoading = useAppSelector((state) => state.auth.changePasswordDialog.isLoading);
    const dialogData = useAppSelector((state) => state.auth.changePasswordDialog.dialogData);

    const errors = useAppSelector((state) => state.auth.error);

    const updateDialogData = useCallback((newData: Partial<{ oldPassword: string, newPassword: string}>) => {
        dispatch(setDialogData({ ...dialogData, ...newData }));
    }, [dispatch, dialogData]);


    const refreshPage = useCallback((action:
        PayloadAction<any, string, { arg: any, requestId: string, requestStatus: 'fulfilled' | 'rejected' }>
    ) => {
        if (action.meta.requestStatus === 'fulfilled') {
            dispatch(logout());
            dispatch(closeChangePasswordDialog());
        }
    }, []);
    const handleCancle = useCallback((e: React.SyntheticEvent) => {
        if (isLoading) {
            e.preventDefault();
            return;
        }
        dispatch(closeChangePasswordDialog());
    }, [isLoading]);
    const handleSubmit = useCallback(() => {
        if (isLoading) {
            return;
        }
        dispatch(changePassword(dialogData)).then(refreshPage);
        // Dispatch this then close if not error
    }, [dispatch, isLoading, dialogData, refreshPage]);

    return (
        <Dialog open={isOpen} onClose={handleCancle}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                label="Current Password"
                                defaultValue={dialogData.oldPassword}
                                onChange={(e) => updateDialogData({ oldPassword: e.target.value })}
                                fullWidth
                                variant="standard"
                                type="password"
                                autoComplete="off"

                                error={errors && typeof (errors) !== 'string' && errors['OldPassword'] ? true : false}
                                helperText={errors && typeof (errors) !== 'string' ? errors['OldPassword'] : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="New Password"
                                defaultValue={dialogData.newPassword}
                                onChange={(e) => updateDialogData({ newPassword: e.target.value })}
                                fullWidth
                                variant="standard"
                                type="password"

                                error={errors && typeof (errors) !== 'string' && errors['NewPassword'] ? true : false}
                                helperText={errors && typeof (errors) !== 'string' ? errors['NewPassword'] : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color="error">{(errors && typeof (errors) === 'string') ? errors : ""}</Typography>
                        </Grid>
                    </Grid>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button disabled={isLoading} onClick={handleCancle}>Cancel</Button>
                <LoadingButton loading={isLoading} onClick={handleSubmit}>Update Password</LoadingButton>
            </DialogActions>
        </Dialog >
    );
}

export default ChangePasswordDialog;