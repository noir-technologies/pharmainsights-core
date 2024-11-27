import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import { RootState, AppDispatch } from '../store/store';

const ProductList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <div className="text-center text-lg">Loading products...</div>;
    if (error) return <div className="text-center text-lg text-red-500">Error: { error }</div>;

    return (
        <div className="overflow-x-auto p-6 bg-blue-100 text-gray-500 rounded-lg shadow-md w-full">
            <table className="table w-full">
                <thead className='text-gray-950 text-base'>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    { products.map((product, index) => (
                        <tr key={ product.id || index }>
                            <th>{ index + 1 }</th>
                            <td>{ product.name }</td>
                            <td>${ product.price.toFixed(2) }</td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
