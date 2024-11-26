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
      { lat: 43.65107, lon: -100, value: 90 },
      { lat: 44.0, lon: -78.75, value: 80 },
      { lat: 42.98339, lon: -81.23304, value: 85 },
    ],
  };
  const solarPanelInfo = {
    solar1: {
      title: "Monocrystalline Solar Panels",
      description:
        "15-24% Efficiency. Monocrystalline panels are the most efficient type of solar panel. They are made from a single crystal structure, giving them a sleek, uniform black look.",
    },
    solar2: {
      title: "Polycrystalline Solar Panels",
      description:
        "13-16% Efficiency. Polycrystalline panels are less efficient than monocrystalline but are more affordable. They have a bluish hue and are made from multiple crystal fragments.",
    },
    solar3: {
      title: "Thin-Film Solar Panels",
      description:
        "7-13% Efficiency. Thin-film panels are lightweight and flexible, making them suitable for unique installations. However, they are less efficient compared to crystalline panels.",
    },
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Title */}
      <header className="text-center">
        <h1 className="text-3xl font-bold">Switchable Heatmaps</h1>
        <p className="text-lg">
        Monocrystalline | Polycrystalline | Thin-Film
        </p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 w-full">
  {/* Heatmap Switcher */}
  <div className="flex gap-4 justify-center">
    <button
      onClick={() => setActiveHeatmap("solar1")}
      className={`px-4 py-2 border rounded ${
        activeHeatmap === "solar1"
          ? "bg-blue-500 text-white"
          : "bg-white text-black"
      }`}
    >
      Monocrystalline
    </button>
    <button
      onClick={() => setActiveHeatmap("solar2")}
      className={`px-4 py-2 border rounded ${
        activeHeatmap === "solar2"
          ? "bg-red-500 text-white"
          : "bg-white text-black"
      }`}
    >
      Polycrystalline
    </button>
    <button
      onClick={() => setActiveHeatmap("solar3")}
      className={`px-4 py-2 border rounded ${
        activeHeatmap === "solar3"
          ? "bg-yellow-500 text-black"
          : "bg-white text-black"
      }`}
    >
      Thin-Film
    </button>
  </div>

  {/* Sidebar and Map Container */}
  <div className="flex w-full gap-4">
    {/* Sidebar */}
    <div className="w-1/4 bg-gray-100 p-4 border-r">
      <h2 className="text-xl font-bold mb-2">
        {solarPanelInfo[activeHeatmap]?.title}
      </h2>
      <p>{solarPanelInfo[activeHeatmap]?.description}</p>
    </div>

    {/* Map */}
    <div className="flex-1 bg-gray-200 h-[800px]">
      <Heatmap activeHeatmap={activeHeatmap} sampleData={sampleData} />
    </div>
  </div>
</main>

      
 

      
      {/* Footer */}
      <footer className="text-center">
        <p>Switchable Heatmaps for Recommendations</p>
      </footer>
    </div>
  );
}