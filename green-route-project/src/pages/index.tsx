'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import Head from 'next/head';
import SustainableGlobe from '@/components/SustainableGlobe';

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
    router.push('/landing'); 
  };

  return (
    <>
      <Head>
        <title>GreenRoute - Sign In</title>
        <meta name="description" content="Start your eco-friendly journey with GreenRoute!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '2rem',
        background: '#e0f2f1',
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#064e3b' }}>
          Welcome to GreenRoute 🌱
        </h1>

        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Your Name:
              </label>
              <input
                id="name"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name"
                required
                style={{
                  marginTop: '0.5rem',
                  padding: '0.75rem 1rem',
                  width: '100%',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              {locationFetched ? (
                <p style={{ color: 'green' }}>✅ Location detected!</p>
              ) : (
                <p style={{ color: 'orange' }}>📍 Fetching location...</p>
              )}
            </div>

            {error && (
              <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>
            )}

            <button
              type="submit"
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#10b981',
                color: 'white',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                width: '100%',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#10b981')}
            >
              Start GreenRoute
            </button>
          </form>
        </div>

        <div style={{
          marginTop: '3rem',
          width: '100%',
          maxWidth: '500px',
          textAlign: 'center',
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#047857' }}>
            Help Prevent Global Warming 🌎
          </h3>
          <div style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            <SustainableGlobe />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
