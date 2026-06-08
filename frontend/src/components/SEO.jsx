import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://smartbiz-ai.com'
const DEFAULT_IMAGE = 'https://smartbiz-ai.com/og-image.png'

export default function SEO({ 
  title, 
  description = 'Turn your WhatsApp into a 24/7 AI sales team. Automate bookings, leads, and customer communication with SmartBiz AI.',
  keywords = 'AI business assistant, WhatsApp automation, smart booking, lead management, AI chatbot, business AI',
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  publishedTime,
  lang = 'en'
}) {
  const fullTitle = title ? `${title} | SmartBiz AI` : 'SmartBiz AI - Automated Business Assistant Platform'
  const canonical = url ? `${SITE_URL}${url}` : SITE_URL

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="SmartBiz AI" />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_AE' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'SoftwareApplication',
          name: 'SmartBiz AI',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          description: description,
          url: SITE_URL,
          author: { '@type': 'Organization', name: 'SmartBiz AI' },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: '29',
            highPrice: '149',
            offerCount: '3',
          },
        })}
      </script>
    </Helmet>
  )
}
