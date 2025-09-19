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
    const { message, language = 'English', chatHistory = [] } = await req.json();

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    // Build conversation history
    const messages = [
      {
        role: 'system',
        content: `You are a multilingual tourism assistant for Jharkhand, India. You help tourists with:
        - Information about destinations, culture, and activities in Jharkhand
        - Travel planning and recommendations
        - Cultural insights and local customs
        - Transportation and accommodation suggestions
        - Safety tips and practical advice
        
        Always respond in ${language} unless specifically asked to use another language.
        Be friendly, informative, and culturally sensitive.
        Focus specifically on Jharkhand tourism - destinations like Betla National Park, Hundru Falls, tribal villages, cultural festivals, eco-tourism, etc.
        
        If asked about places outside Jharkhand, politely redirect to Jharkhand attractions.`
      },
      ...chatHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    console.log('Processing chatbot message in language:', language);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 800,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    console.log('Chatbot response generated successfully');

    return new Response(JSON.stringify({ 
      reply,
      language,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in multilingual-chatbot function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      reply: 'Sorry, I encountered an error. Please try again.',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});