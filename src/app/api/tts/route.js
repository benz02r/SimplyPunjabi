import { TextToSpeechClient } from '@google-cloud/text-to-speech';

// Initialize TTS client
let ttsClient;

try {
    // If you have a service account key file
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        ttsClient = new TextToSpeechClient({
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
        });
    }
    // If using API key (simpler for development)
    else if (process.env.GOOGLE_CLOUD_TTS_API_KEY) {
        ttsClient = new TextToSpeechClient({
            apiKey: process.env.GOOGLE_CLOUD_TTS_API_KEY
        });
    }
    // If using default application credentials (Cloud Run, etc)
    else {
        ttsClient = new TextToSpeechClient();
    }
} catch (error) {
    console.error('TTS Client initialization error:', error);
}

export async function POST(req) {
    try {
        const {
            text,
            languageCode = 'pa-IN',
            voiceName = 'pa-IN-Wavenet-A',
            speakingRate = 0.85
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
                // ssmlGender: 'FEMALE' // Optional: specify gender if needed
            },
            audioConfig: {
                audioEncoding: 'MP3',
                speakingRate, // Slower for learners
                pitch: 0.0,
                volumeGainDb: 0.0,
                sampleRateHertz: 24000,
                effectsProfileId: ['small-bluetooth-speaker-class-device'] // Optimized for mobile
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
        console.error('TTS API Error:', error);

        // Provide helpful error messages
        if (error.code === 'ENOENT') {
            return Response.json(
                { error: 'Google Cloud credentials file not found' },
                { status: 500 }
            );
        }

        if (error.code === 3) { // Invalid argument
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