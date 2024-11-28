import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import pharmacyReducer from './slices/pharmacySlice';
import inventoryReducer from './slices/inventorySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        pharmacy: pharmacyReducer,
        inventories: inventoryReducer,
        products: productReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
