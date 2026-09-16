import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://amberproperty.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/properties', '/services', '/neighborhoods', '/projects', '/valuation', '/about', '/contact'],
      disallow: ['/admin', '/admin/*', '/api/*'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

