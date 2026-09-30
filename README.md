# Dhanasree Hydraulics & Equipments

Official multi-page website and engineering specification portal for **Dhanasree Hydraulics & Equipments** (Chennai, India).

## 🚀 Interactive UI & Animation Components

### 1. 3D Elastic `<CardSwap />` Component (Engineering Capability)
- **Location**: Home Page (`#capabilities`)
- **Interactive Mechanics**: 3D perspective stacked card stage (`perspective: 900px`, `force3D: true`) with elastic GSAP position swapping (`elastic.out(0.6, 0.9)`).
- **Features**: Automatic card cycle timer with smooth drop-and-promote transitions, pause on hover (`pauseOnHover: true`), and click-to-swap interaction across all 4 capability verticals (Presses, Scissor Lifts, Material Handling, and Conveyors).

### 2. Direction-Aware `<FlowingMenu />` Component (Our Process)
- **Location**: Home Page (`#process`)
- **Interactive Mechanics**: Direction-aware cursor edge detection (calculating euclidean distance to determine top/bottom entrance and departure).
- **Features**: GSAP `expo.out` sliding reveal of multi-speed infinite marquees with rounded industrial imagery capsules across the 4-step engineering lifecycle.

### 3. Expanding `<AccordionGallery />` (Industries We Support)
- **Location**: Home Page (`#industries`)
- **Interactive Mechanics**: Proportional horizontal accordion expansion (`expandRatio: 0.52`, `defaultIndex: 2`).
- **Features**: Hover-triggered expanding sector dossiers with spring easing `cubic-bezier(0.22, 1, 0.36, 1)`, vertical rotated spine typography when collapsed, and auto-settling behavior.

### 4. Text Type Cursor Engine `<TextType />`
- **Location**: Hero Section (`#hero`)
- **Features**: Dynamic real-time character typing and deletion sequence cycling through core engineering pillars (*Motion*, *Power*, *Force*, *Systems*).

### 5. Infinite Category Marquee
- **Location**: Products Section (`#products-overview`)
- **Features**: Continuous infinite horizontal ribbon with auto-scroll and hover pause across the complete hydraulic product line.

---

## 🎨 Architectural Color Palette

| Token | Hex | Name / Usage |
|-------|-----|--------------|
| `--c-palladian` | `#EEE9DF` | Warm architectural stone background |
| `--c-oatmeal` | `#C9C1B1` | Subtle borders, chips, and neutral accents |
| `--c-blue-fantastic` | `#2C3B4D` | Mid-tone slate and card background |
| `--c-flame` | `#FFB162` | Industrial amber/flame primary accent & hover |
| `--c-truffle` | `#A35139` | Rich rust / forged copper accent |
| `--c-abyssal` | `#1B2632` | Deep structural dark slate & primary typography |

---

## 📂 Multi-Page Architecture

1. **`index.html`** — Flagship Home with Hero Studio Photography, 3D CardSwap Capabilities, FlowingMenu Process, and AccordionGallery Sector Showroom.
2. **`products.html`** — Complete filterable catalogue with deep-dive technical specifications (Cylinders, Power Packs, Presses, Lifts, Dock Levelers, Pumps, Conveyors).
3. **`about.html`** — Manufacturing footprint, plant equipment, ISO certification, corporate ethos, and Tier-1 client pedigree.
4. **`contact.html`** — Direct Chennai plant contact, procurement inquiries, interactive RFQ modal, and WhatsApp routing.

---

## 🛠️ Technology Stack

- **Core**: HTML5 Semantic Architecture & Vanilla CSS
- **Interactivity & 3D**: Vanilla JavaScript (ES6+) & GreenSock Animation Platform (`GSAP 3.12.5`)
- **Utilities**: Tailwind CSS Utility Configuration
- **Photography**: High-resolution studio product photography with neutral backdrops and precision machined finishes.
