import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import ProductChart from '../components/ProductChart';
import { fetchProducts } from '../store/slices/productSlice';

const Home: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { products } = useSelector((state: RootState) => state.products);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [user, products.length, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center pt-[120px]">
            <h1 className="text-3xl font-bold mb-6">Welcome, { user?.name || 'Guest' }</h1>
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">Prices Overview</h2>
                { products.length > 0 ? (
                    <ProductChart data={ products } />
                ) : (
                    <p className="text-center text-gray-600">No data available to display the chart.</p>
                ) }
            </div>
        </div>
    );
};

export default Home;
