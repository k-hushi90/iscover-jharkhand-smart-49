import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Users } from "lucide-react";
import ecoTourismImage from "@/assets/eco-tourism.jpg";
import culturalFestivalImage from "@/assets/cultural-festival.jpg";

const destinations = [
  {
    id: 1,
    name: "Betla National Park",
    description: "Home to elephants, tigers, and diverse flora in pristine sal forests",
    image: ecoTourismImage,
    category: "Eco Tourism",
    rating: 4.8,
    duration: "2-3 Days",
    price: "₹2,500",
    visitors: "12k+ visited",
    highlights: ["Wildlife Safari", "Bird Watching", "Nature Trails"]
  },
  {
    id: 2,
    name: "Tribal Cultural Village",
    description: "Experience authentic Santal and Munda tribal traditions and crafts",
    image: culturalFestivalImage,
    category: "Cultural Tourism",
    rating: 4.9,
    duration: "1-2 Days", 
    price: "₹1,800",
    visitors: "8k+ visited",
    highlights: ["Traditional Dance", "Handicraft Workshop", "Local Cuisine"]
  },
  {
    id: 3,
    name: "Hundru Falls",
    description: "Spectacular 320ft waterfall surrounded by dense forests",
    image: ecoTourismImage,
    category: "Eco Tourism",
    rating: 4.7,
    duration: "1 Day",
    price: "₹1,200",
    visitors: "15k+ visited",
    highlights: ["Waterfall Trek", "Photography", "Rock Climbing"]
  }
];

const DestinationExplorer = () => {
  return (
    <section id="destinations" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Explore Destinations
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Discover Jharkhand's
            <span className="block text-transparent bg-gradient-to-r from-eco to-cultural bg-clip-text">
              Hidden Treasures
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From pristine forests to vibrant tribal villages, explore destinations that showcase 
            the natural beauty and rich cultural heritage of Jharkhand.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="eco" size="sm">All Destinations</Button>
          <Button variant="outline" size="sm">Eco Tourism</Button>
          <Button variant="outline" size="sm">Cultural Sites</Button>
          <Button variant="outline" size="sm">Adventure</Button>
          <Button variant="outline" size="sm">Wildlife</Button>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {destinations.map((destination) => (
            <Card key={destination.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant={destination.category === "Eco Tourism" ? "default" : "secondary"}
                    className={destination.category === "Eco Tourism" ? "bg-eco text-eco-foreground" : "bg-cultural text-cultural-foreground"}
                  >
                    {destination.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-eco" />
                  {destination.name}
                </CardTitle>
                <CardDescription className="text-base">
                  {destination.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {destination.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {destination.visitors}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {destination.highlights.map((highlight) => (
                    <Badge key={highlight} variant="outline" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-foreground">{destination.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">per person</span>
                </div>
                <Button 
                  variant={destination.category === "Eco Tourism" ? "eco" : "cultural"}
                  size="sm"
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Destinations
            <MapPin className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationExplorer;