import { createClient } from "@supabase/supabase-js";
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Initialize TTS client
let ttsClient;

try {
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        ttsClient = new TextToSpeechClient({
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
        });
    } else if (process.env.GOOGLE_CLOUD_TTS_API_KEY) {
        ttsClient = new TextToSpeechClient({
            apiKey: process.env.GOOGLE_CLOUD_TTS_API_KEY
        });
    } else {
        ttsClient = new TextToSpeechClient();
    }
} catch (error) {
    console.error('Dictionary TTS Client initialization error:', error);
}

// GET: Fetch dictionary words
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    let query = supabase.from("dictionary").select("*");

    if (search) {
        query = query.ilike("english_word", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

// POST: Generate audio for a word
export async function POST(req) {
    try {
        const {
            text,
            languageCode = 'pa-IN',
            voiceName = 'pa-IN-Wavenet-A',
            speakingRate = 0.9
        } = await req.json();

        if (!text) {
            return Response.json(
                { error: 'Text is required' },
                { status: 400 }
            );
        }

        if (!ttsClient) {
            return Response.json(
                { error: 'TTS service not configured' },
                { status: 500 }
            );
        }

        // Construct the request
        const request = {
            input: { text },
            voice: {
                languageCode,
                name: voiceName,
            },
            audioConfig: {
                audioEncoding: 'MP3',
                speakingRate,
                pitch: 0.0,
                volumeGainDb: 0.0,
                sampleRateHertz: 24000,
                effectsProfileId: ['small-bluetooth-speaker-class-device']
            }
        };

        // Perform the text-to-speech request
        const [response] = await ttsClient.synthesizeSpeech(request);

        // Convert audio content to base64
        const audioContent = response.audioContent.toString('base64');

        return Response.json({
            audioContent,
            languageCode,
            voiceName
        });

    } catch (error) {
        console.error('Dictionary TTS API Error:', error);

        if (error.code === 'ENOENT') {
            return Response.json(
                { error: 'Google Cloud credentials file not found' },
                { status: 500 }
            );
        }

        if (error.code === 3) {
            return Response.json(
                { error: 'Invalid text or unsupported language' },
                { status: 400 }
            );
        }

        return Response.json(
            {
                error: 'Failed to generate audio',
                details: error.message
            },
            { status: 500 }
        );
    }
}