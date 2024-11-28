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

interface InventoryChartProps {
    data: { productName: string; totalUnits: number; }[];
    title: string;
}

const InventoryChart: React.FC<InventoryChartProps> = ({ data, title }) => {
    const chartData = {
        labels: data.map((item) => item.productName),
        datasets: [
            {
                label: 'Total Units',
                data: data.map((item) => item.totalUnits),
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: title },
        },
    };

    return <Bar data={ chartData } options={ options } />;
};

export default InventoryChart;
