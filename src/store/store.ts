import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import pharmacyReducer from './slices/pharmacySlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        auth: authReducer,
        pharmacy: pharmacyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
