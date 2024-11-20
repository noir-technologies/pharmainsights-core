import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ProductChartProps {
    data: { name: string; price: number; }[];
}

const ProductChart: React.FC<ProductChartProps> = ({ data }) => {
    // Prepare data for the chart
    const chartData = {
        labels: data.map((product) => product.name), // Product names as labels
        datasets: [
            {
                label: 'Price (USD)',
                data: data.map((product) => product.price), // Product prices as data points
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Product Prices',
            },
        },
    };

    return (
        <div className="p-4">
            <Bar data={ chartData } options={ options } />
        </div>
    );
};

export default ProductChart;
