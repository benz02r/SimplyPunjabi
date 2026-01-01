// app/sitemap.js
export default function sitemap() {
    const baseUrl = 'https://www.simplypunjabi.com';
    const currentDate = new Date();

    // Static routes
    const routes = [
        '',  // Homepage
        '/learn-more',
        '/learning/essential-punjabi',
        '/learning/speak-with-confidence',
        '/learning/master-punjabi',
        '/punjabichat',
        '/key-functions/signup',
        '/key-functions/login',
    ];

    // Lesson routes - all start at /1
    const lessons = [1, 2, 3, 4, 5].map(num => `/lessons/lesson${num}/1`);

    // Combine all routes
    const allRoutes = [...routes, ...lessons];

    return allRoutes.map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: currentDate,
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route.includes('/lessons/') ? 0.85 : 0.7,
    }));
}

// To add a new page in future:
// 1. Add to routes array: '/new-page'
// 2. Add new lesson: change [1, 2, 3, 4, 5] to [1, 2, 3, 4, 5, 6]