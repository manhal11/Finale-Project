import { alpha, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, Rating, Stack, Tooltip, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { Comment, Hotel } from 'api/dtos/Hotel';

import RestaurantIcon from '@mui/icons-material/Restaurant';
import EditIcon from '@mui/icons-material/Edit';

import PlaceIcon from '@mui/icons-material/Place';
import TableBarIcon from '@mui/icons-material/TableBar';

import { getRandomImage } from 'types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { openDinningHallRating, openEditHotelDialog, openRestaurantRating, setBodyToHotelRatings } from 'redux/reducers/hotelsSlice';
import { logout } from 'redux/reducers/authSlice';
import CommentsContainer from './CommentsComponents/CommentsContainer';

interface HotelCardVerboseProps {
    hotel: Hotel,
    showRandomImage?: boolean // For demo
};



const HotelCardVerbose: React.FC<HotelCardVerboseProps> = ({ hotel, showRandomImage = true }) => {
    const dispatch = useAppDispatch();

    const image = useMemo(() => getRandomImage(), []); // For Demo

    const allComments = useMemo(() => {
        let comments: Comment[] = [];
        if (hotel.restaurantRatings?.comments) {
            comments = comments.concat(hotel.restaurantRatings.comments);
        }
        if (hotel.dinningHallRatings?.comments) {
            comments = comments.concat(hotel.dinningHallRatings.comments);
        }
        return comments;
    }, [hotel]);

    return (
        <Card variant="outlined" sx={{ width: '100%', maxHeight: '800px' }}>
            <Grid container sx={{ height: '100%' }}>
                <Grid item xs={5} sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant="h3" component="div">
                            {hotel.name}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <PlaceIcon color="disabled" />
                            <Typography variant="h5" color="text.secondary">
                                {hotel.city + ", " + hotel.country}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} >User Reviews</Divider>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ height: 500}}>
                                <CommentsContainer comments={allComments} />
                            </Box>
                            <Stack direction="row" spacing={2} sx={{ mt: 2}}>
                                {hotel.restaurantRatings && <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => dispatch(openRestaurantRating(hotel.id))}>
                                    Rate Restaurant
                                </Button>}
                                {hotel.dinningHallRatings && <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => dispatch(openDinningHallRating(hotel.id))}>
                                    Rate Dinning Hall
                                </Button>}
                            </Stack>
                        </Box>
                    </CardContent>
                </Grid>
                <Grid item xs={7}>
                    {image && <CardMedia
                        component="img"
                        height="200px"
                        image={image}
                        sx={{ height: '100%' }}
                    />}
                </Grid>
            </Grid>
        </Card >
    );
}

export default HotelCardVerbose;