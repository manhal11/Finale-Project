import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import { CONNECTION_ERROR_MESSAGE } from 'api/apiClient';
import { DinningHallRating, Hotel, HotelData, HotelQueryParams, makeEmptyDinningHallRating, makeEmptyHotelData, makeEmptyRestaurantRating, makeHotelData, RestaurantRating } from '../../api/dtos/Hotel';
import { apiDeleteHotel, apiGetHotels, apiPostHotel, apiPutHotel } from 'api/hotelsApi';
import { ErrorMessageResponse, Errors, ErrorsResponse, isErrorMessageResponse, isErrorsResponse } from 'types';
import { RootState } from '../store'
import { apiPostDinningHallRating, apiPostRestaurantRating } from 'api/ratingsApi';

interface HotelState {
    isLoading: boolean;
    hotels: Hotel[];
    hotelDialog: {
        isOpen: boolean;
        isEdit: boolean;
        isLoading: boolean;
        currentHotel: HotelData | null;
    };
    ratingDialog: {
        isOpen: boolean;
        type: 'Restaurant' | 'DinningHall';
        isLoading: boolean;
        restaurantDialogState: RestaurantRating;
        dinningHallDialogState: DinningHallRating;
    };
    hotelBody: {
        bodyMode: 'Home' | 'Search' | 'Ratings';
        currentHotel: Hotel | null;
    };
    error: string | Errors | null;
}

const initialState: HotelState = {
    isLoading: false,
    hotels: [],
    hotelDialog: {
        isOpen: false,
        isEdit: false,
        isLoading: false,
        currentHotel: null
    },
    ratingDialog: {
        isOpen: false,
        type: 'Restaurant',
        isLoading: false,
        restaurantDialogState: makeEmptyRestaurantRating(0),
        dinningHallDialogState: makeEmptyDinningHallRating(0)
    },
    hotelBody: {
        bodyMode: 'Home',
        currentHotel: null
    },
    error: null
}

// ---------- Async Actions ----------
export const getHotels = createAsyncThunk(
    'hotel/getHotels',
    async (queryParams: HotelQueryParams, { rejectWithValue }) => {
        try {
            const response = await apiGetHotels(queryParams);
            return response.data
        } catch (_err) {
            const err = _err as AxiosError;
            if (!err.response) {
                return rejectWithValue(CONNECTION_ERROR_MESSAGE);
            }
            return rejectWithValue(err.response.data)
        }
    }
);

export const addHotel = createAsyncThunk(
    'hotel/addHotel',
    async (hotelToAdd: HotelData, { rejectWithValue }) => {
        try {
            const response = await apiPostHotel(hotelToAdd);
            return response.data
        } catch (_err) {
            const err = _err as AxiosError;
            if (!err.response) {
                return rejectWithValue(CONNECTION_ERROR_MESSAGE);
            }
            return rejectWithValue(err.response.data)
        }
    }
);

export const updateHotel = createAsyncThunk(
    'hotel/updateHotel',
    async (hotelToUpdate: HotelData, { rejectWithValue }) => {
        try {
            const response = await apiPutHotel(hotelToUpdate);
            return response.data
        } catch (_err) {
            const err = _err as AxiosError;
            if (!err.response) {
                return rejectWithValue(CONNECTION_ERROR_MESSAGE);
            }
            return rejectWithValue(err.response.data)
        }
    }
);

export const deleteHotel = createAsyncThunk(
    'hotel/deleteHotel',
    async (hotelId: number, { rejectWithValue }) => {
        try {
            const response = await apiDeleteHotel(hotelId);
            return response.data
        } catch (_err) {
            const err = _err as AxiosError;
            if (!err.response) {
                return rejectWithValue(CONNECTION_ERROR_MESSAGE);
            }
            return rejectWithValue(err.response.data)
        }
    }
);

export const addRestaurantRating = createAsyncThunk(
    'hotel/addRestaurantRating',
    async (rating: RestaurantRating, { rejectWithValue }) => {
        try {
            const response = await apiPostRestaurantRating(rating);
            return response.data
        } catch (_err) {
            const err = _err as AxiosError;
            if (!err.response) {
                return rejectWithValue(CONNECTION_ERROR_MESSAGE);
            }
            return rejectWithValue(err.response.data)
        }
    }
);

export const addDinningHallRating = createAsyncThunk(
    'hotel/addDinningHallRating',
    async (rating: DinningHallRating, { rejectWithValue }) => {
        try {
            const response = await apiPostDinningHallRating(rating);
            return response.data
        } catch (_err) {
            const err = _err as AxiosError;
            if (!err.response) {
                return rejectWithValue(CONNECTION_ERROR_MESSAGE);
            }
            return rejectWithValue(err.response.data)
        }
    }
);

// ---------- Hotel Slice ----------

