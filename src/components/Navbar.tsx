import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { logout } from '../store/slices/authSlice';

const Navbar: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="navbar fixed top-0 left-0 w-full bg-base-100 shadow-md p-4">
            <div className="flex-1">
                <Link to="/" className="text-xl font-bold text-primary">
                    PharmaInsights
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0 space-x-4">
                    { user ? (
                        <>
                            <li>
                                <Link
                                    to="/"
                                    className="btn btn-ghost normal-case text-sm hover:text-primary"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    className="btn btn-ghost normal-case text-sm hover:text-primary"
                                >
                                    Products
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="btn btn-error text-white text-sm"
                                    onClick={ handleLogout }
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/login"
                                    className="btn btn-primary normal-case text-sm text-white"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="btn btn-outline btn-primary normal-case text-sm"
                                >
                                    Register
                                </Link>
                            </li>
                        </>
                    ) }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
