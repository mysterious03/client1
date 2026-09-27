import { Link } from 'react-router-dom';
import { ArrowRight, Layers, ShieldCheck } from 'lucide-react';
import { DepthCarousel } from './DepthCarousel';
import type { DepthCarouselItem } from './DepthCarousel';
import { PRODUCTS, CATEGORIES } from '../data/catalog';

export const ProductGallery: React.FC = () => {
  // 1. Featured Products for DepthCarousel
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);

  const carouselItems: DepthCarouselItem[] = featuredProducts.map((p) => ({
    id: p.id,
    title: p.name,
    subtitle: p.subtitle,
    category: p.categoryName.replace(' Services', '').replace(' Equipments', ''),
    image: p.image,
    link: `/products/${p.categorySlug}/${p.slug}`,
    specBadge: p.operatingPressure || p.liftingCapacity || 'Precision Spec',
    capacity: p.liftingCapacity,
  }));

  // Top 4 categories for smaller bento tiles
  const bentoCategories = [
    CATEGORIES.find((c) => c.slug === 'hydraulic-cylinders')!,
    CATEGORIES.find((c) => c.slug === 'power-packs')!,
    CATEGORIES.find((c) => c.slug === 'material-handling')!,
    CATEGORIES.find((c) => c.slug === 'hydraulic-lifts')!,
  ];

  return (
    <section className="py-20 bg-bg-base border-t border-border">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent mb-3">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            Featured Engineering Systems
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-text-primary tracking-tight">
            High-Performance Hydraulic Assemblies
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            Directly manufactured to withstand continuous operating pressures up to 350 bar. 
            Engineered for severe duty cycles across automotive, heavy construction, and industrial plants.
          </p>
        </div>

        {/* 1. 3D DepthCarousel Component */}
        <div className="mb-20">
          <DepthCarousel
            items={carouselItems}
            tint="#E8ECF8"
            depth={160}
            spread={60}
            tilt={12}
            perspective={1600}
            blur={3}
            falloff={0.15}
            autoplay={false}
          />
          <div className="text-center mt-3">
            <span className="text-xs text-text-secondary font-mono">
              Drag or use controls to inspect featured systems • Click to inspect engineering specifications
            </span>
          </div>
        </div>

        {/* 2. Bento Grid: Explore the Full Catalog */}
        <div className="bg-[#E8ECF8]/60 p-6 sm:p-8 lg:p-10 rounded-2xl border border-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                Catalog Architecture
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary mt-1">
                Explore the Full Catalog
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                All 8 specialized engineering divisions, from micro-honed actuators to 500-ton hydraulic presses.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover self-start md:self-auto transition-colors"
            >
              Browse All 8 Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Large Bento Tile: spans 2 cols on lg */}
            <div className="lg:col-span-2 lg:row-span-2 bg-white rounded-2xl border border-border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-accent hover:shadow-xl hover:shadow-[#7B2CF9]/10 group shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1 rounded bg-[#E8ECF8] text-text-primary border border-thistle/70">
                    <Layers className="w-3.5 h-3.5 text-accent" /> Complete Industrial Portfolio
                  </span>
                  <span className="text-xs font-mono text-text-secondary">
                    8 Divisions • 70+ Systems
                  </span>
                </div>

                <h4 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary leading-tight">
                  Precision Hydraulic Engineering &amp; Custom Equipment
                </h4>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                  Every unit is manufactured using precision CNC micro-honing, certified alloy steel, and hydrostatic pressure testing to meet stringent MNC tier-1 quality standards.
                </p>

                {/* Micro engineering spec badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
                  <div className="p-3 bg-[#FBFCFF] rounded-xl border border-border">
                    <span className="block text-xs text-text-secondary">Max Pressure</span>
                    <span className="font-mono text-sm font-semibold text-text-primary">350 Bar</span>
                  </div>
                  <div className="p-3 bg-[#FBFCFF] rounded-xl border border-border">
                    <span className="block text-xs text-text-secondary">Press Capacity</span>
                    <span className="font-mono text-sm font-semibold text-text-primary">500 Tons</span>
                  </div>
                  <div className="p-3 bg-[#FBFCFF] rounded-xl border border-border col-span-2 sm:col-span-1">
                    <span className="block text-xs text-text-secondary">Warranty</span>
                    <span className="font-mono text-sm font-semibold text-text-primary">12 Mo Base</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>ISO-aligned QA hydrostatic certified</span>
                </div>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7B2CF9] to-[#651AE6] text-white font-semibold text-sm hover:shadow-md hover:shadow-[#7B2CF9]/30 transition-all shadow-sm"
                >
                  View Full Catalog <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 4 Smaller Bento Tiles (1x1) */}
            {bentoCategories.map((category) => (
              <Link
                key={category.id}
                to={`/products/${category.slug}`}
                className="bg-bg-surface rounded-2xl border border-border p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:border-accent group shadow-sm"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-bg-muted mb-4 border border-border relative">
                  <img
                    src={category.heroImage}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-bg-surface/90 backdrop-blur-sm text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-border text-text-primary">
                    {category.productCount} models
                  </div>
                </div>

                <div>
                  <h4 className="font-display font-semibold text-lg text-text-primary group-hover:text-accent transition-colors">
                    {category.shortName}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between text-xs font-medium text-accent">
                  <span>Explore Series</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* Quick links to remaining 4 categories */}
          <div className="mt-6 pt-6 border-t border-border/70 flex flex-wrap items-center justify-between gap-3 text-xs text-text-secondary">
            <span className="font-mono uppercase tracking-wider text-text-primary font-medium">
              Also specialized in:
            </span>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Link to="/products/hydraulic-presses" className="hover:text-accent transition-colors font-medium">
                • Hydraulic Presses
              </Link>
              <Link to="/products/hydraulic-pumps" className="hover:text-accent transition-colors font-medium">
                • Hydraulic Pumps
              </Link>
              <Link to="/products/hydraulic-conveyors" className="hover:text-accent transition-colors font-medium">
                • Hydraulic Conveyors
              </Link>
              <Link to="/products/scissor-lifts" className="hover:text-accent transition-colors font-medium">
                • Scissor Lift Services
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
