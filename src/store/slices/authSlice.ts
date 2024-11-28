import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../api/axios';
import { AxiosError } from 'axios';

interface User {
    name: string;
    email: string;
    pharmacyId?: number;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

type RejectValue = string;

export const login = createAsyncThunk<
    { user: User; token: string; },
    { email: string; password: string; },
    { rejectValue: RejectValue; }
>(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const response = await apiClient.post('/auth/login', credentials);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            return { user, token };
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.error || 'Login failed');
            }
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown login error occurred');
        }
    }
);

export const register = createAsyncThunk<
    void,
    { name: string; email: string; password: string; pharmacyId?: number; },
    { rejectValue: RejectValue; }
>(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            await apiClient.post('/auth/register', userData);
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                return thunkAPI.rejectWithValue(error.response.data.error || 'Registration failed');
            }
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue('Unknown registration error occurred');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout (state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        rehydrate (state, action: PayloadAction<{ user: User; token: string; } | null>) {
            if (action.payload) {
                state.user = action.payload.user;
                state.token = action.payload.token;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<{ user: User; token: string; }>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            }
        );
        builder.addCase(login.rejected, (state, action: PayloadAction<RejectValue | undefined>) => {
            state.loading = false;
            state.error = action.payload || 'An unexpected error occurred';
        });
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(register.rejected, (state, action: PayloadAction<RejectValue | undefined>) => {
            state.loading = false;
            state.error = action.payload || 'An unexpected error occurred';
        });
    },
});

export const { logout, rehydrate } = authSlice.actions;

export default authSlice.reducer;
