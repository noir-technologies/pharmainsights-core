import React from 'react';
import ProductList from '../components/ProductList';
import ProductChart from '../components/ProductChart';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Products: React.FC = () => {
    const { products } = useSelector((state: RootState) => state.products);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center pt-[120px]">
            <h1 className="text-3xl font-bold my-6">Products</h1>
            <div className="w-full max-w-6xl">
                <ProductList />
            </div>
            <h2 className="text-2xl font-bold my-8">Product Prices Chart</h2>
            <div className="w-full max-w-4xl">
                { products.length > 0 ? (
                    <ProductChart data={ products } />
                ) : (
                    <p className="text-center text-gray-600">No data available to display the chart.</p>
                ) }
            </div>
        </div>
    );
};

export default Products;
