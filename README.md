# Dhanasree Hydraulics & Equipments — Corporate Web Portal

> MNC-grade corporate web platform for **Dhanasree Hydraulics & Equipments**, a premier B2B manufacturer and supplier of precision hydraulic cylinders, custom power packs, material handling equipment, industrial lifts, presses, and pumps based in Chennai, India.

---

## 🏗️ Technology Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Routing**: React Router DOM (real multipage architecture)
- **Styling**: Tailwind CSS (custom engineering color tokens & typography)
- **Motion & 3D**: Framer Motion + GSAP (3D `DepthCarousel` component)
- **Icons**: Lucide React
- **Backend / Database**: Supabase (PostgreSQL schema in `DB.sql` with fallback local persistence)
- **Typography**: Space Grotesk (Headings & Display) + Inter (Body & Tabular Technical Specs)

---

## 📂 Sitemap & Routes

- `/` — **Home**: Asymmetric hero, mission statement strip, 3D DepthCarousel featured systems, Bento catalog entry, industries served, verified client trust wall, engineering capabilities, RFQ callouts.
- `/products` — **Products Index**: Comprehensive catalog with search, 8 category filter tabs, and technical specification cards.
- `/products/:categorySlug` — **Category Page**: Deep-dive into category specifications with direct RFQ form.
- `/products/:categorySlug/:productSlug` — **Product Detail**: Full technical parameter sheets with tabular specs, model numbers, warranty, operating pressure, and quotation requests.
- `/about` — **About Us**: Verbatim mission & vision statements, manufacturing units (Padi & Melayanambakkam, Chennai), and zero-compromise QA manifesto.
- `/clients` — **Clients & Partners**: Verified client roster of 19 industrial leaders (Ford, Samsung, TVS, Apollo Tyres, Saint-Gobain, MRF, Toshiba, L&T, etc.) with sector categorization.
- `/contact` — **Contact & RFQ**: Factory address, direct plant phone line, interactive Google Maps embed, and technical quotation inquiry form.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/santhoshkumarclg514-byte/dhanasree.git
cd dhanasree

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
npm run preview
```

---

## 🗄️ Database Setup (Supabase)

A ready-to-run schema script is available in [`DB.sql`](./DB.sql).
1. Open your [Supabase Dashboard](https://supabase.com).
2. Go to the **SQL Editor**.
3. Paste the contents of `DB.sql` and run.
4. Copy your project URL and anon public key into `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
*(Note: If Supabase credentials are not provided, the inquiry form automatically uses local storage persistence, ensuring 100% offline uptime and zero broken states).*

---

## 🏭 Manufacturing Facilities

- **Primary Works & Corporate Office**: No.489/1, Konrajkuppam, Melayanambakkam, Near Royal Club, Chennai – 600095
- **Secondary Works**: Padi, Chennai, Tamil Nadu
- **Phone**: +91 98406 12674
- **Web**: [www.dhanasreehydrauliucs.net](http://www.dhanasreehydrauliucs.net)
