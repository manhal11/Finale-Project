import React, { useCallback, useState } from 'react';
import { Autocomplete, Box, Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography } from '@mui/material';
import { HotelQueryParams, HotelSortOption } from 'api/dtos/Hotel';
import { COUNTRY_LIST } from 'types';
import ReactStickyBox from 'react-sticky-box';
import RatingRangeSlider from './Context/RatingRangeSlider';


interface HotelFiltersProps {
    queryParams: HotelQueryParams,
    setQueryParams: (queryParams: HotelQueryParams) => void,
    submitCallback?: () => void
};

const HotelsFilters: React.FC<HotelFiltersProps> = ({ queryParams, setQueryParams, submitCallback }) => {
    const [filtersDisabled, setFiltersDisabled] = useState(true);


    const submitHandler = useCallback(() => {
        setFiltersDisabled(true);
        submitCallback?.();
    }, [submitCallback, setFiltersDisabled]);

    React.useEffect(() => {
        console.log("MIN MAX:" , queryParams.minRating, queryParams.maxRating);
    }, [queryParams]);

    return (
        <ReactStickyBox offsetTop={96} offsetBottom={96}>
            <Card
                variant="outlined"
                sx={{
                    height: '100%',
                }}>
                <CardContent>
                    <FormGroup onSubmit={() => { submitHandler?.() }}>
                        <Typography variant="h6">Filter by:</Typography>
                        <Divider />
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <Autocomplete
                                    disablePortal
                                    value={queryParams.country ?? null}
                                    onChange={(e, newValue) => {
                                        setFiltersDisabled(false);
                                        setQueryParams({ ...queryParams, country: !newValue || newValue === '' ? undefined : newValue })
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.keyCode == 13) {
                                            submitHandler?.();
                                        }
                                    }}
                                    options={COUNTRY_LIST}
                                    renderInput={(params) => <TextField {...params} label="Country" />}
                                    //isOptionEqualToValue={(option, value) => value !== "" ? (option === value) : false}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={queryParams.city ?? ""}
                                    onChange={(e) => {
                                        setFiltersDisabled(false);
                                        setQueryParams({ ...queryParams, city: e.target.value === '' ? undefined : e.target.value })
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.keyCode == 13) {
                                            submitHandler?.();
                                        }
                                    }}
                                    autoComplete="off"
                                    label="City"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}><Divider /></Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <FormControlLabel control={<Checkbox
                                        checked={queryParams.hasRestaurant ?? false}
                                        onChange={(e) => {
                                            setFiltersDisabled(false);
                                            setQueryParams({ ...queryParams, hasRestaurant: e.target.checked ? true : undefined })
                                        }}
                                    />} label="Hotels With a Restaurant" />
                                    <FormControlLabel control={<Checkbox
                                        checked={queryParams.hasDinningHall ?? false}
                                        onChange={(e) => {
                                            setFiltersDisabled(false);
                                            setQueryParams({ ...queryParams, hasDinningHall: e.target.checked ? true : undefined })
                                        }}
                                    />} label="Hotels With a Dinning Hall" />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6">Filter by Rank:</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <RatingRangeSlider
                                    value={[queryParams.minRating ?? 0, queryParams.maxRating ?? 0]}
                                    setValue={(newValue) => {
                                        setFiltersDisabled(false);
                                        setQueryParams({ ...queryParams, minRating: newValue[0], maxRating: newValue[1] })
                                    }}
                                    
                                />
                            </Grid>
                        </Grid>
                        <Typography sx={{ mt: 2 }} variant="h6">Sort by:</Typography>
                        <Divider />
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Sort by"
                                    value={queryParams.sortBy ?? ''}
                                    onChange={(e) => {
                                        setFiltersDisabled(false);
                                        setQueryParams({ ...queryParams, sortBy: !e?.target?.value ? undefined : e.target.value as HotelSortOption })
                                    }}
                                    onKeyDown={(e: { keyCode: number; }) => {
                                        if (e.keyCode == 13) {
                                            submitHandler?.();
                                        }
                                    }}
                                >
                                    <MenuItem value="no_sorting">No Sorting</MenuItem>
                                    <MenuItem value="name">Name</MenuItem>
                                    <MenuItem value="name_desc">Name (Descending)</MenuItem>
                                    <MenuItem value="restaurant_rating">Restaurant Rating</MenuItem>
                                    <MenuItem value="restaurant_rating_desc">Restaurant Rating (Descending)</MenuItem>
                                    <MenuItem value="dinning_hall_rating">Dining Hall Rating</MenuItem>
                                    <MenuItem value="dinning_hall_rating_desc">Dining Hall Rating (Descending)</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <Button
                                    disabled={filtersDisabled}
                                    variant="contained"
                                    fullWidth
                                    onClick={submitHandler}
                                >
                                    Apply Filters
                                </Button>
                            </Grid>
                        </Grid>
                    </FormGroup>
                </CardContent>
            </Card>
        </ReactStickyBox>
    );
}

export default HotelsFilters;