// utils/auth.js
import { jwtDecode } from "jwt-decode"; // Updated import syntax

export const setToken = (token) => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem('token', token);
            return true;
        } catch (error) {
            console.error('Error setting token:', error);
            return false;
        }
    }
    return false;
};

export const getToken = () => {
    if (typeof window !== 'undefined') {
        try {
            return localStorage.getItem('token');
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    }
    return null;
};

export const removeToken = () => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.removeItem('token');
            return true;
        } catch (error) {
            console.error('Error removing token:', error);
            return false;
        }
    }
    return false;
};

export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
        const token = getToken();
        if (!token) return false;

        try {
            const decoded = jwtDecode(token); // Use imported jwtDecode
            return decoded.exp * 1000 > Date.now();
        } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
        }
    }
    return false;
};