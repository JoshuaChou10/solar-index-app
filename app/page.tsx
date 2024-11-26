'use client';
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const heatmapContainer = useRef(null);
  const [heatmapInstance, setHeatmapInstance] = useState(null);
  const [activeHeatmap, setActiveHeatmap] = useState('water'); // Default heatmap type
  const [heatmapData, setHeatmapData] = useState({
    water: [],
    temperature: [],
    solar: [],
  });

  // Fetch heatmap data for each parameter
  const fetchHeatmapData = async () => {
    const sampleData = {
      water: [
        { lat: 43.65107, lon: -79.347015, value: 75 },
        { lat: 44.00000, lon: -78.75000, value: 50 },
        { lat: 42.98339, lon: -81.23304, value: 85 },
      ],
      temperature: [
        { lat: 43.65107, lon: -79.347015, value: 25 },
        { lat: 44.00000, lon: -78.75000, value: 30 },
        { lat: 42.98339, lon: -81.23304, value: 35 },
      ],
      solar: [
        { lat: 43.65107, lon: -79.347015, value: 90 },
        { lat: 44.00000, lon: -78.75000, value: 80 },
        { lat: 42.98339, lon: -81.23304, value: 85 },
      ],
    };

    const CONTAINER_WIDTH = 800; // Adjust based on container width
    const CONTAINER_HEIGHT = 600; // Adjust based on container height
    const MIN_LATITUDE = 41.676;
    const MAX_LATITUDE = 56.856;
    const MIN_LONGITUDE = -95.153;
    const MAX_LONGITUDE = -74.343;

    // Convert lat/lon to x/y coordinates
    const convertedData = {};
    Object.keys(sampleData).forEach((key) => {
      convertedData[key] = sampleData[key].map((point) => {
        const { lat, lon, value } = point;
        const x = ((lon - MIN_LONGITUDE) / (MAX_LONGITUDE - MIN_LONGITUDE)) * CONTAINER_WIDTH;
        const y = ((lat - MIN_LATITUDE) / (MAX_LATITUDE - MIN_LATITUDE)) * CONTAINER_HEIGHT;
        return { x, y, value };
      });
    });

    setHeatmapData(convertedData); // Store data for all heatmaps
    return convertedData;
  };

  // Initialize heatmap and render the active heatmap
  const renderHeatmap = async () => {
    if (!heatmapInstance) return;

    const activeData = heatmapData[activeHeatmap] || [];
    heatmapInstance.setData({
      max: 100, // Adjust as necessary
      data: activeData,
    });
  };

 
  useEffect(() => {
    // Import heatmap.js dynamically
    import('heatmap.js').then(async (heatmap) => {
      const Heatmap = heatmap.default;

      // Initialize the heatmap instance
      const instance = Heatmap.create({
        container: heatmapContainer.current,
        radius: 20,
        maxOpacity: 0.8,
        minOpacity: 0,
        blur: 0.75,
      });

      setHeatmapInstance(instance);

      // Fetch data and render the initial heatmap
      const data = await fetchHeatmapData();
      instance.setData({
        max: 100,
        data: data[activeHeatmap],
      });
    });
  }, []);
 
  
};
  // Re-render the heatmap whenever the active heatmap changes
  useEffect(() => {
    renderHeatmap();
  }, [activeHeatmap]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Title */}
      <header className="text-center">
        <h1 className="text-3xl font-bold">Switchable Heatmaps</h1>
        <p className="text-lg">Water Collection | Average Temperature | Solar Index</p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Heatmap Switcher */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveHeatmap('water')}
            className={`px-4 py-2 border rounded ${
              activeHeatmap === 'water' ? 'bg-blue-500 text-white' : 'bg-white text-black'
            }`}
          >
            Water Collection
          </button>
          <button
            onClick={() => setActiveHeatmap('temperature')}
            className={`px-4 py-2 border rounded ${
              activeHeatmap === 'temperature' ? 'bg-red-500 text-white' : 'bg-white text-black'
            }`}
          >
            Average Temperature
          </button>
          <button
            onClick={() => setActiveHeatmap('solar')}
            className={`px-4 py-2 border rounded ${
              activeHeatmap === 'solar' ? 'bg-yellow-500 text-black' : 'bg-white text-black'
            }`}
          >
            Solar Index
          </button>
        </div>

        {/* Heatmap Container */}
        <div
          ref={heatmapContainer}
          className="relative w-[800px] h-[600px] bg-gray-200"
          style={{ position: 'relative' }}
        >
          {/* The heatmap will render here */}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center">
        <p>Switchable Heatmaps for Recommendations</p>
      </footer>
    </div>
  );
}
