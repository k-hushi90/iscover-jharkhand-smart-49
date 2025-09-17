import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import DestinationExplorer from "@/components/DestinationExplorer";
import LocalMarketplace from "@/components/LocalMarketplace";
import EventCalendar from "@/components/EventCalendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Users, Award, MapPin, Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Destination Explorer */}
      <DestinationExplorer />

      {/* Local Marketplace */}
      <LocalMarketplace />

      {/* Event Calendar */}
      <EventCalendar />

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Experience Jharkhand
              <span className="block text-transparent bg-gradient-to-r from-eco to-cultural bg-clip-text">
                Responsibly
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-eco/20 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-eco" />
                </div>
                <CardTitle>Sustainable Tourism</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Promoting eco-friendly practices that preserve nature and support local communities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-cultural/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-cultural" />
                </div>
                <CardTitle>Cultural Immersion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Authentic experiences with tribal communities, preserving traditions and heritage.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Expert Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Local guides and experts providing deep insights into culture and nature.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-8 w-8 text-eco" />
                <h3 className="text-2xl font-bold">Jharkhand Tourism</h3>
              </div>
              <p className="text-primary-foreground/80 mb-6 max-w-md">
                Discover the natural beauty and rich cultural heritage of Jharkhand through 
                sustainable eco-tourism and authentic cultural experiences.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#destinations" className="hover:text-white transition-colors">Destinations</a></li>
                <li><a href="#experiences" className="hover:text-white transition-colors">Experiences</a></li>
                <li><a href="#marketplace" className="hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="#events" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#culture" className="hover:text-white transition-colors">Culture</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-3 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@jharkhardtourism.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Ranchi, Jharkhand, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Jharkhand Tourism Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;