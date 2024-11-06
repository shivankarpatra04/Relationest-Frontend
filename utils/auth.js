// utils/auth.js
export const setToken = (token) => {
    localStorage.setItem('authToken', token);
};

export const getToken = () => {
    return localStorage.getItem('authToken');
};

export const removeToken = () => {
    localStorage.setItem('authToken');
};

export const isAuthenticated = () => {
    const token = getToken();
    return !!token;
};
export const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = payload.exp * 1000; // Convert to milliseconds
        return Date.now() >= expiryTime;
    } catch (error) {
        console.error('Token parsing error:', error);
        return true;
    }
};