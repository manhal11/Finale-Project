import { apiClient } from "./apiClient";
import { HotelData, HotelQueryParams } from "./dtos/Hotel";

export const apiGetHotels = async (queryParams: HotelQueryParams) => {
    return await apiClient.get('/hotels/', { params: queryParams });
};

export const apiPostHotel = async (hotelData: HotelData) => {
    return await apiClient.post('/hotels/', hotelData);
};

export const apiPutHotel = async (hotelData: HotelData) => {
    return await apiClient.put(`/hotels/${hotelData.id}`, hotelData);
};

export const apiDeleteHotel = async (hotelId: number) => {
    return await apiClient.delete(`/hotels/${hotelId}`);
};