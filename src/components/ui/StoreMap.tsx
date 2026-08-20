import React, { useEffect, useRef } from "react";
import L from "leaflet";
import type { StoreLocation } from "../../data/storeLocations";
import { formatDistanceDisplay } from "../../utils/distanceUtils";

interface StoreMapProps {
  locations: (StoreLocation & { distanceMiles: number })[];
  selectedStore: StoreLocation | null;
  onSelectStore: (store: StoreLocation) => void;
  userCoords: { lat: number; lng: number } | null;
  unit?: "mi" | "km";
  className?: string;
}

// Custom Leaflet DivIcon factory for stylish map pins matching established theme
function createCustomPin(isPicked: boolean, brandName: string) {
  const colorClass = isPicked ? "#2A6F77" : "#14213D";
  const scale = isPicked ? "1.25" : "1.0";
  const zIndex = isPicked ? 999 : 100;

  const html = `
    <div style="transform: scale(${scale}); transition: all 0.3s ease; z-index: ${zIndex};" class="relative group cursor-pointer flex flex-col items-center">
      <div style="background-color: ${colorClass}; shadow: 0 4px 12px rgba(0,0,0,0.3);" className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white font-sans text-[11px] font-bold shadow-md border border-white/40 whitespace-nowrap">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span>${brandName}</span>
      </div>
      <div style="border-top-color: ${colorClass};" class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px]"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "custom-leaflet-marker",
    iconSize: [100, 36],
    iconAnchor: [50, 36],
    popupAnchor: [0, -32],
  });
}

export function StoreMap({
  locations,
  selectedStore,
  onSelectStore,
  userCoords,
  unit = "mi",
  className = "",
}: StoreMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  // Initialize Leaflet Map Instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialLat = userCoords?.lat || 40.7505;
      const initialLng = userCoords?.lng || -73.9882;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center when user search anchor coordinates change
  useEffect(() => {
    if (mapInstanceRef.current && userCoords) {
      mapInstanceRef.current.setView([userCoords.lat, userCoords.lng], 12, {
        animate: true,
      });
    }
  }, [userCoords]);

  // Update Markers when locations or selection changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    const bounds = L.latLngBounds([]);

    locations.forEach((loc) => {
      const isSelected = selectedStore?.id === loc.id;
      const marker = L.marker([loc.lat, loc.lng], {
        icon: createCustomPin(isSelected, loc.brandName),
        title: `${loc.brandName} - ${loc.address}`,
      }).addTo(map);

      const distText = formatDistanceDisplay(loc.distanceMiles, unit);
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}&query=${encodeURIComponent(
        `${loc.brandName} ${loc.address} ${loc.city}`
      )}`;

      const popupContent = `
        <div style="font-family: Urbanist, system-ui, sans-serif; padding: 4px; min-width: 200px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #2A6F77; margin-bottom: 2px;">
            ${loc.brandName} (${loc.storeCode})
          </div>
          <div style="font-size: 13px; font-weight: 750; color: #14213D; line-height: 1.2;">
            ${loc.address}
          </div>
          <div style="font-size: 11px; color: #64748B; margin-top: 2px;">
            ${loc.city}, ${loc.state} ${loc.zip}
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px; font-family: monospace; font-size: 11px; font-weight: 700;">
            <span style="color: #1E7B57;">${distText}</span>
            <span style="color: #64748B;">Hours: ${loc.returnDeskHours.split('|')[0]}</span>
          </div>
          <div style="display: flex; gap: 6px; margin-top: 10px;">
            <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background-color: #14213D; color: white; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; text-decoration: none;">
              Get directions
            </a>
            <a href="/stores/${loc.brandSlug}" style="flex: 1; text-align: center; background-color: #2A6F77; color: white; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; text-decoration: none;">
              Policy record
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 280 });

      marker.on("click", () => {
        onSelectStore(loc);
      });

      if (isSelected) {
        marker.openPopup();
      }

      markersRef.current.set(loc.id, marker);
      bounds.extend([loc.lat, loc.lng]);
    });

    // Optionally fit bounds if locations exist and map is initialized
    if (locations.length > 0 && mapInstanceRef.current) {
      if (locations.length === 1) {
        mapInstanceRef.current.setView([locations[0].lat, locations[0].lng], 13);
      }
    }
  }, [locations, selectedStore, onSelectStore, unit]);

  // Pan smoothly to selected store when selectedStore prop changes externally
  useEffect(() => {
    if (mapInstanceRef.current && selectedStore) {
      mapInstanceRef.current.flyTo([selectedStore.lat, selectedStore.lng], 14, {
        animate: true,
        duration: 0.8,
      });
      const marker = markersRef.current.get(selectedStore.id);
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedStore]);

  return (
    <div className={`relative w-full h-full min-h-[380px] ${className}`}>
      <div ref={mapContainerRef} className="w-full h-full min-h-[380px] rounded-2xl z-0" />
    </div>
  );
}
