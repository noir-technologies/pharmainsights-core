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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ProductChartProps {
    data: { name: string; price: number; }[];
}

const ProductChart: React.FC<ProductChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map((product) => product.name),
        datasets: [
            {
                label: 'Price (USD)',
                data: data.map((product) => product.price),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
        },
    };

    return <Bar data={ chartData } options={ options } />;
};

export default ProductChart;
