import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { preferences, duration, budget, interests, language = 'English' } = await req.json();

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `Create a personalized ${duration}-day itinerary for Jharkhand, India based on these preferences:
    - Budget: ${budget}
    - Interests: ${interests.join(', ')}
    - Additional preferences: ${preferences}
    - Response language: ${language}

    Include:
    - Day-by-day detailed schedule
    - Specific destinations in Jharkhand (like Betla National Park, Hundru Falls, tribal villages)
    - Cultural experiences and eco-tourism activities
    - Local food recommendations
    - Transportation suggestions
    - Estimated costs for each activity
    - Cultural etiquette tips

    Format as a structured JSON with this format:
    {
      "title": "Your Jharkhand Adventure",
      "days": [
        {
          "day": 1,
          "title": "Day title",
          "activities": [
            {
              "time": "09:00 AM",
              "activity": "Activity name",
              "location": "Location",
              "description": "Detailed description",
              "cost": "₹500",
              "tips": "Helpful tips"
            }
          ]
        }
      ],
      "totalBudget": "₹15000",
      "tips": ["General travel tips for Jharkhand"]
    }`;

    console.log('Generating itinerary with OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert travel planner specializing in Jharkhand tourism. Create detailed, culturally sensitive, and sustainable travel itineraries.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const itinerary = data.choices[0].message.content;

    console.log('Itinerary generated successfully');

    // Try to parse as JSON, fallback to plain text if it fails
    let parsedItinerary;
    try {
      parsedItinerary = JSON.parse(itinerary);
    } catch (e) {
      console.log('Failed to parse as JSON, using plain text format');
      parsedItinerary = {
        title: "Your Jharkhand Adventure",
        content: itinerary,
        isPlainText: true
      };
    }

    return new Response(JSON.stringify({ itinerary: parsedItinerary }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in itinerary-planner function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to generate itinerary. Please try again.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});