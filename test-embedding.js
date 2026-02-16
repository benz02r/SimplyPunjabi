// test-embedding.js
import embeddingService from './lib/embeddingService.js';

async function testEmbedding() {
    console.log('Testing embedding service...\n');

    try {
        // Test single embedding
        const text = "How do I greet my grandmother in Punjabi?";
        console.log(`Generating embedding for: "${text}"`);

        const embedding = await embeddingService.generateEmbedding(text);

        console.log(`✓ Embedding generated!`);
        console.log(`  Dimensions: ${embedding.length}`);
        console.log(`  First 5 values: [${embedding.slice(0, 5).map(n => n.toFixed(4)).join(', ')}...]`);

        // Test batch
        console.log('\nTesting batch generation...');
        const texts = [
            "Sat Sri Akal",
            "How are you?",
            "I love Punjabi food"
        ];

        const embeddings = await embeddingService.generateBatch(texts);
        console.log(`✓ Generated ${embeddings.length} embeddings in batch`);

        console.log('\n✓ All tests passed! Embedding service is working.');

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testEmbedding();