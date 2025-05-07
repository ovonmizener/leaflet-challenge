# Leaflet Challenge: Earthquake Visualization

## Description
This project visualizes real-time earthquake data from the United States Geological Survey (USGS) using Leaflet.js and D3.js. The interactive map displays earthquake markers scaled by magnitude and colored by depth, with popups providing detailed information. An optional overlay shows tectonic plate boundaries to help illustrate the relationship between seismic activity and tectonic features.

## Features
- **Interactive Map:** Displays live earthquake data on a map.
- **Dynamic Markers:** Marker sizes reflect earthquake magnitude; colors indicate depth.
- **Popups:** Click on markers to view detailed information, including location, magnitude, and depth.
- **Legend:** A built-in legend explains the color coding for earthquake depths.
- **Tectonic Plates Overlay (Optional):** An additional layer shows tectonic plate boundaries.
- **Layer Controls:** Easily toggle between base maps (Basemap & Street) and overlays (Earthquakes & Tectonic Plates).

## File Structure
- `index.html` – Main file that loads the map, CSS, and JavaScript.
- `static/css/style.css` – Contains basic styles to ensure the map fills the viewport.
- `static/js/logic.js` – All map logic, including setting up layers, fetching GeoJSON data, and adding interactive features.

## Disclaimer
This project makes use of earthquake data provided by the USGS. The visualization is intended for educational and informational purposes only and may not reflect all aspects of seismic activity accurately. This project is not affiliated with or endorsed by the USGS or any government organization. Use the data responsibly. Code is my own, with some assistance from Copilot to debug and remove blockers. 

## Acknowledgments
- **USGS:** For providing timely earthquake data via their [GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/).
- **Leaflet.js & D3.js:** For their powerful libraries that make interactive data visualization accessible.
