// scripts/seedCulturalContexts.js

// Load environment variables from .env.local
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local from project root
dotenv.config({ path: join(__dirname, '..', '.env.local') });

import { createClient } from '@supabase/supabase-js';
import embeddingService from '../lib/embeddingService.js';
import culturalContexts from '../lib/culturalContextData.js';

// Use your Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('ERROR: Missing Supabase credentials');
    console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Found' : 'Missing');
    console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? 'Found' : 'Missing');
    console.error('\nMake sure .env.local exists and contains:');
    console.error('  NEXT_PUBLIC_SUPABASE_URL=your_url');
    console.error('  SUPABASE_SERVICE_ROLE_KEY=your_key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedCulturalContexts() {
    console.log('Starting cultural contexts seeding...\n');
    console.log(`Total contexts to seed: ${culturalContexts.length}\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < culturalContexts.length; i++) {
        const context = culturalContexts[i];

        try {
            console.log(`[${i + 1}/${culturalContexts.length}] Processing: ${context.scenario_text.substring(0, 60)}...`);

            // Generate embedding for the scenario text
            const embedding = await embeddingService.generateEmbedding(context.scenario_text);

            // Insert into database
            const { data, error } = await supabase
                .from('cultural_contexts')
                .insert({
                    scenario_text: context.scenario_text,
                    scenario_type: context.scenario_type,
                    formality_level: context.formality_level,
                    cultural_domain: context.cultural_domain,
                    lesson_applicability: context.lesson_applicability,
                    keywords: context.keywords,
                    example_usage: context.example_usage,
                    embedding: embedding
                });

            if (error) {
                console.error(`   ERROR: ${error.message}`);
                errorCount++;
            } else {
                console.log(`   SUCCESS: Inserted`);
                successCount++;
            }

            // Small delay to avoid overwhelming the database
            await new Promise(resolve => setTimeout(resolve, 100));

        } catch (error) {
            console.error(`   ERROR: ${error.message}`);
            errorCount++;
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log('SEEDING SUMMARY');
    console.log('='.repeat(50));
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Total: ${culturalContexts.length}`);
    console.log('='.repeat(50));

    if (successCount === culturalContexts.length) {
        console.log('\nAll cultural contexts seeded successfully');
    } else if (successCount > 0) {
        console.log('\nPartial success - some contexts failed to seed');
    } else {
        console.log('\nSeeding failed - please check errors above');
    }
}

// Run the seeding
seedCulturalContexts()
    .then(() => {
        console.log('\nSeeding process complete');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\nFatal error:', error);
        process.exit(1);
    });