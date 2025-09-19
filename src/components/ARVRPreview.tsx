import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Text3D, 
  Center, 
  Float,
  Sphere,
  Box,
  Cylinder,
  useTexture,
  Html
} from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Headset, 
  Eye, 
  RotateCcw, 
  Maximize, 
  Camera,
  Trees,
  Mountain,
  Waves
} from 'lucide-react';
import { toast } from 'sonner';

// 3D Scene Components
const ForestScene = () => {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Ground */}
      <Cylinder args={[8, 8, 0.2]} position={[0, -2, 0]}>
        <meshLambertMaterial color="#4a5d23" />
      </Cylinder>
      
      {/* Trees */}
      {Array.from({ length: 12 }).map((_, i) => (
        <group key={i} position={[
          Math.cos(i * 0.5) * (3 + Math.random() * 2),
          -1,
          Math.sin(i * 0.5) * (3 + Math.random() * 2)
        ]}>
          {/* Tree trunk */}
          <Cylinder args={[0.2, 0.3, 2]} position={[0, 0, 0]}>
            <meshLambertMaterial color="#8B4513" />
          </Cylinder>
          {/* Tree foliage */}
          <Sphere args={[1.2]} position={[0, 1.5, 0]}>
            <meshLambertMaterial color="#228B22" />
          </Sphere>
        </group>
      ))}
      
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={2 + Math.random() * 2} rotationIntensity={0.5}>
          <Sphere 
            args={[0.05]} 
            position={[
              (Math.random() - 0.5) * 10,
              Math.random() * 4,
              (Math.random() - 0.5) * 10
            ]}
          >
            <meshBasicMaterial color="#ffff88" transparent opacity={0.7} />
          </Sphere>
        </Float>
      ))}
      
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.1}
          curveSegments={12}
          position={[0, 3, 0]}
        >
          Betla National Park
          <meshLambertMaterial color="#2F4F2F" />
        </Text3D>
      </Center>
    </group>
  );
};

const WaterfallScene = () => {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group>
      {/* Mountain backdrop */}
      <Box args={[12, 6, 2]} position={[0, 1, -4]}>
        <meshLambertMaterial color="#696969" />
      </Box>
      
      {/* Waterfall */}
      <group ref={meshRef}>
        <Box args={[0.5, 8, 0.1]} position={[0, 2, 0]}>
          <meshBasicMaterial color="#87CEEB" transparent opacity={0.8} />
        </Box>
        
        {/* Water particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <Sphere 
            key={i}
            args={[0.1]} 
            position={[
              (Math.random() - 0.5) * 1,
              Math.random() * 8 - 2,
              0
            ]}
          >
            <meshBasicMaterial color="#B0E0E6" transparent opacity={0.6} />
          </Sphere>
        ))}
      </group>
      
      {/* Pool at bottom */}
      <Cylinder args={[3, 3, 0.3]} position={[0, -3, 0]}>
        <meshLambertMaterial color="#4682B4" />
      </Cylinder>
      
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.4}
          height={0.08}
          curveSegments={12}
          position={[0, 4, 0]}
        >
          Hundru Falls
          <meshLambertMaterial color="#191970" />
        </Text3D>
      </Center>
    </group>
  );
};

