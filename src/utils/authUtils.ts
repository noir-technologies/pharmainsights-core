import apiClient from '../api/axios';
import { User } from '../types/authTypes';

export const getUserFromToken = async (token: string): Promise<User | null> => {
    try {
        const response = await apiClient.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${ token }`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user from token:', error);
        return null;
    }
};
