import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/axios';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, thunkAPI) => {
        try {
            const response = await apiClient.get('/products');
            return response.data; // Assuming API returns a list of products
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error instanceof Error ? error.message : 'Failed to fetch products'
            );
        }
    }
);

// Async thunk for adding a new product
export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (productData: { name: string; price: number; description: string; }, thunkAPI) => {
        try {
            const response = await apiClient.post('/products', productData);
            return response.data; // Assuming API returns the created product
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error instanceof Error ? error.message : 'Failed to add product'
            );
        }
    }
);

// Slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch products
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Add product
        builder.addCase(addProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload); // Add the new product to the state
        });
        builder.addCase(addProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default productSlice.reducer;