export const hotelsSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {
        resetHotelsData: (state) => initialState,
        refreshCurrentHotel: (state) => {
            if (!state.hotelBody.currentHotel) return;
            const id = state.hotelBody.currentHotel.id;
            const result = state.hotels.filter(hotel => hotel.id === id);
            if (result.length > 0) {
                state.hotelBody.currentHotel = result[0];
            }
        },
        // Hotel Dialog
        openAddHotelDialog: (state) => {
            state.hotelDialog.isOpen = true;
            state.hotelDialog.isEdit = false;
            state.hotelDialog.currentHotel = makeEmptyHotelData();
        },
        openEditHotelDialog: (state, { payload }) => {
            state.hotelDialog.isOpen = true;
            state.hotelDialog.isEdit = true;
            state.hotelDialog.currentHotel = makeHotelData(payload as Hotel);
        },
        closeHotelDialog: (state) => {
            state.hotelDialog.isOpen = false;
        },

        setCurrentDialogHotelData: (state, { payload }) => {
            state.hotelDialog.currentHotel = payload;
        },

        // Hotel Rating Dialog
        openRestaurantRating: (state, { payload }) => {
            state.ratingDialog.isOpen = true;
            state.ratingDialog.restaurantDialogState = makeEmptyRestaurantRating(payload);
            state.ratingDialog.type = 'Restaurant';
        },
        openDinningHallRating: (state, { payload }) => {
            state.ratingDialog.isOpen = true;
            state.ratingDialog.dinningHallDialogState = makeEmptyDinningHallRating(payload);
            state.ratingDialog.type = 'DinningHall';
        },
        closeRatingDialog: (state) => {
            state.ratingDialog.isOpen = false;
        },
        setRestaurantDialogState: (state, { payload }) => {
            state.ratingDialog.restaurantDialogState = payload;
        },
        setDinningHallDialogState: (state, { payload }) => {
            state.ratingDialog.dinningHallDialogState = payload;
        },

        // Hotel Rating
        setBodyToHotelHome: (state) => {
            state.hotelBody.bodyMode = 'Home';
        },
        setBodyToHotelSearch: (state) => {
            state.hotelBody.bodyMode = 'Search';
        },
        setBodyToHotelRatings: (state, { payload }) => {
            state.hotelBody.bodyMode = 'Ratings';
            state.hotelBody.currentHotel = payload as Hotel;
        }
    },
    extraReducers: (builder) => {
        // Get Hotels
        builder.addCase(getHotels.pending, (state) => {
            state.isLoading = true;
            state.hotels = [];
            state.error = null;
        })
        builder.addCase(getHotels.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.hotels = payload;
            state.error = null;
        })
        builder.addCase(getHotels.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.hotels = [];
            state.error = isErrorMessageResponse(payload)
                ? payload.message
                : isErrorsResponse(payload)
                    ? payload.errors
                    : "Error";
        })

        // Add Hotel
        builder.addCase(addHotel.pending, (state) => {
            state.hotelDialog.isLoading = true;
            state.error = null;
        })
        builder.addCase(addHotel.fulfilled, (state) => {
            state.hotelDialog.isLoading = false;
            state.error = null;
        })
        builder.addCase(addHotel.rejected, (state, { payload }) => {
            state.hotelDialog.isLoading = false;
            state.error = isErrorMessageResponse(payload)
                ? payload.message
                : isErrorsResponse(payload)
                    ? payload.errors
                    : "Error";
        })

        // Update Hotel
        builder.addCase(updateHotel.pending, (state) => {
            state.hotelDialog.isLoading = true;
            state.error = null;
        })
        builder.addCase(updateHotel.fulfilled, (state) => {
            state.hotelDialog.isLoading = false;
            state.error = null;
        })
        builder.addCase(updateHotel.rejected, (state, { payload }) => {
            state.hotelDialog.isLoading = false;
            state.error = isErrorMessageResponse(payload)
                ? payload.message
                : isErrorsResponse(payload)
                    ? payload.errors
                    : "Error";
        })

        // Delete Hotel
        builder.addCase(deleteHotel.pending, (state) => {
            state.hotelDialog.isLoading = true;
            state.error = null;
        })
        builder.addCase(deleteHotel.fulfilled, (state) => {
            state.hotelDialog.isLoading = false;
            state.error = null;
        })
        builder.addCase(deleteHotel.rejected, (state, { payload }) => {
            state.hotelDialog.isLoading = false;
            state.error = isErrorMessageResponse(payload)
                ? payload.message
                : isErrorsResponse(payload)
                    ? payload.errors
                    : "Error";
        })

        // Post Restaurant Rating
        builder.addCase(addRestaurantRating.pending, (state) => {
            state.ratingDialog.isLoading = true;
            state.error = null;
        })
        builder.addCase(addRestaurantRating.fulfilled, (state) => {
            state.ratingDialog.isLoading = false;
            state.error = null;
        })
        builder.addCase(addRestaurantRating.rejected, (state, { payload }) => {
            state.ratingDialog.isLoading = false;
            state.error = isErrorMessageResponse(payload)
                ? payload.message
                : isErrorsResponse(payload)
                    ? payload.errors
                    : "Error";
        })

        // Post Dinning Hall Rating
        builder.addCase(addDinningHallRating.pending, (state) => {
            state.ratingDialog.isLoading = true;
            state.error = null;
        })
        builder.addCase(addDinningHallRating.fulfilled, (state) => {
            state.ratingDialog.isLoading = false;
            state.error = null;
        })
        builder.addCase(addDinningHallRating.rejected, (state, { payload }) => {
            state.ratingDialog.isLoading = false;
            state.error = isErrorMessageResponse(payload)
                ? payload.message
                : isErrorsResponse(payload)
                    ? payload.errors
                    : "Error";
        })
    },
})

export const {
    resetHotelsData,
    refreshCurrentHotel,
    openAddHotelDialog,
    openEditHotelDialog,
    closeHotelDialog,
    setCurrentDialogHotelData,

    openRestaurantRating,
    openDinningHallRating,
    closeRatingDialog,
    setRestaurantDialogState,
    setDinningHallDialogState,

    setBodyToHotelRatings,
    setBodyToHotelSearch
} = hotelsSlice.actions

export default hotelsSlice.reducer