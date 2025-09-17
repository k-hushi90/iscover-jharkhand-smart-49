import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";  
import { Calendar, MapPin, Clock, Users, Star } from "lucide-react";
import culturalFestivalImage from "@/assets/cultural-festival.jpg";

const events = [
  {
    id: 1,
    name: "Sohrai Festival",
    description: "Traditional harvest festival celebrated by tribal communities with colorful wall paintings and folk dances",
    image: culturalFestivalImage,
    date: "Nov 15-17, 2024",
    time: "6:00 PM - 11:00 PM",
    location: "Hazaribagh District",
    category: "Cultural Festival",
    price: "Free Entry",
    expectedAttendees: "5000+",
    highlights: ["Traditional Dance", "Wall Art", "Local Food", "Music"]
  },
  {
    id: 2,
    name: "Tribal Art Workshop",
    description: "Learn traditional Madhubani and Sohrai painting techniques from master artists",
    image: culturalFestivalImage,
    date: "Dec 5-6, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Ranchi Cultural Center",
    category: "Workshop",
    price: "₹1,500",
    expectedAttendees: "50",
    highlights: ["Hands-on Learning", "Art Supplies", "Certificate", "Lunch"]
  },
  {
    id: 3,
    name: "Eco-Tourism Awareness Drive",
    description: "Community event promoting sustainable tourism practices and environmental conservation",
    image: culturalFestivalImage,
    date: "Dec 20, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Betla National Park",
    category: "Educational",
    price: "₹500",
    expectedAttendees: "200+",
    highlights: ["Nature Walk", "Expert Talks", "Tree Planting", "Wildlife Demo"]
  }
];

const EventCalendar = () => {
  return (
    <section id="events" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent text-accent-foreground" variant="secondary">
            Events & Festivals
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Upcoming Cultural
            <span className="block text-transparent bg-gradient-to-r from-accent to-cultural bg-clip-text">
              Events & Festivals
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in the vibrant cultural celebrations, workshops, and educational 
            events that showcase Jharkhand's rich heritage and traditions.
          </p>
        </div>

        {/* Calendar View Toggle */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="default" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Upcoming Events
          </Button>
          <Button variant="outline" size="sm">Monthly View</Button>
          <Button variant="outline" size="sm">Cultural Festivals</Button>
          <Button variant="outline" size="sm">Workshops</Button>
          <Button variant="outline" size="sm">Educational</Button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    className={
                      event.category === "Cultural Festival" ? "bg-cultural text-cultural-foreground" :
                      event.category === "Workshop" ? "bg-eco text-eco-foreground" :
                      "bg-accent text-accent-foreground"
                    }
                  >
                    {event.category}
                  </Badge>
                </div>
                {event.price === "Free Entry" && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600 text-white">
                      FREE
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-2">
                  <span>{event.name}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </CardTitle>
                <CardDescription className="text-base">
                  {event.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{event.expectedAttendees} expected</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {event.highlights.map((highlight) => (
                    <Badge key={highlight} variant="outline" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-lg font-bold text-foreground">{event.price}</span>
                    {event.price !== "Free Entry" && (
                      <span className="text-sm text-muted-foreground ml-1">per person</span>
                    )}
                  </div>
                  <Button 
                    variant={
                      event.category === "Cultural Festival" ? "cultural" :
                      event.category === "Workshop" ? "eco" : "default"
                    }
                    size="sm"
                  >
                    {event.price === "Free Entry" ? "Register Free" : "Book Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            View Full Calendar
          </Button>
          <Button variant="default" size="lg">
            Get Event Notifications
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventCalendar;