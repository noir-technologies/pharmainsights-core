import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import { AppDispatch } from './store/store';
import { rehydrate } from './store/slices/authSlice';
import { getUserFromToken } from './utils/authUtils';
import { fetchProducts } from './store/slices/productSlice';

const App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [rehydrated, setRehydrated] = useState(false);

    useEffect(() => {
        const rehydrateUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const user = await getUserFromToken(token);
                if (user) {
                    dispatch(rehydrate({ user, token }));
                } else {
                    console.error('Token is invalid or expired');
                    localStorage.removeItem('token');
                }
            }
            setRehydrated(true);
        };

        rehydrateUser();

        dispatch(fetchProducts());
    }, [dispatch]);

    if (!rehydrated) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter future={ { v7_startTransition: true, v7_relativeSplatPath: true } }>
            <Navbar />
            <Routes>
                <Route path="/login" element={ <Login /> } />
                <Route path="/register" element={ <Register /> } />
                <Route path="/" element={ <ProtectedRoute><Home /></ProtectedRoute> } />
                <Route path="/products" element={ <ProtectedRoute><Products /></ProtectedRoute> } />
                <Route path="*" element={ <Navigate to="/login" replace /> } />
            </Routes>
        </BrowserRouter>
    );
};


export default App;
