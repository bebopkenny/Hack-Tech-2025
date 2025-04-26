'use client'
import { 
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
    useMap,
    useMapsLibrary,
 } from '@vis.gl/react-google-maps'
import { useState, useEffect } from 'react'
import { useAppContext } from '@/context/AppContext';

const MapPage = () => {
    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;
    const GOOGLE_MAPS_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!;

    const { userName, startLocation } = useAppContext();

    const position = startLocation || { 
        lat: 34.0717,
        lng: -118.2828,
    }

    const [open, setOpen] = useState(false);

    function Directions() {
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

            directionsService.route({
                origin: "100 Front St, Toronto ON",
                destination: "500 College St, Toronto ON",
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true,
            }). then(response => {
                directionsRenderer.setDirections(response);
                setRoutes(response.routes);
            });
        }, [directionsService, directionsRenderer])

        useEffect(() => {
            if (!directionsRenderer) return;
            directionsRenderer.setRouteIndex(routeIndex);
        }, [routeIndex, directionsRenderer])

        if (!leg) return null;

        return (
            <div className="directions">
                <h2>{selected.summary}</h2>
                <p>{leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}</p>
                <p>Distance: {leg.distance?.text}</p>
                <p>Duration: {leg.duration?.text}</p>
                <h2>Other Routes Available</h2>
                <ul>
                    {routes.map((route, index) => (
                        <li key={route.summary}>
                            <button onClick={() => setRouteIndex(index)}>
                                {route.summary}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <div className="map-container">
                <Map 
                    zoom={14}
                    center={position}
                    mapId={GOOGLE_MAPS_ID}
                    fullscreenControl={true}
                > 
                    <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                        <Pin 
                            background={"grey"} 
                            borderColor={"green"} 
                            glyphColor={"purple"} 
                        />
                    </AdvancedMarker>   

                    {open && <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                        <p>Hi { userName || 'Traveler'}!</p>
                    </InfoWindow>}
                    <Directions />
                </Map>
            </div>
        </APIProvider>
    )
}

export default MapPage