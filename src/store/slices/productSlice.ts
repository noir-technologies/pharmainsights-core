import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/axios';
import { AxiosError } from 'axios';

interface Product {
    productId: number;
    name: string;
    description: string;
    price: number;
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

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkAPI) => {
    try {
        const response = await apiClient.get('/product');
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return thunkAPI.rejectWithValue(error.response.data.error || 'Failed to fetch products');
        }
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('An unknown error occurred while fetching products.');
    }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId: number, thunkAPI) => {
    try {
        await apiClient.delete(`/product/${ productId }`, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`,
            },
        });
        return productId;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return thunkAPI.rejectWithValue(error.response.data.error || 'Failed to delete the product');
        }
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('An unknown error occurred while deleting the product.');
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = state.products.filter(product => product.productId !== action.payload);
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default productSlice.reducer;
