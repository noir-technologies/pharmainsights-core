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
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-6">Product List</h1>
            <div className="overflow-x-auto w-full max-w-4xl">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        { products.map((product, index) => (
                            <tr key={ product.id }>
                                <th>{ index + 1 }</th>
                                <td>{ product.name }</td>
                                <td>${ product.price.toFixed(2) }</td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
