'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  distanceMiles: number;
}

const EcoAlternativesChart = ({ distanceMiles }: Props) => {
  const bikeEmission = 5; 
  const walkEmission = 0; 
  const hybridEmission = Math.round(distanceMiles * 200); 
  const electricEmission = Math.round(distanceMiles * 50);

  const data = {
    labels: ['Bike 🚲', 'Walk 🚶‍♂️', 'Hybrid Car ♻️', 'Electric Car ⚡️'],
    datasets: [
      {
        label: 'CO₂ Emitted (grams)',
        data: [bikeEmission, walkEmission, hybridEmission, electricEmission],
        backgroundColor: ['#66bb6a', '#43a047', '#26a69a', '#29b6f6'],
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
      <h3 className="chart-title">Eco Alternatives 🌱</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default EcoAlternativesChart;
