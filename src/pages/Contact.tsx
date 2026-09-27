import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { InquiryForm } from '../components/InquiryForm';
import { COMPANY_INFO } from '../data/catalog';

export const Contact = () => {
  return (
    <div className="bg-bg-base min-h-screen py-12">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-text-secondary mb-3">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <span className="text-text-primary">Contact Us</span>
          </div>

          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
            Direct Plant Communication
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text-primary tracking-tight mt-1">
            Contact Dhanasree Hydraulics
          </h1>
          <p className="mt-3 text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            Reach our engineering headquarters at Melayanambakkam or our works in Padi, Chennai. Submit your technical drawings and parameters for same-day evaluation.
          </p>
        </div>

        {/* Contact Information & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Column: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Plant Address Card */}
            <div className="p-6 rounded-2xl bg-bg-surface border border-border shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-bg-muted text-accent flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-text-primary">
                    Works &amp; Corporate Office
                  </h3>
                  <p className="text-xs font-mono text-text-secondary uppercase mt-0.5">
                    Chennai Manufacturing Facility
                  </p>
                </div>
              </div>

              <div className="pl-10 space-y-1 text-sm text-text-secondary leading-relaxed">
                <p className="font-medium text-text-primary">{COMPANY_INFO.name}</p>
                <p>{COMPANY_INFO.address.line1}</p>
                <p>{COMPANY_INFO.address.landmark}</p>
                <p>{COMPANY_INFO.address.city} – {COMPANY_INFO.address.pincode}, {COMPANY_INFO.address.state}</p>
              </div>

              <div className="pt-3 border-t border-border/80 pl-10">
                <div className="text-xs font-mono text-text-secondary">
                  Secondary Service Facility: <strong className="text-text-primary">Padi, Chennai</strong>
                </div>
              </div>
            </div>

            {/* Direct Phone & Website Card */}
            <div className="p-6 rounded-2xl bg-bg-surface border border-border shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-bg-muted text-accent flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-text-primary">
                    Telephone &amp; Web
                  </h3>
                  <p className="text-xs font-mono text-text-secondary uppercase mt-0.5">
                    Plant Lines
                  </p>
                </div>
              </div>

              <div className="pl-10 space-y-3 text-sm">
                <div>
                  <span className="text-xs text-text-secondary block font-mono">Direct Mobile / WhatsApp:</span>
                  <a
                    href={`tel:${COMPANY_INFO.contact.phone}`}
                    className="font-display font-bold text-xl text-text-primary hover:text-accent transition-colors"
                  >
                    +91 {COMPANY_INFO.contact.phone}
                  </a>
                </div>

                <div>
                  <span className="text-xs text-text-secondary block font-mono">Official Web Portal:</span>
                  <span className="font-mono text-sm text-text-primary font-medium">
                    {COMPANY_INFO.contact.website}
                  </span>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-2xl bg-bg-surface border border-border shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-bg-muted text-accent">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-base text-text-primary">
                    Operating Schedule
                  </h4>
                  <p className="text-xs text-text-secondary">
                    Monday to Saturday: 09:00 AM – 06:30 PM IST
                  </p>
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed pt-1">
                Emergency shutdown support and cylinder breakdown servicing available 24/7 on call for registered tier-1 client agreements.
              </p>
            </div>

          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>

        </div>

        {/* Plant Map Embed Section */}
        <div className="rounded-3xl overflow-hidden border border-border bg-bg-surface p-4 shadow-sm mb-12">
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border mb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                Facility Coordinates
              </span>
              <h3 className="font-display text-xl font-semibold text-text-primary mt-0.5">
                Melayanambakkam Plant Map
              </h3>
            </div>
            <a
              href="https://maps.google.com/?q=Melayanambakkam+Chennai+600095"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1"
            >
              Open in Google Maps <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-80 rounded-2xl overflow-hidden bg-bg-muted relative">
            <iframe
              title="Dhanasree Hydraulics Plant Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.698711462088!2d80.1415277871582!3d13.072213799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5263d91cf3e617%3A0xe54d31846b0a8801!2sMel%20Ayanambakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};
