import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ShieldCheck, Gauge, Wrench, Factory, CheckCircle, Cpu, ChevronRight } from 'lucide-react';
import { ProductGallery } from '../components/ProductGallery';
import { ClientLogoWall } from '../components/ClientLogoWall';
import { COMPANY_INFO } from '../data/catalog';

export const Home = () => {
  const industries = [
    {
      title: 'Automotive & Commercial Vehicles',
      desc: 'High-cycle hydraulic cylinders and robotic clamping power units for stamping and chassis assembly lines.',
      tag: 'Ford, TVS, Motherson',
    },
    {
      title: 'Infrastructure & Heavy Earthmoving',
      desc: 'Severe-duty hydraulic rams, piling equipment cylinders, and high-tonnage ground engineering hydraulics.',
      tag: 'L&T GeoStructure, Saritha Infra',
    },
    {
      title: 'Tyre & Polymer Processing',
      desc: 'Continuous vulcanizing press systems, bladder cylinders, and high-temperature hydraulic manifold circuits.',
      tag: 'MRF, Apollo Tyres, Polyplex',
    },
    {
      title: 'Warehousing & Freight Logistics',
      desc: 'Automatic hydraulic dock levelers, heavy freight cargo lifts, scissor work platforms, and electric stackers.',
      tag: 'Heavy Material Logistics',
    },
    {
      title: 'Precision Glass & Steel Manufacturing',
      desc: 'Rigid four-column workshop presses, shearing presses, and motorized heavy billet roller conveyors.',
      tag: 'Saint-Gobain, Karthik Steel',
    },
    {
      title: 'Commercial & Architectural Infrastructure',
      desc: 'Panoramic capsule lifts, silent hydraulic passenger elevators, and multi-deck car parking lifts.',
      tag: 'Commercial Buildings & Hospitals',
    },
  ];

  return (
    <div className="bg-bg-base">
      
      {/* 1. Asymmetric MNC Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-border overflow-hidden">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Copy Left (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-surface border border-border text-xs font-mono font-medium text-text-secondary">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                <span>MNC-Tier Industrial Hydraulic Supplier • Chennai, India</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-[1.08]">
                Precision Hydraulic Systems &amp; Heavy Industrial Machinery.
              </h1>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
                Dhanasree Hydraulics manufactures and supplies complete engineering systems, high-pressure hydraulic cylinders, custom power packs, and material handling equipment engineered to the highest industrial specifications.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-lg bg-text-primary text-bg-base font-semibold text-sm hover:bg-accent transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  Explore Product Portfolio <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-lg bg-bg-surface border border-border text-text-primary font-semibold text-sm hover:border-accent transition-colors inline-flex items-center gap-2"
                >
                  Request Plant RFQ <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Engineering Stats Row */}
              <div className="pt-8 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-6">
                {COMPANY_INFO.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="font-display font-bold text-xl sm:text-2xl text-text-primary tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs text-text-secondary mt-0.5 leading-snug">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Image Right (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-bg-surface border border-border p-3 shadow-md">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-bg-muted relative">
                  <img
                    src="/images/products/cylinder.jpg"
                    alt="Precision Hydraulic Cylinder Engineering"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#1B1C1F]/80 backdrop-blur-md text-white text-xs font-mono px-3 py-1 rounded">
                    Series HD-250 • Hydrostatic 350 Bar
                  </div>
                </div>

                <div className="p-4 bg-bg-surface rounded-xl mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-text-secondary uppercase">
                      Current Manufacturing Focus
                    </span>
                    <div className="font-display font-semibold text-sm text-text-primary">
                      Telescopic &amp; Double-Acting Cylinders
                    </div>
                  </div>
                  <Link
                    to="/products/hydraulic-cylinders"
                    className="p-2 rounded-lg bg-bg-muted text-accent hover:text-accent-hover hover:bg-bg-base transition-colors"
                    aria-label="View hydraulic cylinders"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Mission Statement Strip */}
      <section className="py-8 bg-bg-muted/60 border-b border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-bg-surface border border-border text-accent">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-text-secondary">
                  Our Corporate Mission
                </span>
                <p className="text-sm font-medium text-text-primary">
                  &ldquo;To provide total customer satisfaction through quality products and services at competitive costs.&rdquo;
                </p>
              </div>
            </div>
            <Link
              to="/about"
              className="text-xs font-mono font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1 self-start md:self-auto"
            >
              Read Quality Manifesto <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Featured 3D Product Gallery & Bento Catalog */}
      <ProductGallery />

      {/* 4. Industries Served Section */}
      <section className="py-20 bg-bg-surface border-t border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              Operational Footprint
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight mt-1">
              Engineered For High-Demanding Industrial Sectors
            </h2>
            <p className="text-sm sm:text-base text-text-secondary mt-2">
              Our hydraulic cylinders, power packs, and custom machinery operate in 24/7 continuous duty cycles in critical facilities across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-bg-base border border-border hover:border-accent transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-medium text-accent mb-2">
                    Sector 0{i + 1}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-text-primary">
                    {ind.title}
                  </h3>
                  <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-text-secondary">
                    Tier-1 Verification: <strong className="text-text-primary">{ind.tag}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Client Trust Wall (All 19 clients from PDF page 17) */}
      <section className="py-20 bg-bg-base border-t border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <ClientLogoWall showTitle={true} limit={15} />
          <div className="text-center mt-10">
            <Link
              to="/clients"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
            >
              View Full List of 19 Certified Client Partners <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Manufacturing Facility & Engineering Capabilities Strip */}
      <section className="py-20 bg-bg-muted/70 border-t border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                Manufacturing Infrastructure
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight">
                Padi &amp; Melayanambakkam Engineering Works
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Our twin Chennai manufacturing facilities are equipped with specialized deep-hole boring, cylinder micro-honing machines, CNC lathe machining centers, and a dedicated 400-bar hydrostatic test bench.
              </p>

              <div className="pt-2 space-y-2 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>100% individual hydrostatic pressure testing before dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Dimensional inspection conforming to ISO tolerance classes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span>Clean-room assembly environment for sensitive valve manifolds</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="px-5 py-2.5 rounded-lg bg-bg-surface border border-border text-text-primary text-sm font-semibold hover:border-accent transition-colors inline-flex items-center gap-2"
                >
                  Tour Facilities &amp; Standards <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-3">
                <div className="w-10 h-10 rounded-lg bg-bg-muted flex items-center justify-center text-accent">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-text-primary">
                  Cylinder Micro-Honing
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Precision internal bore finishing up to Ra 0.2 µm guaranteeing maximum hydraulic seal lifetime and zero bypass leakage under continuous cycling.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-3">
                <div className="w-10 h-10 rounded-lg bg-bg-muted flex items-center justify-center text-accent">
                  <Gauge className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-text-primary">
                  Hydrostatic Testing Bench
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Every fabricated cylinder and power unit is subjected to proof-pressure testing at 1.5 times the operating envelope with calibrated pressure logging.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-3">
                <div className="w-10 h-10 rounded-lg bg-bg-muted flex items-center justify-center text-accent">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-text-primary">
                  CNC Manifold Block Machining
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Integrated compact steel hydraulic manifold blocks machined on precision CNC centers to eliminate external piping vibration and oil leakage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-3">
                <div className="w-10 h-10 rounded-lg bg-bg-muted flex items-center justify-center text-accent">
                  <Factory className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-text-primary">
                  Turnkey Plant SPM Engineering
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Complete design, structural fabrication, hydraulic piping, electrical control panel wiring, and on-site commissioning across India.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Final Action Callout */}
      <section className="py-16 bg-bg-surface border-t border-border">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              Commercial Procurement
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary">
              Ready To Discuss Your Hydraulic Specifications?
            </h2>
            <p className="text-sm text-text-secondary">
              Connect directly with our Chennai application engineering team. We deliver custom design drafts, tonnage calculations, and formal commercial quotations within 24 hours.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-lg bg-text-primary text-bg-base font-semibold text-sm hover:bg-accent transition-colors shadow-sm inline-flex items-center gap-2"
              >
                Submit Technical RFQ <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${COMPANY_INFO.contact.phone}`}
                className="px-6 py-3 rounded-lg border border-border bg-bg-base text-text-primary font-semibold text-sm hover:border-accent transition-colors"
              >
                Call Plant: {COMPANY_INFO.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
