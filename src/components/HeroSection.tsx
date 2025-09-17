import { Button } from "@/components/ui/button";
import { Play, MapPin, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-jharkhand.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Beautiful Jharkhand landscape with forests and waterfalls"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-eco/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Discover Jharkhand</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Explore the
            <span className="block text-transparent bg-gradient-to-r from-eco to-accent bg-clip-text">
              Heart of India
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            Discover pristine forests, vibrant tribal culture, and sustainable tourism 
            experiences in Jharkhand's untouched wilderness.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              <Calendar className="h-5 w-5" />
              Plan Your Journey
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4">
              <Play className="h-5 w-5" />
              Watch Video Tour
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80 text-sm">Eco Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">30+</div>
              <div className="text-white/80 text-sm">Tribal Villages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">200+</div>
              <div className="text-white/80 text-sm">Cultural Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-white/80 text-sm">National Parks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;