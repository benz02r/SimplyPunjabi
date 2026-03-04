// scripts/checkModels.js
// Run with: node -r dotenv/config scripts/checkModels.js dotenv_config_path=.env.local
// Lists all available Gemini models to find the correct embedding model name

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('GEMINI_API_KEY not found in .env.local');
        process.exit(1);
    }

    console.log('Fetching available models...\n');

    // Try v1beta first
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    const data = await response.json();

    if (!response.ok) {
        console.error('Error:', data);
        process.exit(1);
    }

    // Filter to only show embedding-capable models
    const embeddingModels = data.models.filter(m =>
        m.supportedGenerationMethods?.includes('embedContent')
    );

    console.log('=== Models that support embedContent ===\n');
    embeddingModels.forEach(m => {
        console.log(`Name: ${m.name}`);
        console.log(`Display: ${m.displayName}`);
        console.log('---');
    });

    console.log('\n=== All model names (for reference) ===\n');
    data.models.forEach(m => console.log(m.name));
}

listModels().catch(err => {
    console.error('Fatal:', err);
    process.exit(1);
});