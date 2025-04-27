'use client';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface Props {
  distanceMiles: number;
}

const EcoSavingsChart = ({ distanceMiles }: Props) => {
  const co2Saved = Math.round(distanceMiles * 404);

  const data = {
    labels: ['Bike 🚲', 'Walk 🚶‍♂️'],
    datasets: [
      {
        label: 'CO₂ Saved (g)',
        data: [co2Saved, co2Saved],
        backgroundColor: ['#66bb6a', '#81c784'],
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: { duration: 1500 },
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="chart-card">
      <h3>Your Eco Savings 🌎</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default EcoSavingsChart;
