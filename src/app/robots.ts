import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/login', '/checkout', '/payment', '/confirmation'],
    },
    sitemap: 'https://seafinder360.com/sitemap.xml',
  }
}
