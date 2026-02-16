// lib/culturalRAG.js

import { createClient } from '@supabase/supabase-js';
import embeddingService from './embeddingService.js';

export class CulturalRAG {
    constructor() {
        this.supabase = null;
    }

    /**
     * Initialize Supabase client (lazy loading)
     */
    getSupabaseClient() {
        if (!this.supabase) {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

            if (!supabaseUrl || !supabaseKey) {
                throw new Error('Missing Supabase credentials. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
            }

            this.supabase = createClient(supabaseUrl, supabaseKey);
        }
        return this.supabase;
    }

    /**
     * Retrieve relevant cultural contexts based on user query
     */
    async retrieveContext(userQuery, lessonContext = {}, limit = 3) {
        try {
            const supabase = this.getSupabaseClient();

            // Generate embedding for the user query
            const queryEmbedding = await embeddingService.generateEmbedding(userQuery);

            // Call the PostgreSQL function for vector similarity search
            let { data, error } = await supabase.rpc('match_cultural_contexts', {
                query_embedding: queryEmbedding,
                match_threshold: 0.2,
                match_count: limit * 3
            });

            if (error) {
                console.error('Error retrieving cultural contexts:', error);
                return [];
            }

            if (!data || data.length === 0) {
                return [];
            }

            // Apply additional filters based on lesson context
            let filteredData = data;

            // Filter by cultural domain if provided
            if (lessonContext.topic) {
                const topicFiltered = data.filter(context =>
                    context.cultural_domain === lessonContext.topic
                );
                if (topicFiltered.length > 0) {
                    filteredData = topicFiltered;
                }
            }

            // Filter by lesson applicability if provided
            if (lessonContext.lessonId) {
                const lessonFiltered = filteredData.filter(context =>
                    context.lesson_applicability &&
                    context.lesson_applicability.includes(lessonContext.lessonId)
                );
                if (lessonFiltered.length > 0) {
                    filteredData = lessonFiltered;
                }
            }

            // Filter by formality level if provided
            if (lessonContext.formalityLevel) {
                const formalityFiltered = filteredData.filter(context =>
                    context.formality_level === lessonContext.formalityLevel ||
                    context.formality_level === 'varies'
                );
                if (formalityFiltered.length > 0) {
                    filteredData = formalityFiltered;
                }
            }

            // Return top N results
            return filteredData.slice(0, limit);

        } catch (error) {
            console.error('Error in retrieveContext:', error);
            return [];
        }
    }

    /**
     * Format retrieved contexts for LLM prompt
     */
    formatContextsForPrompt(contexts) {
        if (!contexts || contexts.length === 0) {
            return "No specific cultural context available.";
        }

        return contexts.map((ctx, idx) => `
Cultural Context ${idx + 1}:
- Scenario: ${ctx.scenario_text}
- Formality: ${ctx.formality_level}
- Example: ${ctx.example_usage}
    `).join('\n');
    }

    /**
     * Get statistics about retrieved contexts
     */
    getContextStats(contexts) {
        if (!contexts || contexts.length === 0) {
            return { count: 0 };
        }

        return {
            count: contexts.length,
            avgSimilarity: contexts.reduce((sum, ctx) => sum + (ctx.similarity || 0), 0) / contexts.length,
            domains: [...new Set(contexts.map(ctx => ctx.cultural_domain))],
            formalityLevels: [...new Set(contexts.map(ctx => ctx.formality_level))]
        };
    }
}

// Export singleton instance
const culturalRAG = new CulturalRAG();
export default culturalRAG;