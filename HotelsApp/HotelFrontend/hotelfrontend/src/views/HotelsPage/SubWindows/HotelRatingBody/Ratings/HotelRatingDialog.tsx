import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Grid, IconButton, TextField } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';

import { LoadingButton } from '@mui/lab';


import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addDinningHallRating, addRestaurantRating, closeRatingDialog, setDinningHallDialogState, setRestaurantDialogState } from 'redux/reducers/hotelsSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { DinningHallRating, RestaurantRating } from 'api/dtos/Hotel';
import RatingsCard from './RatingsComponents/RatingsCard';
import { getRatings } from 'types';

interface HotelRatingDialogProps {
    refreshCallback?: () => void
};

const HotelRatingDialog: React.FC<HotelRatingDialogProps> = ({ refreshCallback }) => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.hotels.ratingDialog.isOpen);
    const dialogType = useAppSelector((state) => state.hotels.ratingDialog.type);
    const isLoading = useAppSelector((state) => state.hotels.ratingDialog.isLoading);

    const errors = useAppSelector((state) => state.hotels.error);

    const restaurantDialogState = useAppSelector((state) => state.hotels.ratingDialog.restaurantDialogState);
    const dinningHallDialogState = useAppSelector((state) => state.hotels.ratingDialog.dinningHallDialogState);

    const updateCurrentRating = useCallback((newData: Partial<RestaurantRating | DinningHallRating>) => {
        if (dialogType === 'Restaurant') {
            dispatch(setRestaurantDialogState({ ...restaurantDialogState, ...newData }));
        } else {
            dispatch(setDinningHallDialogState({ ...dinningHallDialogState, ...newData }));
        }
    }, [dispatch, dialogType, dinningHallDialogState, restaurantDialogState]);

    const handleRate = useCallback((label: string, newValue: number | null) => {
        updateCurrentRating({ [label]: newValue });
    }, [updateCurrentRating])

    const ratings = useMemo(() =>
        dialogType === 'Restaurant'
            ? restaurantDialogState
            : dinningHallDialogState, [dialogType, restaurantDialogState, dinningHallDialogState]);

    const refreshPage = useCallback((action:
        PayloadAction<any, string, { arg: any, requestId: string, requestStatus: 'fulfilled' | 'rejected' }>
    ) => {
        if (action.meta.requestStatus === 'fulfilled') {
            dispatch(closeRatingDialog());
            refreshCallback?.();
        }
    }, [dispatch]);
    const handleCancle = useCallback((e: React.SyntheticEvent) => {
        if (isLoading) {
            e.preventDefault();
            return;
        }
        dispatch(closeRatingDialog());
    }, [dispatch, isLoading]);
    const handleSubmit = useCallback(() => {
        if (isLoading) {
            return;
        }
        if (dialogType === 'Restaurant') {
            dispatch(addRestaurantRating(restaurantDialogState)).then(refreshPage);
        } else {
            dispatch(addDinningHallRating(dinningHallDialogState)).then(refreshPage);
        }
        // Dispatch this then close if not error
    }, [dispatch, dialogType, isLoading, refreshPage, restaurantDialogState, dinningHallDialogState]);

    const rawRatings = useMemo(() => {
        return getRatings(ratings);
    }, [ratings]);

    return (
        <Dialog open={isOpen} onClose={handleCancle}>
            <DialogTitle>{dialogType === "Restaurant" ? 'Rate Restaurant' : 'Rate Dinning Hall'}</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <RatingsCard ratings={rawRatings} onRate={handleRate} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                id="comment"
                                label="Leave a Comment"
                                fullWidth
                                minRows={3}
                                multiline
                                inputProps={{ maxLength: 200 }}
                                variant="standard"
                                onChange={(e) => updateCurrentRating({ comment: (e.target.value as string) === "" ? null : e.target.value as string })}
                                autoComplete="new-password"

                                error={errors && typeof (errors) !== 'string' && errors['Name'] ? true : false}
                                helperText={errors && typeof (errors) !== 'string' ? errors['Name'] : ''}
                            />
                        </Grid>
                    </Grid>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button disabled={isLoading} onClick={handleCancle}>Cancel</Button>
                <LoadingButton loading={isLoading} onClick={handleSubmit}>Rate</LoadingButton>
            </DialogActions>
        </Dialog >
    );
}

export default HotelRatingDialog;