'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const SavingsChart = () => {
  const data = {
    labels: ['0 mi', '1 mi', '2 mi', '5 mi', '10 mi'],
    datasets: [
      {
        label: 'CO₂ Saved (grams)',
        data: [0, 404, 808, 2020, 4040],
        fill: false,
        backgroundColor: 'green',
        borderColor: '#4caf50',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#2e7d32',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Saved: ${context.raw}g CO₂`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#2e7d32',
        },
      },
      x: {
        ticks: {
          color: '#2e7d32',
        },
      },
    },
  };

  return (
    <div style={{ marginTop: '3rem', background: '#ffffff', padding: '2rem', borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#2e7d32' }}>Eco Savings 🌱</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default SavingsChart;
