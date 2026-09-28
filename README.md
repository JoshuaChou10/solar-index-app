# Solar Index App

The app displays solar index data on a map with warmer colors representing more solar potential and allows users to compare different types of solar panels, including monocrystalline, polycrystalline, and thin-film panels.

## Features

- Interactive solar heatmap
- Visualizes solar index data with warmer colors representing more potential 
- Compare different solar panel types
- Shows information about panel efficiency
- Uses CSV data to generate heatmap values
- Interactive map using Leaflet 

## Solar Panel Types

The app compares:

- Monocrystalline solar panels
- Polycrystalline solar panels
- Thin-film solar panels

Each panel type includes information about its typical efficiency and characteristics.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Leaflet.js
- Heatmap.js
- OpenStreetMap
- CSV Parser

## App Flow

1. All solar index data is laoded from a pre-existing CSV file
2. The data is processed through a Next.js API route
3. Latitude, longitude, and solar index values are sent to the frontend
4. Leaflet displays the data as a heatmap
5. Users can switch between different solar panel types to compare suitability

## Running Locally

```bash
git clone https://github.com/JoshuaChou10/solar-index-app.git
cd solar-index-app
npm install
npm run dev
