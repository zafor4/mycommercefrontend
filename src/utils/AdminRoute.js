import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, userInfo } from './auth';
import { useState, useEffect } from 'react';

export const AdminRoutes = () => {
    const [authenticated, setAuthenticated] = useState(null); // Initial state should be null
    const [isAdmin, setIsAdmin] = useState(null); // Initial state should be null

    useEffect(() => {
        const checkAuth = async () => {
            // Assume isAuthenticated is a synchronous function
            const auth = isAuthenticated();
            setAuthenticated(auth);

            if (auth) {
                // Check if the user is an admin
                const { role } = userInfo();
                setIsAdmin(role === 'admin');
            } else {
                setIsAdmin(false); // If not authenticated, user cannot be an admin
            }
        };

        checkAuth(); // Perform authentication and role check
    }, []);

    if (authenticated === null || isAdmin === null) {
        // Render a loading spinner or something similar while checking
        return <div>Loading...</div>;
    }

    // Render based on authentication and admin status
    if (authenticated && isAdmin) {
        return <Outlet />; // Render the protected content if authenticated and admin
    }

    return <Navigate to='/' replace />; // Redirect if not authenticated or not an admin
};
