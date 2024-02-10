import { alpha, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Rating, Stack, Tooltip, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { Hotel } from 'api/dtos/Hotel';

import RestaurantIcon from '@mui/icons-material/Restaurant';
import EditIcon from '@mui/icons-material/Edit';


import TableBarIcon from '@mui/icons-material/TableBar';
import { getRandomImage } from 'types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { openEditHotelDialog, setBodyToHotelRatings } from 'redux/reducers/hotelsSlice';
import { logout } from 'redux/reducers/authSlice';

interface HotelCardProps {
    hotel: Hotel,
    showRandomImage?: boolean // For demo
};



const HotelCard: React.FC<HotelCardProps> = ({ hotel, showRandomImage = true }) => {
    const dispatch = useAppDispatch();

    const image = useMemo(() => getRandomImage(), []); // For Demo

    const isLoggedIn = useAppSelector((state) => state.auth.loggedInMode === 'LoggedIn');
    const isAdmin = useAppSelector((state) => state.auth.loggedUser?.role === 'Administrator');
    
    // Calculate average rating
    const averageRating = useMemo(() => {
        //let sum = 0;
        //let count = 0;
        //if (hotel.restaurantRating) {
        //    for (const [key, value] of Object.entries(hotel.restaurantRating)) {
        //        if (typeof (value) === 'number') {
        //            sum += value;
        //            count++;
        //        }
        //    }
        //}
        //if (hotel.dinningHallRatings) {
        //    for (const [key, value] of Object.entries(hotel.dinningHallRatings)) {
        //        if (typeof (value) === 'number') {
        //            sum += value;
        //            count++;
        //        }
        //    }
        //}
        //return count === 0 ? null : sum / count;
        return hotel.rating;
    }, [hotel]);

    const handleViewRatingsClick = useCallback(() => {
        if (isLoggedIn) {
            dispatch(setBodyToHotelRatings(hotel));
        } else {
            dispatch(logout());
        }
    }, []);

    return (
        <Card sx={{
            minWidth: 275,

            '&:hover': {
                transform: 'translate(-5px, -5px)',
                boxShadow: '5px 5px rgba(0,0,0,0.2)',
                transitionProperty: 'all',
                transitionDuration: '0.15s',
                transitionTimingFunction: 'ease-in-out'
            },
            transform: 'translate(0px, 0px)',
            boxShadow: '1px 1px rgba(0,0,0,0.2)',
            transitionProperty: 'all',
            transitionDuration: '0.15s',
            transitionTimingFunction: 'ease-in-out'
        }}>
            <CardActionArea
                onClick={
                    isLoggedIn && isAdmin
                        ? () => {
                            dispatch(openEditHotelDialog(hotel))
                        }
                        : undefined
                }
                sx={
                    isAdmin
                        ? {
                            '&:hover': {
                                '.My-Edit-Overlay': {
                                    opacity: 1,
                                    backgroundColor: alpha('#ffffff', 0.6),
                                    transitionProperty: 'background-color, opacity',
                                    transitionDuration: '0.1s',
                                    transitionTimingFunction: 'ease-in-out'
                                },
                            },
                            '.My-Edit-Overlay': {
                                opacity: 0,
                                backgroundColor: alpha('#fefefe', 0),
                                transitionProperty: 'background-color, opacity',
                                transitionDuration: '0.1s',
                                transitionTimingFunction: 'ease-in-out'
                            }
                        }
                        : undefined
                }
            >
                {isAdmin && <Box className="My-Edit-Overlay" sx={{ backgroundColor: '#fefefe', position: 'absolute', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    <Typography variant="h5">
                        Edit Hotel
                    </Typography>
                    <EditIcon />
                </Box>}
                {showRandomImage && <CardMedia
                    component="img"
                    height="200"
                    image={image}
                />}
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box>
                            <Typography variant="h5" component="div">
                                {hotel.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {hotel.city + ", " + hotel.country}
                            </Typography>
                        </Box>
                        <div style={{ flex: '1 0 0' }} />

                        <Stack spacing={1}>
                            {hotel.restaurantRatings && <Tooltip title="Hotel has a Restaurant">
                                <RestaurantIcon />
                            </Tooltip>}
                            {hotel.dinningHallRatings && <Tooltip title="Hotel has a Dinning Hall">
                                <TableBarIcon />
                            </Tooltip>}
                        </Stack>

                    </Box>
                </CardContent >

            </CardActionArea>
            <CardActions>
                <Button variant="contained" color="secondary" size="small" onClick={handleViewRatingsClick}>View Ratings</Button>
                <div style={{ flex: '1 0 0' }} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Rating name="average-rating" disabled={!averageRating} value={averageRating ? averageRating / 2 : 0} precision={0.5} readOnly />
                    <Typography variant="subtitle2" sx={{ ml: '4px' }}>{averageRating ? averageRating.toFixed(2).toString() + ' / 10' : 'No Rating'}</Typography>
                </Box>
            </CardActions>
        </Card >
    );
}

export default HotelCard;