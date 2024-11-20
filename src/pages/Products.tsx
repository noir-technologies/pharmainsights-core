import React from 'react';
import ProductList from '../components/ProductList';

const Products: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Products</h1>
            <ProductList />
        </div>
    );
};

export default Products;
