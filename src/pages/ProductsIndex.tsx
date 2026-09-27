import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, FileDown } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/catalog';

export const ProductsIndex = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.categorySlug === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        (product.subtitle && product.subtitle.toLowerCase().includes(q)) ||
        product.description.toLowerCase().includes(q) ||
        (product.application && product.application.toLowerCase().includes(q)) ||
        (product.modelName && product.modelName.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-bg-base min-h-screen py-12">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-text-secondary mb-3">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <span className="text-text-primary">Products Catalog</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                Complete Engineering Portfolio
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight mt-1">
                Industrial Hydraulic Products &amp; Systems
              </h1>
              <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
                Browse our complete manufacturing spectrum across 8 industrial divisions. All units are engineered, micro-honed, and pressure-certified in Chennai.
              </p>
            </div>

            {/* Catalog Download Quick Link */}
            <a
              href="/catalog-dhanasree-hydraulics.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-bg-surface text-xs font-mono font-semibold text-text-primary hover:border-accent transition-colors self-start lg:self-auto"
            >
              <FileDown className="w-4 h-4 text-accent" />
              <span>Download PDF Catalog</span>
            </a>
          </div>
        </div>

        {/* 8 Category Tiles Overview Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-10">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(isSelected ? 'all' : cat.slug);
                }}
                className={`p-3 rounded-xl border text-left transition-all text-xs flex flex-col justify-between min-h-[78px] ${
                  isSelected
                    ? 'bg-text-primary text-bg-base border-text-primary shadow-sm'
                    : 'bg-bg-surface text-text-primary border-border hover:border-accent'
                }`}
              >
                <span className={`font-mono text-[10px] ${isSelected ? 'text-accent' : 'text-text-secondary'}`}>
                  0{cat.displayOrder}
                </span>
                <span className="font-display font-semibold leading-tight line-clamp-2">
                  {cat.shortName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-xl bg-bg-surface border border-border mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search by model, application, or spec..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-bg-base text-sm text-text-primary focus:outline-none focus:border-accent focus:bg-bg-surface transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs text-text-secondary">
            <span>
              Showing <strong className="text-text-primary font-mono">{filteredProducts.length}</strong> systems
            </span>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-semibold text-accent hover:text-accent-hover underline font-mono"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-bg-surface border border-border">
            <p className="text-base text-text-secondary">
              No products found matching your search term &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-text-primary text-bg-base"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group rounded-2xl bg-bg-surface border border-border overflow-hidden hover:border-accent transition-all duration-300 flex flex-col justify-between shadow-sm"
              >
                <div>
                  {/* Image */}
                  <div className="aspect-[16/10] bg-bg-muted relative overflow-hidden border-b border-border">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#1B1C1F]/80 backdrop-blur-md text-white text-[11px] font-mono px-2.5 py-0.5 rounded">
                      {prod.categoryName.replace(' Services', '').replace(' Equipments', '')}
                    </div>
                    {prod.liftingCapacity && (
                      <div className="absolute bottom-3 right-3 bg-bg-surface/90 backdrop-blur-sm text-text-primary text-xs font-semibold px-2 py-0.5 rounded border border-border font-mono">
                        {prod.liftingCapacity}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
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

                    {/* Quick Specs Pill Box */}
                    <div className="mt-4 pt-3 border-t border-border/80 grid grid-cols-2 gap-2 text-xs font-mono">
                      {prod.modelName && (
                        <div>
                          <span className="text-[10px] text-text-secondary block">Model</span>
                          <span className="font-semibold text-text-primary">{prod.modelName}</span>
                        </div>
                      )}
                      {prod.warranty && (
                        <div>
                          <span className="text-[10px] text-text-secondary block">Warranty</span>
                          <span className="font-semibold text-text-primary">{prod.warranty}</span>
                        </div>
                      )}
                      {prod.operatingPressure && (
                        <div>
                          <span className="text-[10px] text-text-secondary block">Pressure</span>
                          <span className="font-semibold text-text-primary">{prod.operatingPressure}</span>
                        </div>
                      )}
                      {prod.minOrderQty && (
                        <div>
                          <span className="text-[10px] text-text-secondary block">Min Order</span>
                          <span className="font-semibold text-text-primary">{prod.minOrderQty}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <Link
                    to={`/products/${prod.categorySlug}/${prod.slug}`}
                    className="w-full py-2.5 px-4 rounded-lg bg-bg-muted hover:bg-text-primary hover:text-bg-base text-text-primary text-xs font-semibold transition-all inline-flex items-center justify-between group-hover:bg-text-primary group-hover:text-bg-base"
                  >
                    <span>Inspect Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
