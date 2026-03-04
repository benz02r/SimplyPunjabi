// scripts/embeddingService.js
// Regenerates all cultural context embeddings using Gemini (768 dimensions, truncated)
// Run with: node -r dotenv/config scripts/embeddingService.js dotenv_config_path=.env.local

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function generateEmbedding(text) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY is not set in .env.local');

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'models/gemini-embedding-001',
                content: { parts: [{ text }] },
                outputDimensionality: 768
            })
        }
    );

    if (!response.ok) {
        throw new Error(`Embedding API error: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    return data.embedding.values;
}

async function reseedEmbeddings() {
    console.log('Fetching all cultural contexts with missing embeddings...');

    const { data: contexts, error } = await supabase
        .from('cultural_contexts')
        .select('id, scenario_text, example_usage, keywords')
        .is('embedding', null);

    if (error) {
        console.error('Failed to fetch contexts:', error);
        process.exit(1);
    }

    if (!contexts || contexts.length === 0) {
        console.log('No contexts with missing embeddings. All up to date!');
        process.exit(0);
    }

    console.log(`Found ${contexts.length} contexts to embed...\n`);

    // Test API before processing all rows
    console.log('Testing embedding API...');
    try {
        const testEmbedding = await generateEmbedding(contexts[0].scenario_text);
        console.log(`✓ API working — ${testEmbedding.length} dimensions\n`);
    } catch (err) {
        console.error('API test failed:', err.message);
        process.exit(1);
    }

    let success = 0;
    let failed = 0;

    for (const ctx of contexts) {
        try {
            const textToEmbed = [
                ctx.scenario_text,
                ctx.example_usage || '',
                Array.isArray(ctx.keywords) ? ctx.keywords.join(', ') : (ctx.keywords || '')
            ].filter(Boolean).join(' | ');

            const embedding = await generateEmbedding(textToEmbed);

            const { error: updateError } = await supabase
                .from('cultural_contexts')
                .update({ embedding })
                .eq('id', ctx.id);

            if (updateError) {
                console.error(`  ✗ Row ${ctx.id}: ${updateError.message}`);
                failed++;
            } else {
                console.log(`  ✓ Row ${ctx.id}: embedded (${embedding.length} dims)`);
                success++;
            }

            await new Promise(r => setTimeout(r, 200));

        } catch (err) {
            console.error(`  ✗ Row ${ctx.id}: ${err.message}`);
            failed++;
        }
    }

    console.log('\n=============================');
    console.log(`✓ Success: ${success}`);
    console.log(`✗ Failed:  ${failed}`);
    console.log('=============================');

    if (failed === 0) {
        console.log('\nAll embeddings regenerated. RAG is ready to deploy!');
    } else {
        console.log('\nSome failed — run the script again to retry.');
    }
}

reseedEmbeddings().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});