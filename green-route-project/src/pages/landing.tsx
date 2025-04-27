'use client';

import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
      <h1 className="landing-title">Welcome, {userName || 'Traveler'}! 🌿</h1>

      <form onSubmit={handleDestinationSubmit} className="destination-form">
        <label htmlFor="destination">Enter Your Destination:</label><br />
        <input
          id="destination"
          type="text"
          placeholder="Where to?"
          value={destinationInput}
          onChange={(e) => setDestinationInput(e.target.value)}
          className="destination-input"
          required
        />
        <br />
        <button 
          type="submit" 
          className="destination-button"
        >
          Start Planning 🌎
        </button>
      </form>

      <div className="green-spots">
        <h2>🌍 Popular Green Spots:</h2>
        <ul>
          <li onClick={() => setDestinationInput('Downtown Farmers Market')}>
            🌱 Downtown Farmers Market
          </li>
          <li onClick={() => setDestinationInput('Tesla Supercharger Station')}>
            🔌 Tesla Supercharger Station
          </li>
          <li onClick={() => setDestinationInput('EcoCycle Bike Repair')}>
            🚲 EcoCycle Bike Repair
          </li>
          <li onClick={() => setDestinationInput('Whispering Pines Nature Park')}>
            🌳 Whispering Pines Nature Park
          </li>
        </ul>
      </div>

      <div className="eco-tip">
        <h2>💡 Eco Tip:</h2>
        <p>Biking just 1 mile saves 404g of CO₂ compared to driving! 🚲</p>
      </div>

      <div className="coming-soon">
        <h2>🚀 Coming Soon:</h2>
        <p>Track your total Eco Impact with GreenRoute!</p>
      </div>
    </div>
  );
};

export default LandingPage;