const CulturalVillageScene = () => {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Village huts */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group key={i} position={[
          Math.cos(i * 1.05) * 4,
          -1,
          Math.sin(i * 1.05) * 4
        ]}>
          {/* Hut base */}
          <Cylinder args={[1.2, 1.2, 1.5]} position={[0, 0, 0]}>
            <meshLambertMaterial color="#DEB887" />
          </Cylinder>
          {/* Roof */}
          <Cylinder args={[0, 1.8, 1.2]} position={[0, 1.2, 0]}>
            <meshLambertMaterial color="#8B4513" />
          </Cylinder>
        </group>
      ))}
      
      {/* Central fire */}
      <Cylinder args={[0.8, 0.8, 0.2]} position={[0, -1.8, 0]}>
        <meshLambertMaterial color="#654321" />
      </Cylinder>
      
      {/* Fire particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={3 + Math.random()} rotationIntensity={1}>
          <Sphere 
            args={[0.1]} 
            position={[
              (Math.random() - 0.5) * 1.5,
              Math.random() * 2 - 1,
              (Math.random() - 0.5) * 1.5
            ]}
          >
            <meshBasicMaterial color={Math.random() > 0.5 ? "#FF4500" : "#FFD700"} />
          </Sphere>
        </Float>
      ))}
      
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.35}
          height={0.07}
          curveSegments={12}
          position={[0, 3, 0]}
        >
          Tribal Village
          <meshLambertMaterial color="#8B0000" />
        </Text3D>
      </Center>
    </group>
  );
};

// Loading component
const SceneLoader = () => (
  <Html center>
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading 3D Experience...</p>
    </div>
  </Html>
);

const ARVRPreview = () => {
  const [activeScene, setActiveScene] = useState('forest');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const scenes = {
    forest: {
      component: ForestScene,
      title: 'Betla National Park',
      description: 'Immerse yourself in the pristine forests of Jharkhand',
      icon: Trees
    },
    waterfall: {
      component: WaterfallScene,
      title: 'Hundru Falls',
      description: 'Experience the majestic 320ft waterfall',
      icon: Waves
    },
    village: {
      component: CulturalVillageScene,
      title: 'Tribal Village',
      description: 'Explore authentic tribal culture and traditions',
      icon: Mountain
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    toast.info(isFullscreen ? 'Exited fullscreen mode' : 'Entered fullscreen mode');
  };

  return (
    <section id="ar-vr-preview" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Immersive Experience
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            AR/VR Preview
            <span className="block text-transparent bg-gradient-to-r from-eco to-cultural bg-clip-text">
              Virtual Tourism
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience Jharkhand's destinations in immersive 3D. Navigate, explore, and get a preview 
            of what awaits you at each stunning location.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-eco/10 to-cultural/10">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Headset className="h-5 w-5 text-eco" />
                  3D Virtual Experience
                </CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.reload()}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={toggleFullscreen}
                  >
                    <Maximize className="h-4 w-4 mr-2" />
                    {isFullscreen ? 'Exit' : 'Fullscreen'}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Tabs value={activeScene} onValueChange={setActiveScene} className="w-full">
                <div className="p-6 bg-background">
                  <TabsList className="grid w-full grid-cols-3">
                    {Object.entries(scenes).map(([key, scene]) => (
                      <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                        <scene.icon className="h-4 w-4" />
                        {scene.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {Object.entries(scenes).map(([key, scene]) => (
                  <TabsContent key={key} value={key} className="m-0">
                    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'h-[600px]'}`}>
                      <Canvas
                        camera={{ 
                          position: [0, 2, 8], 
                          fov: 60,
                        }}
                        shadows
                      >
                        <ambientLight intensity={0.4} />
                        <directionalLight 
                          position={[10, 10, 5]} 
                          intensity={1.2}
                          castShadow
                        />
                        <pointLight position={[0, 10, 0]} intensity={0.8} />
                        
                        <Suspense fallback={<SceneLoader />}>
                          <scene.component />
                          <Environment preset="forest" />
                        </Suspense>
                        
                        <OrbitControls 
                          enablePan={true}
                          enableZoom={true}
                          enableRotate={true}
                          autoRotate={true}
                          autoRotateSpeed={0.5}
                          maxDistance={15}
                          minDistance={3}
                        />
                      </Canvas>

                      {/* Scene info overlay */}
                      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg max-w-xs">
                        <h3 className="font-bold text-lg mb-1">{scene.title}</h3>
                        <p className="text-sm opacity-90">{scene.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs opacity-75">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            Click & drag to rotate
                          </span>
                          <span className="flex items-center gap-1">
                            <Camera className="h-3 w-3" />
                            Scroll to zoom
                          </span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Experience Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-eco/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headset className="h-6 w-6 text-eco" />
              </div>
              <h3 className="font-bold text-lg mb-2">Immersive 3D</h3>
              <p className="text-muted-foreground text-sm">
                Experience destinations in stunning 3D with full 360° exploration capabilities.
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-cultural/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-cultural" />
              </div>
              <h3 className="font-bold text-lg mb-2">Interactive Preview</h3>
              <p className="text-muted-foreground text-sm">
                Get a realistic preview before visiting with interactive elements and details.
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">Virtual Tourism</h3>
              <p className="text-muted-foreground text-sm">
                Explore from anywhere with our cutting-edge virtual reality technology.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARVRPreview;