//title that says mississauga, Ontario, Canada
//make the filter allow user to input min and max
//place the filter as a small rectangle at the bottom left corner
//in that filter box the min adn max should only be at the top half of the box, assume there will be other filters in the box
'use client';
import { useEffect, useRef, useState } from "react";
import Papa from "papaparse"; // Use papaparse to load and parse CSV files


export default function Home() {
  const heatmapContainer = useRef(null);
  const [heatmapInstance, setHeatmapInstance] = useState(null);
  const [minThreshold, setMinThreshold] = useState(0); // Minimum solar index threshold
  const [maxThreshold, setMaxThreshold] = useState(100); // Maximum solar index threshold
  const [heatmapData, setHeatmapData] = useState([]); // Store the aggregated data from CSVs



  const fetchAndFilterData = (minValue) => {
    // Simulated backend fetch
    const testData = {
      max: 100, // The highest value
      data: [
        { x: 100, y: 150, value: 50 }, // Point 1
        { x: 200, y: 250, value: 75 }, // Point 2
        { x: 300, y: 350, value: 30 }, // Point 3
      ],
    };

    const fetchHeatmapData = async () => {
      try {
        // Fetch data directly from the backend
        const response = await fetch('/api/solar-index'); // No need for POST or request body
    
        // Parse the JSON response
        const data = await response.json();
    
        // Convert backend data (lat, lon, normalizedIndex) to heatmap-compatible format
        const convertedData = data.map((point) => {
          const { lat, lon, normalizedIndex } = point;
    
          // Convert lat/lon to x/y coordinates based on container size and bounds
          const x = ((lon + 95.153) / (95.153 - 74.343)) * 800; // Replace 800 with your heatmap container width
          const y = ((lat - 41.676) / (56.856 - 41.676)) * 600; // Replace 600 with your heatmap container height
    
          return { x, y, value: normalizedIndex };
        });
    
        setHeatmapData(convertedData); // Update state with the heatmap data
        return convertedData; // Return the converted data
      } catch (error) {
        console.error('Error fetching heatmap data:', error);
      }
    };
    
    

    // Filter the data based on the threshold
    const filteredData = {
      max: testData.max,
      data: testData.data.filter((point) => point.value >= minValue),
    };

    // Update the heatmap with filtered data
    if (heatmapInstance) {
      heatmapInstance.setData(filteredData);
    }
  };

  useEffect(() => {4
    import('heatmap.js').then(async (heatmap) => {
      const Heatmap = heatmap.default;
  
      // Configure the heatmap instance
      const instance = Heatmap.create({
        container: heatmapContainer.current,
        radius: 20, // Adjust for desired heatmap spread
        maxOpacity: 0.8,
        minOpacity: 0,
        blur: 0.75,
      });
  
      setHeatmapInstance(instance);
  
      // Fetch data from the backend and set it to the heatmap
      const data = await fetchHeatmapData();
      instance.setData({
        max: 100, // Maximum value for normalization
        data,
      });
    });
  }, []);
  // useEffect(() => {
  //   // Import heatmap.js dynamically to ensure it works with Next.js SSR
  //   import("heatmap.js").then((heatmap) => {
  //     const Heatmap = heatmap.default;

  //     // Heatmap configuration
  //     const instance = Heatmap.create({
  //       container: heatmapContainer.current,
  //       radius: 20, // Adjust for your desired spread
  //       maxOpacity: 0.8,
  //       minOpacity: 0,
  //       blur: 0.75,
  //     });

  //     setHeatmapInstance(instance);

  //     // Initial data fetch and render
  //     fetchAndFilterData(minThreshold, maxThreshold);
  //   });
  // }, []); // Run only once on mount

  
  
  const handleMinThresholdChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setMinThreshold(value);
    fetchAndFilterData(value, maxThreshold);
  };

  const handleMaxThresholdChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setMaxThreshold(value);
    fetchAndFilterData(minThreshold, value);
  };

 

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="text-center">
        <h1 className="text-3xl font-bold">Mississauga, Ontario, Canada</h1>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
     
        <div
          ref={heatmapContainer}
          className="relative w-full h-[500px] bg-gray-200"
          style={{ position: "relative" }}
        >
          {/* The heatmap will render here */}
        </div>
        <div
  className="absolute bottom-8 left-8 bg-white p-4 border rounded shadow-lg w-64"
  style={{ height: "150px" }}
>
  <h3 className="font-semibold text-lg mb-2">Filters</h3>
  <div className="flex gap-2 mb-4">
    {/* Minimum Solar Index */}
    <div className="flex flex-col flex-1">
      <label htmlFor="min-threshold" className="text-sm">
        Min:
      </label>
      <input
        id="min-threshold"
        type="number"
        value={minThreshold}
        onChange={handleMinThresholdChange}
        className="border rounded px-2 py-1 text-black"
        placeholder="Min"
      />
    </div>

    {/* Maximum Solar Index */}
    <div className="flex flex-col flex-1">
      <label htmlFor="max-threshold" className="text-sm">
        Max:
      </label>
      <input
        id="max-threshold"
        type="number"
        value={maxThreshold}
        onChange={handleMaxThresholdChange}
        className="border rounded px-2 py-1 text-black"
        placeholder="Max"
      />
    </div>
  </div>
</div>

        <footer>
          <p>Mississauga Solar Index Heatmap</p>
        </footer>
      </main>
    </div>
  );
}
