import React from 'react';
import ProductList from '../components/ProductList';
import ProductChart from '../components/ProductChart';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Products: React.FC = () => {
    const { products } = useSelector((state: RootState) => state.products);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex justify-center items-center flex-col">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <ProductList />
            <h2 className="text-xl font-bold mt-8">Product Prices Chart</h2>
            { products.length > 0 ? (
                <ProductChart data={ products } />
            ) : (
                <p>No data available to display the chart.</p>
            ) }
        </div>
    );
};

export default Products;
