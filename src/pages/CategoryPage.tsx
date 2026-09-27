import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, ChevronLeft } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/catalog';
import { InquiryForm } from '../components/InquiryForm';

export const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const category = CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) {
    return <Navigate to="/products" replace />;
  }

  const categoryProducts = PRODUCTS.filter((p) => p.categorySlug === categorySlug);

  return (
    <div className="bg-bg-base min-h-screen py-12">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-text-secondary mb-6">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-accent">Products</Link>
          <span>/</span>
          <span className="text-text-primary">{category.shortName}</span>
        </div>

        {/* Category Hero Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-bg-surface border border-border mb-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                Specialized Industrial Division 0{category.displayOrder}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
                {category.name}
              </h1>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {category.description}
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>100% Hydrostatic Tested</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Custom Stroke &amp; Mounting</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[16/11] rounded-2xl overflow-hidden border border-border bg-bg-muted relative shadow-sm">
                <img
                  src={category.heroImage}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Products in this category */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary">
                Available Systems &amp; Configurations
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">
                Standard and custom-engineered options built to client drawing tolerances.
              </p>
            </div>
            <Link
              to="/products"
              className="text-xs font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1 font-mono"
            >
              <ChevronLeft className="w-4 h-4" /> All Categories
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((prod) => (
              <div
                key={prod.id}
                className="group rounded-2xl bg-bg-surface border border-border overflow-hidden hover:border-accent transition-all duration-300 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="aspect-[16/10] bg-bg-muted relative overflow-hidden border-b border-border">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {prod.liftingCapacity && (
                      <div className="absolute bottom-3 right-3 bg-bg-surface/90 backdrop-blur-sm text-text-primary text-xs font-semibold px-2 py-0.5 rounded border border-border font-mono">
                        {prod.liftingCapacity}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-display font-semibold text-xl text-text-primary group-hover:text-accent transition-colors leading-snug">
                      {prod.name}
                    </h3>

                    {prod.subtitle && (
                      <p className="text-xs text-text-secondary mt-1 font-medium">
                        {prod.subtitle}
                      </p>
                    )}

                    <p className="text-xs text-text-secondary mt-2.5 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Features list */}
                    {prod.features && prod.features.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-border/80 space-y-1.5 text-xs text-text-secondary">
                        {prod.features.slice(0, 2).map((feat, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-accent mt-0.5">•</span>
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/products/${prod.categorySlug}/${prod.slug}`}
                    className="w-full py-2.5 px-4 rounded-lg bg-bg-muted hover:bg-text-primary hover:text-bg-base text-text-primary text-xs font-semibold transition-all inline-flex items-center justify-between group-hover:bg-text-primary group-hover:text-bg-base"
                  >
                    <span>Inspect Full Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category RFQ Form Section */}
        <div className="max-w-3xl mx-auto">
          <InquiryForm defaultProductInterest={category.name} />
        </div>

      </div>
    </div>
  );
};
