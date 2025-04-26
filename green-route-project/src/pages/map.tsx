'use client'
import { 
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
 } from '@vis.gl/react-google-maps'
import { useState } from 'react'

const MapPage = () => {
    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!;
    const GOOGLE_MAPS_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!;

    const position = {
        lat: 53.54,
        lng: 10,
    }

    const [open, setOpen] = useState(false);




    return (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <div className="map-container">
                <Map 
                    zoom={9}
                    center={position}
                    mapId={GOOGLE_MAPS_ID}
                > 
                    <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                        <Pin 
                            background={"grey"} 
                            borderColor={"green"} 
                            glyphColor={"purple"} 
                        />
                    </AdvancedMarker>   

                    {open && <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
                        <p>I'm in Hamburg</p>
                    </InfoWindow>}
                </Map>
            </div>
        </APIProvider>
    )
}

export default MapPage