import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Products from './pages/Products';

const App: React.FC = () => {
    return (
        <BrowserRouter future={ { v7_startTransition: true, v7_relativeSplatPath: true } }>
            <Navbar />
            <Routes>
                <Route path="/login" element={ <Login /> } />
                <Route path="/register" element={ <Register /> } />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route path="/products" element={ <ProtectedRoute><Products /></ProtectedRoute> } />
                <Route path="*" element={ <Navigate to="/login" replace /> } />
            </Routes>
        </BrowserRouter>
    );
};


export default App;
