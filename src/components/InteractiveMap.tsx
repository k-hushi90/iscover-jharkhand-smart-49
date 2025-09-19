import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Settings, Eye, Navigation } from 'lucide-react';
import { toast } from 'sonner';

interface Destination {
  id: number;
  name: string;
  coordinates: [number, number];
  description: string;
  category: string;
  image?: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Betla National Park',
    coordinates: [84.1947, 23.8748],
    description: 'Home to elephants, tigers, and diverse flora in pristine sal forests',
    category: 'Eco Tourism'
  },
  {
    id: 2,
    name: 'Hundru Falls',
    coordinates: [85.5947, 23.4236],
    description: 'Spectacular 320ft waterfall surrounded by dense forests',
    category: 'Eco Tourism'
  },
  {
    id: 3,
    name: 'Tribal Cultural Village',
    coordinates: [85.3096, 23.3441],
    description: 'Experience authentic Santal and Munda tribal traditions',
    category: 'Cultural Tourism'
  },
  {
    id: 4,
    name: 'Jagannath Temple Ranchi',
    coordinates: [85.3096, 23.3441],
    description: 'Historic temple with stunning architecture',
    category: 'Cultural Tourism'
  },
  {
    id: 5,
    name: 'Netarhat',
    coordinates: [84.2642, 23.4672],
    description: 'Queen of Chotanagpur with breathtaking sunrises',
    category: 'Eco Tourism'
  }
];

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [85.0, 23.5], // Center of Jharkhand
        zoom: 7,
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add full screen control
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      // Add markers for destinations
      destinations.forEach((destination) => {
        // Create custom marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.innerHTML = `
          <div class="marker-content">
            <div class="marker-icon ${destination.category === 'Eco Tourism' ? 'eco' : 'cultural'}">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          </div>
        `;

        // Add marker styles
        const style = document.createElement('style');
        style.textContent = `
          .custom-marker {
            cursor: pointer;
            transition: transform 0.2s ease;
          }
          .custom-marker:hover {
            transform: scale(1.1);
          }
          .marker-content {
            position: relative;
          }
          .marker-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 3px solid white;
            color: white;
          }
          .marker-icon.eco {
            background: hsl(120 40% 35%);
          }
          .marker-icon.cultural {
            background: hsl(15 70% 45%);
          }
        `;
        document.head.appendChild(style);

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-4 min-w-[250px]">
            <h3 class="font-bold text-lg mb-2">${destination.name}</h3>
            <p class="text-sm text-gray-600 mb-3">${destination.description}</p>
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                destination.category === 'Eco Tourism' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }">
                ${destination.category}
              </span>
              <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        `);

        // Add marker to map
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat(destination.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });

      setIsMapInitialized(true);
      toast.success('Interactive map loaded successfully!');
    } catch (error) {
      toast.error('Failed to initialize map. Please check your Mapbox token.');
    }
  };

  const handleTokenSubmit = () => {
    if (!mapboxToken.trim()) {
      toast.error('Please enter a valid Mapbox token');
      return;
    }
    initializeMap(mapboxToken);
    setShowTokenInput(false);
  };

  return (
    <section id="interactive-map" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Interactive Experience
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Explore Jharkhand
            <span className="block text-transparent bg-gradient-to-r from-eco to-cultural bg-clip-text">
              Interactive Map
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Navigate through Jharkhand's top destinations with our interactive map. 
            Click on markers to discover detailed information about each location.
          </p>
        </div>

        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="bg-muted/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5 text-eco" />
                Jharkhand Tourism Map
              </CardTitle>
              <div className="flex gap-2">
                {!isMapInitialized && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowTokenInput(!showTokenInput)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Setup Map
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {showTokenInput && (
              <div className="p-6 bg-muted/30 border-b">
                <div className="max-w-md mx-auto">
                  <label className="block text-sm font-medium mb-2">
                    Enter your Mapbox Public Token
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="pk.eyJ1Ijo..."
                      value={mapboxToken}
                      onChange={(e) => setMapboxToken(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleTokenSubmit}>
                      Initialize
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Get your free token at{' '}
                    <a 
                      href="https://mapbox.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-eco hover:underline"
                    >
                      mapbox.com
                    </a>
                  </p>
                </div>
              </div>
            )}

            <div className="relative">
              {!isMapInitialized && !showTokenInput && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/80 z-10">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Interactive Map Ready</h3>
                    <p className="text-muted-foreground mb-4">
                      Click "Setup Map" to add your Mapbox token and explore destinations
                    </p>
                    <Button 
                      onClick={() => setShowTokenInput(true)}
                      variant="eco"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Setup Interactive Map
                    </Button>
                  </div>
                </div>
              )}
              <div 
                ref={mapContainer} 
                className="w-full h-[600px] rounded-b-lg"
                style={{ minHeight: '400px' }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Map Legend */}
        {isMapInitialized && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-4">
              <div className="w-8 h-8 bg-eco rounded-full mx-auto mb-2 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-eco-foreground" />
              </div>
              <h3 className="font-medium">Eco Tourism</h3>
              <p className="text-sm text-muted-foreground">Natural attractions and wildlife</p>
            </Card>
            <Card className="text-center p-4">
              <div className="w-8 h-8 bg-cultural rounded-full mx-auto mb-2 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-cultural-foreground" />
              </div>
              <h3 className="font-medium">Cultural Sites</h3>
              <p className="text-sm text-muted-foreground">Heritage and tribal experiences</p>
            </Card>
            <Card className="text-center p-4">
              <div className="w-8 h-8 bg-accent rounded-full mx-auto mb-2 flex items-center justify-center">
                <Eye className="h-4 w-4 text-accent-foreground" />
              </div>
              <h3 className="font-medium">Interactive Features</h3>
              <p className="text-sm text-muted-foreground">Click markers for details</p>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveMap;