import { apiClient } from "./apiClient";
import { DinningHallRating, HotelData, HotelQueryParams, RestaurantRating } from "./dtos/Hotel";

// Dinning Hall Rating

export const apiPostDinningHallRating = async (ratingData: DinningHallRating) => {
    return await apiClient.post('/dinninghallratings/', ratingData);
};

export const apiDeleteDinningHallRating = async (ratingId: number) => {
    return await apiClient.delete(`/dinninghallratings/${ratingId}`);
};

// Restaurant Rating

export const apiPostRestaurantRating = async (ratingData: RestaurantRating) => {
    return await apiClient.post('/restaurantratings/', ratingData);
};

export const apiDeleteRestaurantRating = async (ratingId: number) => {
    return await apiClient.delete(`/restaurantratings/${ratingId}`);
};