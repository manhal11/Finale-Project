import React, { useCallback, useMemo, useState } from 'react';
import { Hotel } from 'api/dtos/Hotel';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getRandomImage, getRatings } from 'types';
import RatingsCard from './Ratings/RatingsComponents/RatingsCard';
import { Alert, Box, Grid, IconButton } from '@mui/material';
import HotelCardVerbose from './Ratings/HotelCardVerbose';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getHotels, refreshCurrentHotel, setBodyToHotelRatings, setBodyToHotelSearch } from 'redux/reducers/hotelsSlice';
import HotelRatingDialog from './Ratings/HotelRatingDialog';

interface HotelRatingBodyProps {

};

const HotelRatingBody: React.FC<HotelRatingBodyProps> = () => {
    const dispatch = useAppDispatch();

    const currentHotel = useAppSelector((state) => state.hotels.hotelBody.currentHotel);

    const image = useMemo(() => getRandomImage(), []); // For Demo

    const restaurantRatings = useMemo(() => {
        if (!currentHotel?.restaurantRatings) return null;
        return getRatings(currentHotel.restaurantRatings);

    }, [currentHotel]);

    const dinningHallRatings = useMemo(() => {
        if (!currentHotel?.dinningHallRatings) return null;
        return getRatings(currentHotel.dinningHallRatings);
    }, [currentHotel]);

    //const dinningHallRatings = useMemo(() => {
    //    if (!currentHotel?.dinningHallRatings) return null;
    //}, [currentHotel]);

    return (<>
        <Box sx={{ width: 'auto', mt: 2, ml: 2}}>
            <IconButton size="large" onClick={() => dispatch(setBodyToHotelSearch())}>
                <ArrowBackIcon />
            </IconButton>
        </Box>
        {currentHotel ? (<Grid spacing={2} container sx={{
            p: 4,
            pt: 2
        }} >
            <Grid item xs={12}>
                <HotelCardVerbose hotel={currentHotel} />
            </Grid>
            <Grid item xs={6}>
                {restaurantRatings && < RatingsCard ratings={restaurantRatings} title="Restaurant Ratings" />}
            </Grid>
            <Grid item xs={6}>
                {dinningHallRatings && < RatingsCard ratings={dinningHallRatings} title="Dinning Hall Ratings" />}
            </Grid >

        </Grid >)
            : (<Alert severity="error">Error loading hotel. </Alert>)}
        <HotelRatingDialog refreshCallback={() =>
            dispatch(getHotels({})).then(() =>
                dispatch(refreshCurrentHotel()))} />
    </>);
}

export default HotelRatingBody;