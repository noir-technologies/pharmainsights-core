import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../api/axios';

interface Pharmacy {
    pharmacyId: number;
    name: string;
    location?: string;
}

interface PharmacyState {
    pharmacy: Pharmacy | null;
    loading: boolean;
    error: string | null;
}

const initialState: PharmacyState = {
    pharmacy: null,
    loading: false,
    error: null,
};

export const fetchPharmacy = createAsyncThunk<
    Pharmacy,
    number,
    { rejectValue: string; }
>(
    'pharmacy/fetchPharmacy',
    async (pharmacyId, thunkAPI) => {
        try {
            const response = await apiClient.get(`/pharmacy/${ pharmacyId }`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch pharmacy data:', error);
            return thunkAPI.rejectWithValue('Failed to fetch pharmacy data.');
        }
    }
);

const pharmacySlice = createSlice({
    name: 'pharmacy',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPharmacy.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPharmacy.fulfilled, (state, action: PayloadAction<Pharmacy>) => {
            state.loading = false;
            state.pharmacy = action.payload;
        });
        builder.addCase(fetchPharmacy.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.loading = false;
            state.error = action.payload || 'Failed to fetch pharmacy.';
        });
    },
});

export default pharmacySlice.reducer;
