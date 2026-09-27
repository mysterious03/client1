import { useParams, Link, Navigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Phone, ArrowUpRight, Calculator } from 'lucide-react';
import { PRODUCTS, CATEGORIES, COMPANY_INFO } from '../data/catalog';
import { InquiryForm } from '../components/InquiryForm';
import { SchematicViewer } from '../components/SchematicViewer';

export const ProductDetail = () => {
  const { categorySlug, productSlug } = useParams<{
    categorySlug: string;
    productSlug: string;
  }>();

  const product = PRODUCTS.find(
    (p) => p.categorySlug === categorySlug && p.slug === productSlug
  );

  const category = CATEGORIES.find((c) => c.slug === categorySlug);

  if (!product || !category) {
    return <Navigate to="/products" replace />;
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === categorySlug && p.slug !== productSlug
  ).slice(0, 3);

  return (
    <div className="bg-bg-base min-h-screen py-12">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-text-secondary mb-8">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-accent">Products</Link>
          <span>/</span>
          <Link to={`/products/${category.slug}`} className="hover:text-accent">{category.shortName}</Link>
          <span>/</span>
          <span className="text-text-primary truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Column: Interactive Product Schematic & CAD Viewer (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <SchematicViewer
              imageSrc={product.image}
              title={product.name}
              seriesCode={`${product.modelName || 'Series Spec'} • ${product.operatingPressure || product.liftingCapacity || 'Proof 350 Bar'}`}
            />

            {/* Quality assurance guarantee card */}
            <div className="p-4 rounded-xl bg-bg-surface border border-border space-y-2 text-xs text-text-secondary">
              <div className="flex items-center gap-2 text-text-primary font-semibold font-display">
                <ShieldCheck className="w-4 h-4 text-accent" />
                Factory Proof-Pressure Certified
              </div>
              <p className="leading-relaxed">
                Hydrostatically tested to 1.5x nominal operating pressure with micro-finish rod inspection prior to crate packaging and dispatch.
              </p>
            </div>
          </div>

          {/* Right Column: Title, Specs & Key Parameters (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent mb-2">
                <span>Model Code: {product.modelName || 'Custom Configuration'}</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
                {product.name}
              </h1>
              {product.subtitle && (
                <p className="text-base text-text-secondary font-medium mt-1">
                  {product.subtitle}
                </p>
              )}
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">
              {product.description}
            </p>

            {/* Essential Parameter Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-bg-surface border border-border font-mono text-xs">
              {product.liftingCapacity && (
                <div>
                  <span className="text-[10px] text-text-secondary uppercase block">Capacity</span>
                  <span className="font-semibold text-text-primary tabular-nums">{product.liftingCapacity}</span>
                </div>
              )}
              {product.operatingPressure && (
                <div>
                  <span className="text-[10px] text-text-secondary uppercase block">Pressure</span>
                  <span className="font-semibold text-text-primary tabular-nums">{product.operatingPressure}</span>
                </div>
              )}
              {product.warranty && (
                <div>
                  <span className="text-[10px] text-text-secondary uppercase block">Warranty</span>
                  <span className="font-semibold text-text-primary">{product.warranty}</span>
                </div>
              )}
              {product.functionType && (
                <div>
                  <span className="text-[10px] text-text-secondary uppercase block">Function</span>
                  <span className="font-semibold text-text-primary">{product.functionType}</span>
                </div>
              )}
              {product.minOrderQty && (
                <div>
                  <span className="text-[10px] text-text-secondary uppercase block">Min Order Qty</span>
                  <span className="font-semibold text-text-primary">{product.minOrderQty}</span>
                </div>
              )}
              {product.application && (
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-text-secondary uppercase block">Primary Sector</span>
                  <span className="font-semibold text-text-primary truncate block">{product.application.split(',')[0]}</span>
                </div>
              )}
            </div>

            {/* Detailed Engineering Specification Table */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div>
                <h3 className="font-display font-semibold text-base text-text-primary uppercase tracking-wider mb-3">
                  Technical Parameters
                </h3>
                <div className="border border-border rounded-xl overflow-hidden bg-bg-surface">
                  <table className="w-full text-left text-xs">
                    <tbody>
                      {Object.entries(product.specs).map(([key, val], idx) => (
                        <tr
                          key={key}
                          className={`border-b border-border last:border-b-0 ${
                            idx % 2 === 0 ? 'bg-bg-surface' : 'bg-bg-muted/40'
                          }`}
                        >
                          <td className="py-2.5 px-4 font-mono font-medium text-text-secondary w-1/3 border-r border-border">
                            {key}
                          </td>
                          <td className="py-2.5 px-4 font-mono text-text-primary font-semibold tabular-nums">
                            {val}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Design Features Checklist */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-display font-semibold text-base text-text-primary uppercase tracking-wider mb-3">
                  Engineering Advantages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-secondary">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-bg-surface border border-border">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Action Button to scroll to RFQ */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="#rfq"
                className="px-6 py-3 rounded-lg bg-text-primary text-bg-base font-semibold text-sm hover:bg-accent transition-colors shadow-sm inline-flex items-center gap-2"
              >
                Request Quotation for {product.name} <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                to="/#calculator"
                className="px-4 py-3 rounded-lg border border-border bg-bg-surface text-text-primary font-semibold text-sm hover:border-accent transition-colors inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-accent" />
                Size in Calculator
              </Link>
              <a
                href={`tel:${COMPANY_INFO.contact.phone}`}
                className="px-4 py-3 rounded-lg border border-border bg-bg-surface text-text-primary font-semibold text-sm hover:border-accent transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-accent" />
                Call Engineer
              </a>
            </div>

          </div>

        </div>

        {/* Inquiry Form Section */}
        <div id="rfq" className="max-w-3xl mx-auto mb-16 pt-8 border-t border-border">
          <InquiryForm
            defaultProductInterest={`${product.name} (${product.modelName || category.shortName})`}
          />
        </div>

        {/* Related Products in this Category */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-border">
            <h3 className="font-display text-2xl font-semibold text-text-primary mb-6">
              Other Systems in {category.shortName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/products/${rel.categorySlug}/${rel.slug}`}
                  className="p-5 rounded-2xl bg-bg-surface border border-border hover:border-accent transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] bg-bg-muted rounded-xl overflow-hidden mb-3 border border-border">
                      <img src={rel.image} alt={rel.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-display font-semibold text-base text-text-primary group-hover:text-accent transition-colors">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                      {rel.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-accent font-semibold">
                    <span>View Parameters</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
