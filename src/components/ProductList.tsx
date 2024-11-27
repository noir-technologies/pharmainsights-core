import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../store/slices/productSlice';
import { RootState, AppDispatch } from '../store/store';
import { showSuccessAlert, showErrorAlert } from '../utils/alertUtils';
import Swal from 'sweetalert2';

const ProductList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = async (productId: number) => {
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
            dispatch(deleteProduct(productId))
                .then(() => {
                    showSuccessAlert('The product has been deleted.');
                })
                .catch(() => {
                    showErrorAlert('Failed to delete the product.');
                });
        }
    };

    if (loading) return <div className="text-center text-lg">Loading products...</div>;
    if (error) return <div className="text-center text-lg text-red-500">Error: { error }</div>;

    return (
        <div className="p-6 bg-blue-100 text-gray-500 rounded-lg shadow-md w-full">
            <div className="overflow-auto max-h-[70vh] scroll-smooth">
                <table className="table w-full">
                    <thead className="sticky top-0 bg-blue-100 z-8 text-gray-950 text-base">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { products.map((product, index) => (
                            <tr key={ product.productId || index }>
                                <th>{ product.productId }</th>
                                <td>{ product.name }</td>
                                <td>{ product.description }</td>
                                <td>${ product.price.toFixed(2) }</td>
                                <td>
                                    <button
                                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                                        onClick={ () => handleDelete(product.productId) }
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

export default ProductList;
