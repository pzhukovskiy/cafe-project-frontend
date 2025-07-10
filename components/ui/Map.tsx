'use client';

import React from 'react';

interface MapProps {
  className?: string;
  height?: string;
}

export const Map: React.FC<MapProps> = ({ 
  className = "w-full h-96", 
  height = "400px" 
}) => {
  // Координаты ресторана Батискаф из OpenStreetMap
  const latitude = 53.859186;
  const longitude = 27.469543;
  const zoom = 16;

  return (
    <div className={`${className} rounded-xl overflow-hidden shadow-lg`}>
      <iframe
        width="100%"
        height={height}
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01},${latitude-0.01},${longitude+0.01},${latitude+0.01}&layer=mapnik&marker=${latitude},${longitude}`}
        title="Ресторан Батискаф на карте"
        className="w-full h-full"
      />
      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <strong>Ресторан Батискаф</strong><br />
            проспект Любимова, 10, Минск
          </div>
          <a
            href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${zoom}/${latitude}/${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Открыть в полном размере
          </a>
        </div>
      </div>
    </div>
  );
}; 