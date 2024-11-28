import React, { useState } from 'react';
import InventoryList from '../components/InventoryList';
import ImportModal from '../components/ImportModal';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { fetchInventories } from '../store/slices/inventorySlice';

const Inventories: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center pt-[120px]">
            <h1 className="text-3xl font-bold my-6">Inventories</h1>
            <div className="w-full max-w-6xl">
                <InventoryList />
            </div>

            {/* Floating Button */ }
            <button
                onClick={ openModal }
                className="fixed bottom-8 right-8 btn btn-primary text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
                Import Inventories
            </button>

            {/* Modal */ }
            { isModalOpen &&
                <ImportModal
                    isOpen={ isModalOpen }
                    onClose={ closeModal }
                    context="inventories"
                    onSuccess={ () => dispatch(fetchInventories()) }
                />
            }
        </div>
    );
};

export default Inventories;
