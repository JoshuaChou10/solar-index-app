'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';

export default function Heatmap({ activeHeatmap, sampleData }) {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Initialize the Leaflet map
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapContainer.current).setView([44.0, -79.0], 6); // Centered in Ontario

      // Add a base tile layer (e.g., OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance.current);
    }
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !sampleData[activeHeatmap]?.length) return;

    // Remove existing heatmap layers
    mapInstance.current.eachLayer((layer) => {
      if (layer instanceof L.HeatLayer) {
        mapInstance.current.removeLayer(layer);
      }
    });

    // Prepare heatmap data
    const heatData = sampleData[activeHeatmap].map(({ lat, lon, value }) => [lat, lon, value]);

    // Add the heatmap layer
    L.heatLayer(heatData, {
      radius: 25, // Radius of influence for each point
      maxZoom: 12, // Maximum zoom level for aggregation
      blur: 15, // Blur intensity
      max: 100, // Maximum intensity value
    }).addTo(mapInstance.current);
  }, [activeHeatmap, sampleData]);

  return (
    <div
      ref={mapContainer}
      className="relative"
      style={{
        width: '100%', // Full width
        height: '800px', // Adjusted height for a longer map
        width: '60rem', // Optional: Limit maximum width
        margin: '0 auto', // Center the map horizontally
      }}
    >
      {/* Leaflet map will render here */}
    </div>
  );
}
