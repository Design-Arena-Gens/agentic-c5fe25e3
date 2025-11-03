'use client'

import BrandCarousel from '@/components/BrandCarousel'

const brands = [
  {
    id: 1,
    name: 'TechCorp',
    logo: 'https://via.placeholder.com/200x80/667eea/ffffff?text=TechCorp',
    description: 'Leading technology solutions provider with innovative cloud services and AI-powered platforms.'
  },
  {
    id: 2,
    name: 'StyleHub',
    logo: 'https://via.placeholder.com/200x80/764ba2/ffffff?text=StyleHub',
    description: 'Premium fashion brand delivering contemporary designs and sustainable clothing worldwide.'
  },
  {
    id: 3,
    name: 'EcoGoods',
    logo: 'https://via.placeholder.com/200x80/f093fb/ffffff?text=EcoGoods',
    description: 'Eco-friendly products for conscious consumers. Committed to sustainability and quality.'
  },
  {
    id: 4,
    name: 'UrbanLife',
    logo: 'https://via.placeholder.com/200x80/4facfe/ffffff?text=UrbanLife',
    description: 'Modern lifestyle brand for urban professionals. From home decor to tech accessories.'
  },
  {
    id: 5,
    name: 'FitPro',
    logo: 'https://via.placeholder.com/200x80/00f2fe/ffffff?text=FitPro',
    description: 'Premium fitness equipment and activewear. Trusted by athletes and fitness enthusiasts.'
  },
  {
    id: 6,
    name: 'GourmetBox',
    logo: 'https://via.placeholder.com/200x80/43e97b/ffffff?text=GourmetBox',
    description: 'Artisan food products and gourmet ingredients delivered to your door monthly.'
  },
  {
    id: 7,
    name: 'BeautyLux',
    logo: 'https://via.placeholder.com/200x80/fa709a/ffffff?text=BeautyLux',
    description: 'Luxury skincare and cosmetics. Cruelty-free, dermatologist-tested products.'
  },
  {
    id: 8,
    name: 'HomeNest',
    logo: 'https://via.placeholder.com/200x80/fee140/333333?text=HomeNest',
    description: 'Transform your living space with our curated collection of furniture and home decor.'
  },
  {
    id: 9,
    name: 'PetPalace',
    logo: 'https://via.placeholder.com/200x80/30cfd0/ffffff?text=PetPalace',
    description: 'Everything your pet needs. Premium pet food, toys, and accessories for all animals.'
  },
  {
    id: 10,
    name: 'BookWorm',
    logo: 'https://via.placeholder.com/200x80/a8edea/333333?text=BookWorm',
    description: 'Curated book collections and literary subscriptions for passionate readers.'
  }
]

export default function Home() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>Brand Showcase Carousel</h1>
        <p>Interactive, accessible, and fully responsive</p>
      </div>

      <div className="demo-section">
        <h2>Featured Brands</h2>
        <BrandCarousel brands={brands} />
      </div>

      <div className="demo-section">
        <div className="customization-info">
          <h3>🎨 Customization via CSS Variables</h3>
          <ul>
            <li>--carousel-arrow-color</li>
            <li>--carousel-arrow-hover-color</li>
            <li>--carousel-arrow-bg</li>
            <li>--carousel-bg</li>
            <li>--brand-hover-scale</li>
            <li>--brand-hover-overlay</li>
            <li>--brand-card-bg</li>
            <li>--brand-card-shadow</li>
            <li>--transition-speed</li>
          </ul>
          <h3 style={{ marginTop: '1.5rem' }}>✨ Features</h3>
          <ul>
            <li>✓ Hardware-accelerated smooth scrolling</li>
            <li>✓ Keyboard navigation (Tab, Enter, Arrow keys)</li>
            <li>✓ Pause on hover for better usability</li>
            <li>✓ Lazy loading for optimized performance</li>
            <li>✓ Full ARIA attributes for accessibility</li>
            <li>✓ Touch-friendly on mobile devices</li>
            <li>✓ Responsive across all screen sizes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
