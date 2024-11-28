import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInventories, deleteInventory } from '../store/slices/inventorySlice';
import { RootState, AppDispatch } from '../store/store';
import { showSuccessAlert, showErrorAlert } from '../utils/alertUtils';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

const InventoryList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { inventories, loading, error } = useSelector((state: RootState) => state.inventories);
    const { products } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchInventories());
    }, [dispatch]);

    const handleDelete = async (inventoryId: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to undo this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            dispatch(deleteInventory(inventoryId))
                .then(() => {
                    showSuccessAlert('The inventory has been deleted.');
                })
                .catch(() => {
                    showErrorAlert('Failed to delete the inventory.');
                });
        }
    };

    const formatDate = (dateString: string | undefined) =>
        dateString ? format(new Date(dateString), 'MMM dd, yyyy') : 'N/A';

    if (loading) return <div className="text-center text-lg">Loading inventories...</div>;
    if (error) return <div className="text-center text-lg text-red-500">Error: { error }</div>;

    return (
        <div className="p-6 bg-blue-100 text-gray-500 rounded-lg shadow-md w-full">
            <div className="overflow-auto max-h-[70vh] scroll-smooth">
                <table className="table w-full">
                    <thead className="sticky top-0 bg-blue-100 z-8 text-gray-950 text-base">
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Units Entered</th>
                            <th>Units Sold</th>
                            <th>Units Remaining</th>
                            <th>Period</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { inventories.map((inventory, index) => (
                            <tr key={ inventory.inventoryId || index }>
                                <th>{ inventory.inventoryId }</th>
                                <td>{ products.find((p) => p.productId === inventory.productId)?.name || 'Unknown' }</td>
                                <td>{ inventory.quantityEntered }</td>
                                <td>{ inventory.quantitySold }</td>
                                <td>{ inventory.quantityEntered - inventory.quantitySold }</td>
                                <td>
                                    { formatDate(inventory.entryDate) } - { formatDate(inventory.saleDate) }
                                </td>
                                <td>
                                    <button
                                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                                        onClick={ () => handleDelete(inventory.inventoryId) }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventoryList;
