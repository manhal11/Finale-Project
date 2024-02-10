import { Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Grid, IconButton, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { LoadingButton } from '@mui/lab';

import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addHotel, closeHotelDialog, deleteHotel, getHotels, setCurrentDialogHotelData, updateHotel } from 'redux/reducers/hotelsSlice';
import { HotelData } from 'api/dtos/Hotel';
import { COUNTRY_LIST } from 'types';
import { PayloadAction } from '@reduxjs/toolkit';

interface HotelDialogProps {
    submitSearchCallback?: () => void
};

const HotelDialog: React.FC<HotelDialogProps> = ({ submitSearchCallback }) => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.hotels.hotelDialog.isOpen);
    const isEdit = useAppSelector((state) => state.hotels.hotelDialog.isEdit);
    const isLoading = useAppSelector((state) => state.hotels.hotelDialog.isLoading);
    const currentHotel = useAppSelector((state) => state.hotels.hotelDialog.currentHotel);

    const errors = useAppSelector((state) => state.hotels.error);

    const updateCurrentHotel = useCallback((newData: Partial<HotelData>) => {
        dispatch(setCurrentDialogHotelData({ ...currentHotel, ...newData }));
    }, [dispatch, currentHotel]);


    const refreshPage = useCallback((action:
        PayloadAction<any, string, { arg: any, requestId: string, requestStatus: 'fulfilled' | 'rejected' }>
    ) => {
        if (action.meta.requestStatus === 'fulfilled') {
            dispatch(closeHotelDialog());
            submitSearchCallback?.();
        }
    }, []);
    const handleCancle = useCallback((e: React.SyntheticEvent) => {
        if (isLoading) {
            e.preventDefault();
            return;
        }
        dispatch(closeHotelDialog());
    }, [isLoading]);
    const handleSubmit = useCallback(() => {
        if (isLoading) {
            return;
        }
        if (currentHotel) {
            if (isEdit) {
                dispatch(updateHotel(currentHotel)).then(refreshPage);
            } else {
                dispatch(addHotel(currentHotel)).then(refreshPage);
            }
        }
        // Dispatch this then close if not error
    }, [dispatch, isLoading, currentHotel, refreshPage]);
    const handleDelete = useCallback(() => {
        if (isLoading) {
            return;
        }
        if (currentHotel && currentHotel.id) {
            dispatch(deleteHotel(currentHotel.id)).then(refreshPage);
        }
        // Dispatch this then close if not error
        dispatch(closeHotelDialog());
    }, [dispatch, isLoading, currentHotel, refreshPage]);

    return (
        <Dialog open={isOpen} onClose={handleCancle}>
            <DialogTitle>{isEdit ? 'Edit Hotel' : 'Add Hotel'}</DialogTitle>
            <DialogContent>
                {currentHotel && <FormGroup>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                id="name"
                                label="Name"
                                defaultValue={currentHotel.name}
                                onChange={(e) => updateCurrentHotel({ name: e.target.value })}
                                fullWidth
                                variant="standard"

                                error={errors && typeof (errors) !== 'string' && errors['Name'] ? true : false}
                                helperText={errors && typeof (errors) !== 'string' ? errors['Name'] : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                disablePortal
                                id="country"
                                defaultValue={currentHotel.country}
                                onChange={(e, newValue) => updateCurrentHotel({ country: newValue ?? '' })}
                                options={COUNTRY_LIST}
                                renderInput={(params) => <TextField
                                    {...params}
                                    label="Country"
                                    variant="standard"

                                    error={errors && typeof (errors) !== 'string' && errors['Country'] ? true : false}
                                    helperText={errors && typeof (errors) !== 'string' ? errors['Country'] : ''}
                                />}
                                fullWidth

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoFocus
                                id="city"
                                label="City"
                                defaultValue={currentHotel.city}
                                onChange={(e) => updateCurrentHotel({ city: e.target.value })}
                                fullWidth
                                variant="standard"

                                error={errors && typeof (errors) !== 'string' && errors['City'] ? true : false}
                                helperText={errors && typeof (errors) !== 'string' ? errors['City'] : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel id="has-restaurant" control={<Checkbox
                                checked={currentHotel.hasRestaurant ?? false}
                                onChange={(e) => updateCurrentHotel({ hasRestaurant: e.target.checked })}
                            />} label="Has a Restaurant" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel id="has-restaurant" control={<Checkbox
                                checked={currentHotel.hasDinningHall ?? false}
                                onChange={(e) => updateCurrentHotel({ hasDinningHall: e.target.checked })}
                            />} label="Has a Dinning Hall" />
                        </Grid>
                    </Grid>
                </FormGroup>}
            </DialogContent>
            <DialogActions>
                <Button disabled={isLoading} onClick={handleCancle}>Cancel</Button>
                <LoadingButton loading={isLoading} onClick={handleSubmit}>{isEdit ? 'Apply' : 'Add'}</LoadingButton>

                {isEdit && <>
                    <div style={{ flex: '1 0 0' }} />
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
                        Delete
                    </Button>
                </>}
            </DialogActions>
        </Dialog >
    );
}

export default HotelDialog;