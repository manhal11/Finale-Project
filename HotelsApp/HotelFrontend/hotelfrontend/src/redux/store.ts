import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import hotelsReducer from './reducers/hotelsSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        hotels: hotelsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch