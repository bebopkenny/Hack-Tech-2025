import { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { useAppContext } from '@/context/AppContext';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;
const GOOGLE_MAPS_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!;

const MapPage = () => {
  const { userName, startLocation } = useAppContext();
  const [destinationInput, setDestinationInput] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const placesDivRef = useRef<HTMLDivElement>(null);

    const map = useMap();
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  const position = startLocation || { lat: 33.921, lng: -118.053 };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google?.maps?.DirectionsRenderer && map) {
      const renderer = new window.google.maps.DirectionsRenderer({ suppressMarkers: true });
      renderer.setMap(map); 
      directionsRendererRef.current = renderer;
    }
  }, [map]);
  
  

  const handleDestinationSubmit = async () => {
    if (!destinationInput.trim() || !map) return;
  
    setIsLoading(true);
  
    const service = new window.google.maps.places.PlacesService(placesDivRef.current!);
  
    const request = {
      query: destinationInput,
      fields: ['name', 'geometry'],
    };
  
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
        const place = results[0];
        if (place.geometry?.location) {
          const destLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
  
          const directionsService = new google.maps.DirectionsService();
          directionsService.route(
            {
              origin: position,
              destination: destLocation,
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === 'OK' && result) {
                directionsRendererRef.current?.setDirections(result);
                setDestinationAddress(place.name || 'Unknown Destination');
                setDistance(result.routes[0].legs[0].distance?.text || '');
                setDuration(result.routes[0].legs[0].duration?.text || '');
              } else {
                alert('Could not find route.');
              }
              setIsLoading(false); 
            }
          );
        } else {
          alert('Could not find place.');
          setIsLoading(false); 
        }
      } else {
        alert('No results found.');
        setIsLoading(false); 
      }
    });
  };
  

  return (
      <div className="map-container">
        <div ref={placesDivRef} style={{display: 'none'}} />
        <Map
          zoom={14}
          center={position}
          mapId={GOOGLE_MAPS_ID}
          fullscreenControl={true}
        >
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin background="grey" borderColor="green" glyphColor="purple" />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>Hi {userName || 'Traveler'}!</p>
            </InfoWindow>
          )}
        </Map>

        <div className="where-to-container">
          <input
            className="destination-container"
            type="text"
            placeholder="Where to?"
            value={destinationInput}
            onChange={(e) => setDestinationInput(e.target.value)}
          />
          <button className="destination-button" onClick={handleDestinationSubmit} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Go'}
          </button>

          {destinationAddress && (
            <div className="eco-middle-card">
              <h2>Trip Summary 🌱</h2>
              <p><strong>Pickup:</strong> {startLocation ? `(${startLocation.lat.toFixed(3)}, ${startLocation.lng.toFixed(3)})` : 'Detecting...'}</p>
              <p><strong>Dropoff:</strong> {destinationAddress}</p>
              <p><strong>Distance:</strong> {distance}</p>
              <p><strong>Duration:</strong> {duration}</p>

              <div className="eco-options">
                <h4>Eco-Friendly Alternatives 🌎</h4>

                <div className="eco-option-card">
                  🚲 <strong>Bike</strong> (~{duration ? Math.round(Number(duration.replace(' mins', '')) * 2) : '?'} mins)
                  <br />
                  Save ~90% CO₂ emissions!
                </div>

                <div className="eco-option-card">
                  🚶‍♂️ <strong>Walk</strong> (~{duration ? Math.round(Number(duration.replace(' mins', '')) * 4) : '?'} mins)
                  <br />
                  Save 100% CO₂ emissions!
                </div>

                <div className="eco-option-card">
                  🚌 <strong>Public Transit</strong> (Coming Soon)
                  <br />
                  (Real transit data planned in production!)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}

export default MapPage;
