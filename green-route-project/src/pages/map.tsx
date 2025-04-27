'use client'

import { 
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary
} from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';

const MapPage = () => {
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;
  const GOOGLE_MAPS_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!;

  const { userName, startLocation } = useAppContext();

  const position = startLocation || { 
    lat: 34.0717, 
    lng: -118.2828, // fallback Los Angeles 
  };

  const [open, setOpen] = useState(false);
  const [destinationInput, setDestinationInput] = useState('');
  const [destinationAddress, setDestinationAddress] = useState<string | null>(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  function handleDestinationSubmit() {
    if (!destinationInput) return;
    setDestinationAddress(destinationInput);
  }

  function Directions({ destination } : { destination: string}) {
    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex, setRouteIndex] = useState(0);

    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    useEffect(() => {
      if (!routesLibrary || !map) return;
      setDirectionsService(new routesLibrary.DirectionsService());
      setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    useEffect(() => {
      if (!directionsService || !directionsRenderer) return;
      if (!destination) return;

      directionsService.route({
        origin: position,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      }).then(response => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);

        const leg = response.routes[0].legs[0];
        setDistance(leg.distance?.text || '');
        setDuration(leg.duration?.text || '');
      });
    }, [destination, directionsService, directionsRenderer]);

    useEffect(() => {
      if (!directionsRenderer) return;
      directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    if (!leg) return null;
    return null;
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={['routes']}>
      <div className="map-container">
  
        {/* Map Area */}
        <Map 
          zoom={14}
          center={position}
          mapId={GOOGLE_MAPS_ID}
          fullscreenControl={true}
        > 
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin 
              background="grey" 
              borderColor="green" 
              glyphColor="purple" 
            />
          </AdvancedMarker>   
  
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>Hi {userName || 'Traveler'}!</p>
            </InfoWindow>
          )}
  
          {destinationAddress && <Directions destination={destinationAddress} />}
        </Map>
  
        {/* Where To Input + Eco Info */}
        <div className="where-to-container">
          <input
            className="destination-container"
            type="text"
            placeholder="Where to?"
            value={destinationInput}
            onChange={(e) => setDestinationInput(e.target.value)}
          />
          <button className="destination-button" onClick={handleDestinationSubmit}>
            Go
          </button>
  
          {destinationAddress && (
            <div className="eco-middle-card">
                <h2>Trip Summary 🌱</h2>
                <p><strong>Pickup:</strong> {startLocation ? `(${startLocation.lat.toFixed(3)}, ${startLocation.lng.toFixed(3)})` : "Detecting..."}</p>
                <p><strong>Dropoff:</strong> {destinationAddress}</p>
                <p><strong>Distance:</strong> {distance}</p>
                <p><strong>Duration:</strong> {duration}</p>

                {/* Eco Options Start */}
                <div className="eco-options">
                <h4>Eco-Friendly Alternatives 🌎</h4>

                <div className="eco-option-card">
                    🚲 <strong>Bike</strong>(~{duration ? Math.round(Number(duration.replace(' mins', '')) * 2) : '...'} mins)

                    <br />
                    Save ~90% CO₂ emissions!
                </div>

                <div className="eco-option-card">
                    🚶‍♂️ <strong>Walk</strong> (~{duration ? Math.round(Number(duration.replace(' mins', '')) * 4) : '...'} mins)
                    <br />
                    Save 100% CO₂ emissions!
                </div>

                <div className="eco-option-card">
                    🚌 <strong>Public Transit</strong> (Coming Soon)
                    <br />
                    (Real transit data planned in production!)
                </div>
                </div>
                {/* Eco Options End */}
            </div>
            )}
        </div>
  
      </div>
    </APIProvider>
  )
}

export default MapPage;
