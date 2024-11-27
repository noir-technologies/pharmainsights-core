import React from 'react';
import ProductList from '../components/ProductList';

const Products: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center pt-[120px]">
            <h1 className="text-3xl font-bold my-6">Products</h1>
            <div className="w-full max-w-6xl">
                <ProductList />
            </div>
        </div>
    );
};

export default Products;
