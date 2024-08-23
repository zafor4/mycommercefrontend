import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './auth';
import { useState, useEffect } from 'react';

export const PrivateRoutes = () => {
    const [authenticated, setAuthenticated] = useState(null); // Initial state should be null

    useEffect(() => {
        // You might want to add some async operation here if isAuthenticated is async
        const checkAuth = () => {
            if (isAuthenticated()) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        };

        checkAuth(); // Perform authentication check
    }, []);


    if (authenticated === null) {
        // Optionally, render a loading spinner or something similar
        return <div>Loading...</div>;
    }

    return authenticated ? <Outlet /> : <Navigate to='/login' replace/>;
};
