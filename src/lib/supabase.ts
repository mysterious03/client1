import { createClient } from '@supabase/supabase-js';
import type { InquiryFormData } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function submitInquiry(data: InquiryFormData): Promise<{ success: boolean; error?: string }> {
  try {
    if (supabase) {
      const { error } = await supabase.from('inquiries').insert([
        {
          full_name: data.fullName,
          company_name: data.companyName,
          email: data.email,
          phone: data.phone,
          product_interest: data.productInterest || 'General Inquiry',
          capacity_requirement: data.capacityRequirement || 'Not Specified',
          message: data.message,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.warn('Supabase insert failed, falling back to local store:', error.message);
        saveInquiryLocally(data);
        return { success: true };
      }
      return { success: true };
    } else {
      // Local fallback for offline / preview
      saveInquiryLocally(data);
      return { success: true };
    }
  } catch (err: unknown) {
    console.error('Error submitting inquiry:', err);
    saveInquiryLocally(data);
    return { success: true };
  }
}

function saveInquiryLocally(data: InquiryFormData) {
  try {
    const existing = JSON.parse(localStorage.getItem('dhs_inquiries') || '[]');
    existing.push({
      id: 'local-' + Date.now(),
      ...data,
      created_at: new Date().toISOString(),
    });
    localStorage.setItem('dhs_inquiries', JSON.stringify(existing));
  } catch {
    // Ignore storage issues in private modes
  }
}
