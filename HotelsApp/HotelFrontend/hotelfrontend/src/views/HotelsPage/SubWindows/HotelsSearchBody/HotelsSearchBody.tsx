import { Box, Button, Card, CardContent, Checkbox, FormControlLabel, FormGroup, Grid, Grow, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import LoadingPage from '../../LoadingPage';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import HotelCard from './Context/HotelCard';
import { HotelQueryParams } from 'api/dtos/Hotel';
import { getHotels, openAddHotelDialog } from 'redux/reducers/hotelsSlice';
import HotelsFilters from './HotelsFilters';
import HotelDialog from '../HotelDialog';

function HotelsSearchBody() {
    const dispatch = useAppDispatch();
    const isLoadingHotels = useAppSelector((state) => state.hotels.isLoading);
    const hotels = useAppSelector((state) => state.hotels.hotels);

    const isAdmin = useAppSelector((state) => state.auth.loggedUser?.role === 'Administrator');

    const [queryParams, setQueryParams] = useState<HotelQueryParams>({
        minRating: 0.0,
        maxRating: 10.0,
        sortBy: 'no_sorting'
    });

    const submitSearch = useCallback(() => {
        dispatch(getHotels(queryParams));
    }, [queryParams]);

    useEffect(() => {
        submitSearch();
    }, []);
    return (<>
        <Grid container sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'row',
        }}>
            <Grid item xs={12} sm={4} lg={3} xl={2}>
                <HotelsFilters queryParams={queryParams} setQueryParams={setQueryParams} submitCallback={() => submitSearch()} />
            </Grid>
            <Grid item xs={12} sm={8} lg={9} xl={10}>
                <Box sx={{ ml: 2, height: '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TextField
                            label="Hotel Name"
                            value={queryParams.name ?? ""}
                            onChange={(e) => setQueryParams({ ...queryParams, name: e.target.value !== "" ? e.target.value : undefined })}
                            onKeyDown={(e) => {
                                if (e.keyCode == 13) {
                                    submitSearch();
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            name="search"
                            type="text"
                            autoComplete="off"
                            size="medium"
                            sx={{ width: '50%' }}
                        />
                        <Button variant="contained" size="large" sx={{ ml: 2, height: '100%' }} onClick={() => submitSearch()}>Search</Button>
                        {isAdmin && <>
                            { /* <div style={{ flex: '1 0 0' }} /> */ }
                            <Button
                                variant="contained"
                                size="large"
                                color="info"
                                sx={{ ml: 2, height: '100%' }}
                                endIcon={<AddIcon />}
                                onClick={() => dispatch(openAddHotelDialog())}>Add Hotel</Button>
                        </>}
                    </Box>
                    {isLoadingHotels
                        ? (<LoadingPage nested />)
                        : (hotels.length === 0
                            ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Typography variant="h5">No Results. </Typography>
                            </Box>
                            : <>
                                <Typography variant="h5" sx={{ pt: 2 }}>Results: </Typography>
                                <Grid container spacing={4} sx={{ pt: 2 }}>
                                    {hotels.map((hotel, index) => (
                                        <Grid item key={index}>
                                            <HotelCard hotel={hotel} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )
                    }
                </Box>
            </Grid>
        </Grid>
        <HotelDialog submitSearchCallback={submitSearch} />
    </>);
}

export default HotelsSearchBody;