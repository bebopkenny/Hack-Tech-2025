'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import Head from 'next/head';

const LoginPage = () => {
  const { setUserName, setStartLocation } = useAppContext();
  const [nameInput, setNameInput] = useState('');
  const [locationFetched, setLocationFetched] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStartLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationFetched(true);
        },
        (err) => {
          console.error('Location fetch error:', err);
          setError('Could not fetch location. Please allow location access.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim() === '') {
      setError('Please enter your name.');
      return;
    }
    setUserName(nameInput.trim());
    router.push('/map');
  };

  return (
    <>
      <Head>
        <title>GreenRoute - Sign In</title>
        <meta name="description" content="Start your eco-friendly journey with GreenRoute!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="login-container" style={{ padding: '2rem' }}>
        <h1>Welcome to GreenRoute 🌱</h1>
        <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
          <div>
            <label>Your Name:</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your name"
              required
              style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            {locationFetched ? (
              <p>✅ Location detected!</p>
            ) : (
              <p>📍 Fetching location...</p>
            )}
          </div>

          {error && (
            <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              marginTop: '2rem',
              padding: '0.75rem 2rem',
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Start GreenRoute
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
