import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useEffect, useState, useMemo } from 'react';
import type { Property } from '../types';
import 'leaflet/dist/leaflet.css';

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

type Props = {
  properties: Property[];
  selectedProperty?: Property;
  height?: string;
  showLocationButton?: boolean;
};

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 0.6 });
  }, [map, center, zoom]);
  
  return null;
}

export function MapView({ properties, selectedProperty, height = '400px', showLocationButton = false }: Props) {
  const validProperties = properties.filter(p => p.coordinates);
  
  const { initialCenter, zoom } = useMemo(() => {
    if (validProperties.length === 0) {
      return { initialCenter: [0, 0] as [number, number], zoom: 10 };
    }
    const centerProperty = selectedProperty || validProperties[0];
    const center: [number, number] = [centerProperty.coordinates!.lat, centerProperty.coordinates!.lng];
    const mapZoom = selectedProperty ? 15 : 10;
    return { initialCenter: center, zoom: mapZoom };
  }, [validProperties, selectedProperty]);

  const [center, setCenter] = useState<[number, number]>(initialCenter);
  
  if (validProperties.length === 0) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
        <p>No location data available</p>
      </div>
    );
  }

  const centerProperty = selectedProperty || validProperties[0];

  const handleGoToLocation = () => {
    if (centerProperty.coordinates) {
      const { lat, lng } = centerProperty.coordinates;
      setCenter([lat, lng]);
    }
  };

  return (
    <div className="map-container">
      {showLocationButton && selectedProperty && (
        <div className="map-controls">
          <button 
            className="location-button"
            onClick={handleGoToLocation}
            aria-label={`Open ${selectedProperty.title} location in Google Maps`}
          >
            <span className="location-icon">📍</span>
            Go to Location
          </button>
        </div>
      )}
      <div style={{ height, width: '100%' }}>
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <MapController center={center} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {validProperties.map((property) => (
            <Marker
              key={property.id}
              position={[property.coordinates!.lat, property.coordinates!.lng]}
              icon={defaultIcon}
            >
              <Popup>
                <div className="map-popup">
                  <h4>{property.title}</h4>
                  <p className="popup-price">${property.price.toLocaleString()}</p>
                  <p className="popup-details">{property.bedrooms} beds • {property.location}</p>
                  {showLocationButton && (
                    <button 
                      className="popup-location-btn"
                      onClick={() => setCenter([property.coordinates!.lat, property.coordinates!.lng])}
                    >
                      Center map here
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
