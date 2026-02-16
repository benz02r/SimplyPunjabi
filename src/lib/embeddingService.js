// lib/embeddingService.js

import { pipeline } from '@xenova/transformers';

class EmbeddingService {
    constructor() {
        this.model = null;
        // Using 384-dimension model (matches your database vector(384))
        this.modelName = 'Xenova/all-MiniLM-L6-v2';
    }

    async initialize() {
        if (!this.model) {
            console.log('Loading embedding model...');
            this.model = await pipeline('feature-extraction', this.modelName);
            console.log('✓ Embedding model loaded successfully');
        }
    }

    /**
     * Generate embedding for a single text
     * @param {string} text - Text to embed
     * @returns {Promise<number[]>} - 384-dimensional embedding vector
     */
    async generateEmbedding(text) {
        await this.initialize();

        // Generate embedding
        const output = await this.model(text, {
            pooling: 'mean',
            normalize: true
        });

        // Convert to regular array
        const embedding = Array.from(output.data);

        return embedding;
    }

    /**
     * Generate embeddings for multiple texts in batch
     * @param {string[]} texts - Array of texts to embed
     * @returns {Promise<number[][]>} - Array of embedding vectors
     */
    async generateBatch(texts) {
        await this.initialize();

        console.log(`Generating embeddings for ${texts.length} texts...`);

        const embeddings = await Promise.all(
            texts.map(text => this.generateEmbedding(text))
        );

        console.log(`✓ Generated ${embeddings.length} embeddings`);

        return embeddings;
    }
}

// Export singleton instance
const embeddingService = new EmbeddingService();
export default embeddingService;