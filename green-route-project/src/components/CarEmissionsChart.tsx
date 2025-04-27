'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  distanceMiles: number;
}

const CarEmissionsChart = ({ distanceMiles }: Props) => {
  const sedanEmission = Math.round(distanceMiles * 404); // grams CO₂
  const pickupEmission = Math.round(distanceMiles * 485);
  const suvEmission = Math.round(distanceMiles * 470);

  const data = {
    labels: ['Sedan 🚗', 'Pickup Truck 🚚', 'SUV 🚙'],
    datasets: [
      {
        label: 'CO₂ Emitted (grams)',
        data: [sedanEmission, pickupEmission, suvEmission],
        backgroundColor: ['#ff8a65', '#ff7043', '#d84315'],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 1200,
      easing: 'easeOutCubic' as const,
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw}g CO₂`,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: { beginAtZero: true },
      x: {},
    },
  };

  return (
    <div className="chart-card">
      <h3 className="chart-title">Vehicle Emissions 🚗</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CarEmissionsChart;
