import { Link } from 'react-router-dom';
import { Phone, MapPin, Globe, ArrowUpRight, ShieldCheck, FileDown } from 'lucide-react';
import { CATEGORIES, COMPANY_INFO } from '../data/catalog';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-muted border-t border-border mt-auto">
      {/* Upper Pre-Footer Callout */}
      <div className="border-b border-border/80 py-12 bg-bg-surface">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              Engineering Assistance &amp; Procurement
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary mt-1">
              Have custom hydraulic specifications to review?
            </h3>
            <p className="text-sm text-text-secondary mt-1 max-w-xl">
              Our engineering team in Chennai designs custom cylinders, power packs, and special machines matching your duty cycle and pressure envelope.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.contact.phone}`}
              className="px-5 py-2.5 rounded-lg border border-border bg-bg-surface text-text-primary text-sm font-semibold hover:border-accent transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-accent" />
              Direct: {COMPANY_INFO.contact.phone}
            </a>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-lg bg-text-primary text-bg-base text-sm font-semibold hover:bg-accent transition-colors shadow-sm inline-flex items-center gap-2"
            >
              Request Engineering Quote <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-text-primary flex items-center justify-center text-bg-base font-display font-bold text-lg">
                DH
              </div>
              <span className="font-display font-bold text-xl text-text-primary">
                Dhanasree Hydraulics &amp; Equipments
              </span>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed max-w-md">
              {COMPANY_INFO.whoWeAre}
            </p>

            <div className="pt-2 space-y-2 text-xs text-text-secondary font-mono">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>
                  {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.landmark}, {COMPANY_INFO.address.city} – {COMPANY_INFO.address.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.contact.phone}`} className="hover:text-accent transition-colors">
                  {COMPANY_INFO.contact.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-text-primary">{COMPANY_INFO.contact.website}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Product Divisions */}
          <div>
            <h4 className="font-display font-semibold text-sm text-text-primary uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs text-text-secondary">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products/${cat.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {cat.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Systems & Services */}
          <div>
            <h4 className="font-display font-semibold text-sm text-text-primary uppercase tracking-wider mb-4">
              Systems &amp; Lifts
            </h4>
            <ul className="space-y-2.5 text-xs text-text-secondary">
              {CATEGORIES.slice(4, 8).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products/${cat.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {cat.shortName}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/products"
                  className="font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1"
                >
                  View All 8 Categories <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Compliance */}
          <div>
            <h4 className="font-display font-semibold text-sm text-text-primary uppercase tracking-wider mb-4">
              Corporate
            </h4>
            <ul className="space-y-2.5 text-xs text-text-secondary">
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">
                  About Us &amp; Facilities
                </Link>
              </li>
              <li>
                <Link to="/about#mission" className="hover:text-accent transition-colors">
                  Mission &amp; Vision
                </Link>
              </li>
              <li>
                <Link to="/clients" className="hover:text-accent transition-colors">
                  Verified Clients &amp; OEM Partners
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">
                  Plant Location &amp; RFQ
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="/catalog-dhanasree-hydraulics.pdf"
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-surface border border-border text-text-primary hover:border-accent font-mono text-[11px] font-medium transition-colors"
                >
                  <FileDown className="w-3.5 h-3.5 text-accent" /> Download PDF Catalog
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>
              Dhanasree Hydraulics &amp; Equipments. Precision B2B Industrial Manufacturer.
            </span>
          </div>
          <div className="font-mono text-[11px]">
            &copy; {new Date().getFullYear()} Dhanasree Hydraulics. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
