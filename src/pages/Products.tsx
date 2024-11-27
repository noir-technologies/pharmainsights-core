import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import ImportModal from '../components/ImportModal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { fetchProducts } from '../store/slices/productSlice';

const Products: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center pt-[120px]">
            <h1 className="text-3xl font-bold my-6">Products</h1>
            <div className="w-full max-w-6xl">
                <ProductList />
            </div>

            {/* Floating Button */ }
            <button
                onClick={ openModal }
                className="fixed bottom-8 right-8 btn btn-primary text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
                Import Products
            </button>

            {/* Modal */ }
            { isModalOpen &&
                <ImportModal
                    isOpen={ isModalOpen }
                    onClose={ closeModal }
                    context="products"
                    onSuccess={ () => dispatch(fetchProducts()) }
                />
            }
        </div>
    );
};

export default Products;
