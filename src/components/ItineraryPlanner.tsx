import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Calendar, Clock, Wallet, Languages, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const interests = [
  "Wildlife & Nature",
  "Tribal Culture",
  "Adventure Sports",
  "Photography",
  "Spiritual Tourism",
  "Handicrafts",
  "Local Cuisine",
  "Festivals & Events"
];

const languages = [
  "English",
  "Hindi",
  "Bengali",
  "Santali",
  "Hindi/English Mix"
];

const ItineraryPlanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<any>(null);
  const [preferences, setPreferences] = useState({
    duration: "3",
    budget: "₹10000-20000",
    interests: [] as string[],
    language: "English",
    specialRequests: ""
  });
  const { toast } = useToast();

  const handleInterestChange = (interest: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const generateItinerary = async () => {
    if (preferences.interests.length === 0) {
      toast({
        title: "Please select interests",
        description: "Choose at least one interest to generate your itinerary.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('itinerary-planner', {
        body: {
          preferences: preferences.specialRequests,
          duration: preferences.duration,
          budget: preferences.budget,
          interests: preferences.interests,
          language: preferences.language
        }
      });

      if (error) throw error;

      setItinerary(data.itinerary);
      toast({
        title: "Itinerary Generated!",
        description: "Your personalized Jharkhand itinerary is ready.",
      });
    } catch (error) {
      console.error('Error generating itinerary:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate itinerary. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderItinerary = () => {
    if (!itinerary) return null;

    if (itinerary.isPlainText) {
      return (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              {itinerary.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {itinerary.content}
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="h-6 w-6 text-accent" />
              {itinerary.title}
            </CardTitle>
            {itinerary.totalBudget && (
              <CardDescription className="text-lg">
                Estimated Total: <span className="font-semibold text-accent">{itinerary.totalBudget}</span>
              </CardDescription>
            )}
          </CardHeader>
        </Card>

        {itinerary.days?.map((day: any) => (
          <Card key={day.day} className="overflow-hidden">
            <CardHeader className="bg-gradient-cultural">
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Day {day.day}: {day.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {day.activities?.map((activity: any, idx: number) => (
                  <div key={idx} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className="whitespace-nowrap">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{activity.activity}</h4>
                        {activity.cost && (
                          <Badge variant="secondary" className="ml-2">
                            <Wallet className="h-3 w-3 mr-1" />
                            {activity.cost}
                          </Badge>
                        )}
                      </div>
                      {activity.location && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                          <MapPin className="h-3 w-3" />
                          {activity.location}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                      {activity.tips && (
                        <p className="text-xs text-accent bg-accent/10 p-2 rounded italic">
                          💡 {activity.tips}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {itinerary.tips && itinerary.tips.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-eco" />
                Travel Tips for Jharkhand
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {itinerary.tips.map((tip: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-eco mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <section id="itinerary" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            AI-Powered Planning
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Personalized
            <span className="block text-transparent bg-gradient-to-r from-accent to-eco bg-clip-text">
              Itinerary Planner
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let AI create a custom Jharkhand adventure tailored to your interests, budget, and preferences.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                Plan Your Perfect Trip
              </CardTitle>
              <CardDescription>
                Tell us about your preferences and we'll create a personalized itinerary for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="duration">Trip Duration</Label>
                  <Select value={preferences.duration} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, duration: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="2">2 Days</SelectItem>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="5">5 Days</SelectItem>
                      <SelectItem value="7">1 Week</SelectItem>
                      <SelectItem value="10">10 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select value={preferences.budget} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, budget: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="₹5000-10000">₹5,000 - ₹10,000</SelectItem>
                      <SelectItem value="₹10000-20000">₹10,000 - ₹20,000</SelectItem>
                      <SelectItem value="₹20000-35000">₹20,000 - ₹35,000</SelectItem>
                      <SelectItem value="₹35000+">₹35,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Your Interests</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                  {interests.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={preferences.interests.includes(interest)}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                      />
                      <Label htmlFor={interest} className="text-sm">{interest}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="language">Preferred Language</Label>
                <Select value={preferences.language} onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, language: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="special-requests">Special Requests or Preferences</Label>
                <Textarea
                  id="special-requests"
                  placeholder="Any specific requirements, accessibility needs, dietary restrictions, or special interests..."
                  value={preferences.specialRequests}
                  onChange={(e) => setPreferences(prev => ({ ...prev, specialRequests: e.target.value }))}
                  className="mt-2"
                />
              </div>

              <Button 
                onClick={generateItinerary} 
                disabled={isLoading}
                size="lg"
                className="w-full"
                variant="default"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Your Itinerary...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate My Itinerary
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {renderItinerary()}
        </div>
      </div>
    </section>
  );
};

export default ItineraryPlanner;