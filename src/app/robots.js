// app/robots.js
export default function robots() {
    const baseUrl = 'https://www.simplypunjabi.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/*',
                    '/key-functions/dashboard',
                    '/key-functions/profile',
                    '/_next/*',
                    '/private/*',
                ],
            },
            // Allow specific routes
            {
                userAgent: '*',
                allow: [
                    '/api/dictionary',
                    '/key-functions/signup',
                    '/key-functions/login',
                ],
            },
            // Block AI scrapers (optional - remove if you want AI to train on your content)
            {
                userAgent: 'GPTBot',
                disallow: ['/'],
            },
            {
                userAgent: 'ChatGPT-User',
                disallow: ['/'],
            },
            {
                userAgent: 'CCBot',
                disallow: ['/'],
            },
            {
                userAgent: 'anthropic-ai',
                disallow: ['/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}