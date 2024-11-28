import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/axios';
import { AxiosError } from 'axios';

interface Inventory {
    inventoryId: number;
    pharmacyId: number;
    productId: number;
    quantityEntered: number;
    quantitySold: number;
    entryDate: string;
    saleDate: string;
}

interface InventoryState {
    inventories: Inventory[];
    loading: boolean;
    error: string | null;
}

const initialState: InventoryState = {
    inventories: [],
    loading: false,
    error: null,
};

export const fetchInventories = createAsyncThunk('inventories/fetchInventories', async (_, thunkAPI) => {
    try {
        const response = await apiClient.get('/inventory');
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return thunkAPI.rejectWithValue(error.response.data.error || 'Failed to fetch inventories');
        }
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('An unknown error occurred while fetching inventories.');
    }
});

export const deleteInventory = createAsyncThunk('inventories/deleteInventory', async (inventoryId: number, thunkAPI) => {
    try {
        await apiClient.delete(`/inventory/${ inventoryId }`, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`,
            },
        });
        return inventoryId;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return thunkAPI.rejectWithValue(error.response.data.error || 'Failed to delete the inventory');
        }
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('An unknown error occurred while deleting the inventory.');
    }
});

const inventorySlice = createSlice({
    name: 'inventories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchInventories.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchInventories.fulfilled, (state, action) => {
            state.loading = false;
            state.inventories = action.payload;
        });
        builder.addCase(fetchInventories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(deleteInventory.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteInventory.fulfilled, (state, action) => {
            state.loading = false;
            state.inventories = state.inventories.filter(inventory => inventory.inventoryId !== action.payload);
        });
        builder.addCase(deleteInventory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default inventorySlice.reducer;
