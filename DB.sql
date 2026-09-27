-- Dhanasree Hydraulics & Equipments — Supabase Database Schema & Seed Data
-- Run this script in the Supabase SQL Editor to set up your tables and sample data.

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  icon TEXT,
  hero_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_slug TEXT REFERENCES categories(slug) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  featured_order INT DEFAULT 0,
  lifting_capacity TEXT,
  operating_pressure TEXT,
  warranty TEXT,
  model_name TEXT,
  function_type TEXT,
  min_order_qty TEXT,
  application TEXT,
  specs JSONB DEFAULT '{}'::jsonb,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Clients / Sponsors Table
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Automotive & Industrial',
  logo_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  product_interest TEXT,
  capacity_requirement TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Read policies for public access
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to clients" ON clients FOR SELECT USING (true);

-- Insert policy for public inquiry submissions
CREATE POLICY "Allow public insert into inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- ==========================================================
-- SEED DATA: Categories
-- ==========================================================
INSERT INTO categories (slug, name, short_name, description, display_order, icon, hero_image)
VALUES
  ('hydraulic-cylinders', 'Hydraulic Cylinder Services', 'Cylinders', 'High-tonnage, heavy-duty, telescopic, and custom double-acting hydraulic cylinders built with precision micro-honed tubes and hard chrome-plated rods for high-pressure industrial applications.', 1, 'cylinder', '/images/products/cylinders-hero.jpg'),
  ('power-packs', 'Hydraulic Power Pack Services', 'Power Packs', 'Custom-engineered standard, mini, compact, diesel-driven, and SPM hydraulic power units operating at pressures up to 350 bar with integrated multi-station manifold blocks.', 2, 'cpu', '/images/products/powerpack-hero.jpg'),
  ('material-handling', 'Material Handling Equipments', 'Material Handling', 'Heavy-duty industrial dock levelers, hydraulic manual & semi-electric stackers, precision hydraulic toe jacks, trolley jacks, and pressure accumulators.', 3, 'box', '/images/products/handling-hero.jpg'),
  ('hydraulic-lifts', 'Hydraulic Lift Services', 'Lifts', 'Commercial passenger lifts, outdoor capsule lifts, hospital stretcher lifts, custom architectural glass lifts, and heavy industrial freight lifts.', 4, 'building', '/images/products/lifts-hero.jpg'),
  ('hydraulic-presses', 'Hydraulic Press Services', 'Presses', 'Precision hydraulic workshop presses, four-column presses, C-frame presses, deep drawing presses, coir & bailing presses, and rubber moulding presses.', 5, 'wrench', '/images/products/press-hero.jpg'),
  ('hydraulic-pumps', 'Hydraulic Pumps', 'Pumps', 'High-efficiency hydraulic gear pumps, axial/radial piston pumps, and variable displacement vane pumps engineered for continuous duty and minimal heat generation.', 6, 'gauge', '/images/products/pumps-hero.jpg'),
  ('hydraulic-conveyors', 'Hydraulic Conveyor Systems', 'Conveyors', 'Automated industrial roller conveyors, heavy-duty belt conveyors, and integrated recycling compaction and sorting transfer conveyor lines.', 7, 'move', '/images/products/conveyor-hero.jpg'),
  ('scissor-lifts', 'Scissor Lift Services', 'Scissor Lifts', 'Industrial hydraulic car parking lifts, heavy cargo lifts, manual and mobile scissor work platforms, two-wheeler maintenance ramps, and vehicle tail lifts.', 8, 'truck', '/images/products/scissor-hero.jpg')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_name = EXCLUDED.short_name,
  description = EXCLUDED.description;

-- ==========================================================
-- SEED DATA: Clients
-- ==========================================================
INSERT INTO clients (name, category, display_order)
VALUES
  ('Ford', 'Automotive OEM', 1),
  ('Samsung Electronics', 'Consumer Electronics & Precision', 2),
  ('TVS', 'Automotive & 2-Wheeler', 3),
  ('Apollo Tyres', 'Tyre & Rubber Manufacturing', 4),
  ('Saint-Gobain', 'Glass & Heavy Industrial', 5),
  ('MRF', 'Tyre & Manufacturing', 6),
  ('Toshiba', 'Industrial Equipment & Energy', 7),
  ('Polyplex', 'Polymer & Film Solutions', 8),
  ('Motherson', 'Automotive Systems', 9),
  ('Savera', 'Hospitality & Commercial Infrastructure', 10),
  ('Rane', 'Steering & Suspension Systems', 11),
  ('Lamasat', 'International Turnkey Solutions', 12),
  ('SRF', 'Technical Textiles & Chemicals', 13),
  ('Saritha Infra & Geostructures', 'Infrastructure & Construction', 14),
  ('VKC', 'Footwear & Polymers', 15),
  ('Akash Cable Corporation', 'Cable & Electrical Equipment', 16),
  ('Karthik Steel', 'Steel Fabrication & Metals', 17),
  ('L&T Construction', 'Infrastructure & Engineering EPC', 18),
  ('L&T GeoStructure', 'Foundations & Geo-Engineering', 19);
