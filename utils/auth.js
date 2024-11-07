// utils/auth.js
import { jwtDecode } from "jwt-decode";
import toast from 'react-hot-toast';
import Router from 'next/router';

export const setToken = (token) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
    }
};

export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

export const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
    }
};

export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
        const token = getToken();
        if (!token) return false;

        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    }
    return false;
};

// New utility function to handle protected routes
export const handleProtectedRoute = (pathname) => {
    if (!isAuthenticated()) {
        // Get page name from pathname
        const pageName = pathname.split('/').pop() || 'page';
        const formattedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

        // Show toast message
        toast.error(`You have to log in to see ${formattedPageName}`, {
            duration: 1500,
        });

        // Redirect to login
        Router.push({
            pathname: '/login',
            query: { returnUrl: pathname }, // Store the return URL
        });
        return false;
    }
    return true;
};