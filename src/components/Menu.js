import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut, isAuthenticated, userInfo } from '../utils/auth';
import { useState, useEffect } from 'react';

const isActive = (pathname, path) => {
    return pathname === path ? { color: '#ff9900' } : { color: 'gray' };
}

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [dashboardPath, setDashboardPath] = useState('');

    useEffect(() => {
        if (isAuthenticated()) {
            const { role } = userInfo();
            setDashboardPath(`/${role}/dashboard`); // Set the dashboard path based on user role
        }
    }, []);

    return (
        <nav className='navbar navbar-dark bg-dark'>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to='/'
                        style={isActive(location.pathname, '/')}>
                        Home
                    </Link>
                </li>
                {!isAuthenticated() && (
                    <>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to='/login'
                                style={isActive(location.pathname, '/login')}>
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to='/register'
                                style={isActive(location.pathname, '/register')}>
                                Register
                            </Link>
                        </li>
                    </>
                )}

                {isAuthenticated() && (
                    <>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to={dashboardPath}
                                style={isActive(location.pathname, dashboardPath)}>
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to='/cart'
                                style={isActive(location.pathname, '/cart')}>
                                Cart
                            </Link>
                        </li>
                        <li className="nav-item">
                            <span
                                className='nav-link'
                                style={{ cursor: 'pointer', color: 'gray' }}
                                onClick={() => {
                                    signOut(() => {
                                        navigate('/login', { replace: true });
                                    });
                                }}
                            >
                                Log Out
                            </span>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Menu;
