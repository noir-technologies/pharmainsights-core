import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto">
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/products" element={ <Products /> } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
