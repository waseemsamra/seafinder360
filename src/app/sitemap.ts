import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://seafinder360.com'
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]
  
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { data: yachts } = await supabase.from('yachts').select('id, updated_at')
    
    const yachtPages = (yachts || []).map((yacht) => ({
      url: `${baseUrl}/yacht-detail?id=${yacht.id}`,
      lastModified: yacht.updated_at ? new Date(yacht.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
    
    return [...staticPages, ...yachtPages]
  } catch (error) {
    return staticPages
  }
}
