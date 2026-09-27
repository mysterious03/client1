import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitInquiry } from '../lib/supabase';
import { CATEGORIES } from '../data/catalog';
import type { InquiryFormData } from '../types';

interface InquiryFormProps {
  defaultProductInterest?: string;
  className?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  defaultProductInterest = '',
  className = '',
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    productInterest: defaultProductInterest || 'Hydraulic Cylinders',
    capacityRequirement: '',
    message: '',
  });

  useEffect(() => {
    const prefill = sessionStorage.getItem('dhanasree_rfq_prefill');
    if (prefill) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message
          ? `${prev.message}\n\n[Engineering Spec Attached]: ${prefill}`
          : `[Engineering Spec Attached]: ${prefill}`,
      }));
      sessionStorage.removeItem('dhanasree_rfq_prefill');
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = await submitInquiry(formData);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.error || 'Failed to submit inquiry. Please try again or call us directly.');
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className={`p-8 rounded-2xl bg-bg-surface border border-border text-center ${className}`}>
        <div className="w-14 h-14 rounded-full bg-success/10 text-success mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-text-primary">
          Inquiry Successfully Logged
        </h3>
        <p className="mt-2 text-sm text-text-secondary max-w-md mx-auto">
          Thank you, <strong className="text-text-primary">{formData.fullName}</strong>. Our industrial engineering team at Melayanambakkam, Chennai will evaluate your specifications and respond with a formal commercial quote within 24 hours.
        </p>
        <div className="mt-6 p-4 rounded-xl bg-bg-muted text-xs text-text-secondary font-mono inline-block">
          Direct Plant Hotline: +91 98406 12674 • Padi &amp; Melayanambakkam Units
        </div>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: '',
                companyName: '',
                email: '',
                phone: '',
                productInterest: 'Hydraulic Cylinders',
                capacityRequirement: '',
                message: '',
              });
            }}
            className="text-xs font-semibold text-accent hover:text-accent-hover underline"
          >
            Submit another technical RFQ
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border shadow-sm space-y-5 ${className}`}
    >
      <div>
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
          Request For Quotation (RFQ)
        </span>
        <h3 className="font-display text-2xl font-semibold text-text-primary mt-1">
          Technical Specification &amp; Inquiry Form
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Provide your equipment parameters. Our technical design engineers will verify feasibility and dispatch a formal proposal.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-xs font-mono text-text-secondary mb-1">
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            required
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. S. Rajendran"
            className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg-base text-text-primary text-sm focus:outline-none focus:border-accent focus:bg-bg-surface transition-colors"
          />
        </div>

        <div>
          <label htmlFor="companyName" className="block text-xs font-mono text-text-secondary mb-1">
            Company / Plant Name *
          </label>
          <input
            id="companyName"
            type="text"
            required
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. TVS Motor Manufacturing Unit"
            className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg-base text-text-primary text-sm focus:outline-none focus:border-accent focus:bg-bg-surface transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-mono text-text-secondary mb-1">
            Corporate Email *
          </label>
          <input
            id="email"
            type="email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="procurement@company.com"
            className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg-base text-text-primary text-sm focus:outline-none focus:border-accent focus:bg-bg-surface transition-colors"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-mono text-text-secondary mb-1">
            Phone / Mobile Number *
          </label>
          <input
            id="phone"
            type="tel"
            required
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98400 00000"
            className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg-base text-text-primary text-sm focus:outline-none focus:border-accent focus:bg-bg-surface transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="productInterest" className="block text-xs font-mono text-text-secondary mb-1">
            Product Category Interest
          </label>
          <select
            id="productInterest"
            name="productInterest"
            value={formData.productInterest}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg-base text-text-primary text-sm focus:outline-none focus:border-accent focus:bg-bg-surface transition-colors"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
            <option value="Custom Engineering System">Custom Hydraulic Machinery</option>
            <option value="AMC & Servicing">AMC &amp; Hydraulic Servicing</option>
          </select>
        </div>

        <div>
          <label htmlFor="capacityRequirement" className="block text-xs font-mono text-text-secondary mb-1">
            Required Tonnage / Pressure Envelope
          </label>
          <input
            id="capacityRequirement"
            type="text"
            name="capacityRequirement"
            value={formData.capacityRequirement}
            onChange={handleChange}
            placeholder="e.g. 50 Tons / 250 Bar / 15,000 kg"
            className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg-base text-text-primary text-sm focus:outline-none focus:border-accent focus:bg-bg-surface transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-mono text-text-secondary mb-1">
          Technical Specifications / Project Details *
        </label>
        <textarea
          id="message"
          required
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please provide stroke length, bore diameter, operating medium, mounting orientation, cycle rate, or delivery timeframe requirements..."
          className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-bg-base text-text-primary text-sm focus:outline-none focus:border-accent focus:bg-bg-surface transition-colors resize-y"
        />
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="text-[11px] text-text-secondary">
          Submissions are encrypted and stored in our Chennai engineering portal.
        </span>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-text-primary text-bg-base font-semibold text-sm hover:bg-accent disabled:opacity-50 transition-colors inline-flex items-center justify-center gap-2 shadow-sm"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Logging Request...
            </>
          ) : (
            <>
              Submit RFQ To Plant <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
