'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  distanceMiles: number;
  carDurationMinutes: number;
}

const DynamicSavingsChart = ({ distanceMiles, carDurationMinutes }: Props) => {
  const bikeTime = carDurationMinutes * 2;
  const walkTime = carDurationMinutes * 4;
  const co2SavedBike = Math.round(distanceMiles * 404);  // 404g CO₂ per mile
  const co2SavedWalk = Math.round(distanceMiles * 404);

  const data = {
    labels: ['Drive 🚗', 'Bike 🚲', 'Walk 🚶‍♂️'],
    datasets: [
      {
        label: 'CO₂ Saved (g)',
        data: [0, co2SavedBike, co2SavedWalk],
        backgroundColor: ['#ccc', '#4caf50', '#81c784'],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 1500,
      easing: 'easeOutBounce' as const,
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.raw}g saved`,
        },
      },
      legend: {
        display: false,
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
    <div style={{ marginTop: '2rem', background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#2e7d32' }}>Your Eco Impact 🌎</h2>
      <Bar data={data} options={options} />
      <div style={{ marginTop: '2rem', textAlign: 'center', color: '#4caf50', fontSize: '1.1rem', opacity: 0.8 }}>
        🌎 Every small change saves the planet!
        </div>
    </div>
  );
};

export default DynamicSavingsChart;
