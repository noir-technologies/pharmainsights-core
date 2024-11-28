import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import ProductChart from '../components/ProductChart';
import InventoryChart from '../components/InventoryChart';
import PieChart from '../components/PieChart';
import { fetchProducts } from '../store/slices/productSlice';
import { fetchInventorySummary } from '../store/slices/inventorySlice';

const Home: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { products } = useSelector((state: RootState) => state.products);
    const { summary } = useSelector((state: RootState) => state.inventories);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
        dispatch(fetchInventorySummary());
    }, [products.length, dispatch]);

    const inventoryChartData = summary.map((item) => ({
        productName: item.productName,
        totalUnits: item.remainingUnits,
    }));

    const pieChartData = summary
        .map((item) => ({
            productName: item.productName,
            unitsSold: item.totalUnitsSold,
        }))
        .filter((item) => item.unitsSold > 0); // Show only products with sales

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center pt-[120px]">
            <h1 className="text-3xl font-bold mb-6">Welcome, { user?.name || 'Guest' }</h1>
            <div className='w-3/4 flex flex-row justify-evenly'>
                <div className='w-full flex flex-col'>
                    <div className="p-6 bg-blue-100 text-gray-500 rounded-lg shadow-md w-full max-w-4xl m-8">
                        <h2 className="text-2xl font-bold mb-4">Prices Overview</h2>
                        { products.length > 0 ? (
                            <ProductChart data={ products } />
                        ) : (
                            <p className="text-center text-gray-600">No data available to display the chart.</p>
                        ) }
                    </div>
                    <div className="p-6 bg-blue-100 text-gray-500 rounded-lg shadow-md w-full max-w-4xl m-8">
                        <h2 className="text-2xl font-bold mb-4">Inventory Overview</h2>
                        { summary.length > 0 ? (
                            <InventoryChart
                                data={ inventoryChartData }
                                title="Remaining Inventory by Product"
                            />
                        ) : (
                            <p className="text-center text-gray-600">No inventory summary data available.</p>
                        ) }
                    </div>
                </div>
                <div className="p-6 bg-blue-100 text-gray-500 rounded-lg shadow-md w-full max-w-4xl m-8">
                    <h2 className="text-2xl font-bold mb-4">Top Sold Products</h2>
                    { pieChartData.length > 0 ? (
                        <PieChart
                            data={ pieChartData }
                            title="Units Sold by Product"
                        />
                    ) : (
                        <p className="text-center text-gray-600">No sales data available to display the chart.</p>
                    ) }
                </div>
            </div>
        </div>
    );
};

export default Home;
