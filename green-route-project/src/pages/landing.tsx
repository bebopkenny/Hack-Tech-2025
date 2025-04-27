// landing.tsx
'use client';

import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DynamicSavingsChart from '@/components/DynamicSavingsChart';
import SavingsChart from '@/components/SavingsChart';

const LandingPage = () => {
  const { userName } = useAppContext();
  const router = useRouter();
  const [destinationInput, setDestinationInput] = useState('');

  const handleDestinationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destinationInput.trim()) {
      router.push('/map');
    }
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to GreenRoute</h1>

      <form onSubmit={handleDestinationSubmit} className="destination-form">
        <label htmlFor="destination" className="destination-label">Enter Your Destination:</label>
        <input
          id="destination"
          type="text"
          placeholder="Where to?"
          value={destinationInput}
          onChange={(e) => setDestinationInput(e.target.value)}
          required
          className="destination-input"
        />
        <button type="submit" className="destination-button">
          Start Planning 🌎
        </button>
      </form>

      <div className="green-spots">
        <h2>🌍 Popular Green Spots:</h2>
        <ul>
          <li>🌿 Downtown Farmers Market</li>
          <li>🔌 Charing Station</li>
          <li>🚲 EcoCycle Bike Repair</li>
          <li>🌳 Whispering Pines Nature Park</li>
        </ul>
      </div>

      <div className="eco-tip">
        <h2>💡 Eco Tip:</h2>
        <p>Biking just 1 mile saves 404g of CO₂ compared to driving! 🚴‍♂️</p>
      </div>

      <div className="chart-section">
        <DynamicSavingsChart distanceMiles={5} carDurationMinutes={10} />
      </div>
      <SavingsChart />
    </div>
  );
};

export default LandingPage;
