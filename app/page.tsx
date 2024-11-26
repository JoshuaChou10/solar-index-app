"use client";
import { useState } from "react";
import Heatmap from "../components/Heatmap";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Home() {
  const [activeHeatmap, setActiveHeatmap] = useState("solar1");

  const sampleData = {
    solar1: [
      { lat: 43.65107, lon: -79.347015, value: 75 },
      { lat: 44.0, lon: -78.75, value: 50 },
      { lat: 42.98339, lon: -81.23304, value: 85 },
    ],
    solar2: [
      { lat: 43.65107, lon: -79.347015, value: 25 },
      { lat: 44.0, lon: -78.75, value: 30 },
      { lat: 42.98339, lon: -81.23304, value: 35 },
    ],
    solar3: [
      { lat: 43.65107, lon: -79.347015, value: 90 },
      { lat: 44.0, lon: -78.75, value: 80 },
      { lat: 42.98339, lon: -81.23304, value: 85 },
    ],
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Title */}
      <header className="text-center">
        <h1 className="text-3xl font-bold">Switchable Heatmaps</h1>
        <p className="text-lg">
          solar1 | solar2 | solar3
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Heatmap Switcher */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveHeatmap("solar1")}
            className={`px-4 py-2 border rounded ${
              activeHeatmap === "solar1"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Solar1 
          </button>
          <button
            onClick={() => setActiveHeatmap("solar2")}
            className={`px-4 py-2 border rounded ${
              activeHeatmap === "solar2"
                ? "bg-red-500 text-white"
                : "bg-white text-black"
            }`}
          >
            Solar2
          </button>
          <button
            onClick={() => setActiveHeatmap("solar")}
            className={`px-4 py-2 border rounded ${
              activeHeatmap === "solar"
                ? "bg-yellow-500 text-black"
                : "bg-white text-black"
            }`}
          >
            Solar3
          </button>
        </div>

        {/* Heatmap Container */}
        <Heatmap activeHeatmap={activeHeatmap} sampleData={sampleData} />
      </main>
      <SidebarProvider>
        <AppSidebar />
        {/*  */}
      </SidebarProvider>

      {/* Footer */}
      <footer className="text-center">
        <p>Switchable Heatmaps for Recommendations</p>
      </footer>
    </div>
  );
}