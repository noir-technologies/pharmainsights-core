import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    data: { productName: string; unitsSold: number; }[];
    title: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
    const chartData = {
        labels: data.map((item) => item.productName),
        datasets: [
            {
                label: 'Units Sold',
                data: data.map((item) => item.unitsSold),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
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

    return <Pie data={ chartData } options={ options } />;
};

export default PieChart;
