type Date = string;

export interface Comment {
    userId: number,
    userName: string,
    comment: string,
    dateCommented: Date
};

export interface Hotel {
    id: number,
    name: string,
    country: string,
    city: string,
    rating?: number,
    restaurantRatings?: RestaurantRatings,
    dinningHallRatings?: DinningHallRatings
};

export interface RestaurantRatings {
    cleanliness: number | null,
    tastyFood: number | null,
    rawMaterialQuality: number | null,
    crowdnessRating: number | null,
    view: number | null,
    selectionStatus: number | null,
    freshness: number | null,
    numberOfTables: number | null,
    priceRating: number | null,
    barRating: number | null,
    mealCountSatisfaction: number | null,
    richMenu: number | null,
    waitingTimeRating: number | null,
    comments: Comment[]
};
export interface RestaurantRating {
    hotelId: number,
    cleanliness: number | null,
    tastyFood: number | null,
    rawMaterialQuality: number | null,
    crowdnessRating: number | null,
    view: number | null,
    selectionStatus: number | null,
    freshness: number | null,
    numberOfTables: number | null,
    priceRating: number | null,
    barRating: number | null,
    mealCountSatisfaction: number | null,
    richMenu: number | null,
    waitingTimeRating: number | null,
    comment: string | null
};
export const makeEmptyRestaurantRating = (hotelId: number): RestaurantRating => ({
    hotelId: hotelId,
    cleanliness: null,
    tastyFood: null,
    rawMaterialQuality: null,
    crowdnessRating: null,
    view: null,
    selectionStatus: null,
    freshness: null,
    numberOfTables: null,
    priceRating: null,
    barRating: null,
    mealCountSatisfaction: null,
    richMenu: null,
    waitingTimeRating: null,
    comment: null
});

export interface DinningHallRatings {
    cleanliness: number | null,
    tastyFood: number | null,
    rawMaterialQuality: number | null,
    crowdnessRating: number | null,
    view: number | null,
    selectionStatus: number | null,
    freshness: number | null,
    numberOfTables: number | null,
    comments: Comment[]
};
export interface DinningHallRating {
    hotelId: number,
    cleanliness: number | null,
    tastyFood: number | null,
    rawMaterialQuality: number | null,
    crowdnessRating: number | null,
    view: number | null,
    selectionStatus: number | null,
    freshness: number | null,
    numberOfTables: number | null,
    comment: string | null
};
export const makeEmptyDinningHallRating = (hotelId: number): DinningHallRating => ({
    hotelId: hotelId,
    cleanliness: null,
    tastyFood: null,
    rawMaterialQuality: null,
    crowdnessRating: null,
    view: null,
    selectionStatus: null,
    freshness: null,
    numberOfTables: null,
    comment: null
});
export const ratingsDisplayLabels = {
    cleanliness: "Cleanliness",
    tastyFood: "Tasty Food",
    rawMaterialQuality: "Raw Material Quality",
    crowdnessRating: "Crowdness Rating",
    view: "View",
    selectionStatus: "Selection Variety",
    freshness: "Freshness",
    numberOfTables: "Number of Tables",
    priceRating: "Price Rating",
    barRating: "Bar Rating",
    mealCountSatisfaction: "Meal Count Satisfaction",
    richMenu: "Rich Menu",
    waitingTimeRating: "Waiting Time Rating",
    rating: "Total Rating"
};

// ---------- HotelData ----------
// Used in POST/PUT requests
export interface HotelData {
    id?: number; // ONLY IN PUT
    name: string;
    country: string;
    city: string;
    hasRestaurant: boolean;
    hasDinningHall: boolean
};

export const makeEmptyHotelData = (): HotelData => ({
    name: '',
    country: '',
    city: '',
    hasRestaurant: false,
    hasDinningHall: false
});

export const makeHotelData = (hotel: Hotel): HotelData => {
    return {
        id: hotel.id,
        name: hotel.name,
        country: hotel.country,
        city: hotel.city,
        hasRestaurant: hotel.restaurantRatings ? true : false,
        hasDinningHall: hotel.dinningHallRatings ? true : false
    };
};
// -------------------------------

export type HotelSortOption = 'no_sorting' | 'name' | 'name_desc' | 'restaurant_rating' | 'restaurant_rating_desc' | 'dinning_hall_rating' | 'dinning_hall_rating_desc';

export interface HotelQueryParams {
    name?: string,
    country?: string,
    city?: string,
    hasRestaurant?: boolean,
    hasDinningHall?: boolean,
    minRating?: number,
    maxRating?: number,
    sortBy?: HotelSortOption
};