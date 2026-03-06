require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');
const https = require('https');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getEmbedding(text) {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`;

    const body = JSON.stringify({
        model: 'models/gemini-embedding-001',
        content: { parts: [{ text }] },
        outputDimensionality: 768
    });

    return new Promise((resolve, reject) => {
        const req = https.request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.embedding?.values) {
                        resolve(parsed.embedding.values);
                    } else {
                        reject(new Error(`Unexpected response: ${data}`));
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

async function backfill() {
    console.log('Starting backfill...');

    const { data: rows, error } = await supabase
        .from('cultural_contexts')
        .select('id, scenario_text, example_usage, keywords')
        .is('embedding', null);

    if (error) {
        console.error('Supabase fetch error:', error);
        return;
    }

    if (!rows || rows.length === 0) {
        console.log('No rows with NULL embeddings found — nothing to do.');
        return;
    }

    console.log(`Found ${rows.length} rows to embed...`);

    let successCount = 0;
    let failCount = 0;

    for (const row of rows) {
        try {
            const textToEmbed = [
                row.scenario_text,
                row.example_usage,
                Array.isArray(row.keywords) ? row.keywords.join(', ') : row.keywords
            ].filter(Boolean).join(' | ');

            const embedding = await getEmbedding(textToEmbed);

            const { error: updateError } = await supabase
                .from('cultural_contexts')
                .update({ embedding })
                .eq('id', row.id);

            if (updateError) {
                console.error(`Row ${row.id} update failed:`, updateError.message);
                failCount++;
            } else {
                console.log(`Row ${row.id} done (${embedding.length} dimensions)`);
                successCount++;
            }

        } catch (err) {
            console.error(`Row ${row.id} error:`, err.message);
            failCount++;
        }

        await new Promise(r => setTimeout(r, 300));
    }

    console.log(`\nBackfill complete. Success: ${successCount}, Failed: ${failCount}`);
}

backfill();