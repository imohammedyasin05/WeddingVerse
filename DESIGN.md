# WeddingVerse — Design Document

## Objective

This document outlines the visual identity and structural layout for the WeddingVerse platform. The design is optimized for React and Tailwind CSS, following a modern, elegant, and premium aesthetic.

## 1. Color Palette

The color palette reflects a romantic, luxurious, and clean mood.

| Usage | Color Name | Hex Code | Tailwind Custom Class |
|---|---|---|---|
| **Primary** | Champagne Gold | `#D4AF37` | `bg-gold`, `text-gold` |
| **Secondary** | Dusty Rose | `#C08A8A` | `bg-rose`, `text-rose` |
| **Background (Main)** | Pearl White | `#FAFAFA` | `bg-pearl` |
| **Background (Cards)**| Pure White | `#FFFFFF` | `bg-white` |
| **Text (Primary)** | Charcoal Black | `#2C2C2C` | `text-charcoal` |
| **Text (Secondary)** | Slate Gray | `#6B7280` | `text-slate` |
| **Borders/Dividers** | Soft Silver | `#E5E7EB` | `border-silver` |
| **Success / Valid** | Sage Green | `#7A9A8A` | `text-sage` |
| **Error / Alert** | Deep Crimson | `#9A3E3E` | `text-crimson` |

## 2. Typography

We will use Google Fonts. The typography must feel sophisticated but highly readable.

**Primary Font (Headings):** `Playfair Display` (Serif - elegant, premium)
**Secondary Font (Body/UI):** `Inter` or `Lato` (Sans-serif - clean, modern, legible)

### Font Sizes & Weights (Tailwind Base)
- **H1 (Hero Title):** `6xl` (60px), `font-bold`, `font-playfair`
- **H2 (Section Title):** `4xl` (36px), `font-semibold`, `font-playfair`
- **H3 (Card Title):** `2xl` (24px), `font-medium`, `font-playfair`
- **Body Large:** `lg` (18px), `font-normal`, `font-inter`
- **Body Regular:** `base` (16px), `font-light`, `font-inter`
- **Small Text (Labels/Tags):** `sm` (14px), `font-medium`, `font-inter`, `tracking-wide`

## 3. Layout Structure

- **Max Width:** The main container will max out at `max-w-7xl` (`1280px`) with `mx-auto` for centering to ensure the design doesn't stretch too far on ultrawide monitors.
- **Grid System:** A classic 12-column grid (`grid-cols-12`).
- **Spacing Scale:** Standard Tailwind spacing (`gap-4`, `gap-8`, `p-6`, `my-12`, `my-24` for large section breaks). Root padding of `px-4 sm:px-6 lg:px-8` on outer containers.
- **Border Radius:** Subtle rounding. `rounded-lg` (8px) for cards, `rounded-full` for avatars and primary pill buttons. No sharp corners (`rounded-none`).
- **Shadows:** Soft, diffused shadows for a premium floating effect: `shadow-sm` for standard cards, `shadow-lg` on hover.

## 4. UI Components

### 4.1 Navbar
- **State:** Sticky/Fixed at the top (`sticky top-0 z-50`).
- **Background:** White with a very subtle bottom border or glassmorphism effect (`bg-white/90 backdrop-blur-md`).
- **Elements:** 
  - Left: Logo (Playfair Display, bold, text-charcoal).
  - Center/Right: Navigation links (`text-sm font-medium hover:text-gold transition-colors`).
  - Far Right: "Log in" (text link) and "Sign Up" (Primary Button).

### 4.2 Hero Section
- **Background:** High-quality, romantic wedding image covering the full section, overlayed with a dark gradient (`bg-black/40`) to ensure text readability.
- **Content Center:** 
  - H1 Title: "Find the Perfect Vendors for Your Perfect Day" (White text).
  - Subtitle: "Discover top-rated photographers, venues, planners, and more."
- **Action:** A clean, horizontal search bar (input for category/location) embedded directly in the hero with a primary search button.

### 4.3 Vendor Cards
- **Container:** `bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border border-silver`.
- **Image Area:** Fixed height (`h-48`), `object-cover`, with a rounded top edge.
- **Body:** `p-4`. Vendor name (H3), category badge (`bg-pearl text-slate`), location icon + text, rating stars (Gold), and price indicator ($$).
- **Action:** Entire card is clickable to routing, but bottom features a subtle "View Profile" arrow or text.

### 4.4 Buttons
- **Primary:** `bg-gold text-white px-6 py-2 rounded-full font-medium hover:bg-yellow-600 transition-colors shadow-md`.
- **Secondary:** `bg-white text-charcoal border border-silver px-6 py-2 rounded-full font-medium hover:border-charcoal transition-colors`.
- **Text Link:** `text-gold font-medium hover:underline`.

### 4.5 Forms (Inquiries, Login)
- **Input Fields:** `bg-pearl border border-silver rounded-md px-4 py-3 text-charcoal focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold`.
- **Labels:** `text-sm font-medium text-slate mb-1 block`.
- **Spacing:** `gap-4` between form fields.

### 4.6 Dashboard Layout
- **Sidebar (Desktop):** Left side, 64px or 250px width depending on expanded state. Links: Profile, Inquiries, Saved Vendors.
- **Top Bar:** Breadcrumbs, User Avatar dropdown.
- **Main Content Area:** `bg-pearl` background, allowing white data cards to pop.

### 4.7 Footer
- **Background:** `bg-charcoal text-white`.
- **Layout:** 4 columns (Brand/About, Vendor Links, Couple Links, Contact/Socials).
- **Typography:** `text-slate` for links, `text-white` for column headers.

## 5. Page Designs

### 5.1 Home Page
1. **Hero Section:** Search and central CTA.
2. **Categories Grid:** 6 cards (Photographers, Venues, MUAs, etc.) with icon/image background.
3. **Featured Vendors:** Horizontal scroll/carousel or a 3-column grid of top-rated professionals.
4. **How It Works:** 3 text/icon blocks.
5. **Call to Action (Footer above):** "Are you a vendor? Join WeddingVerse."

### 5.2 Vendor Listing Page
- **Header:** Simple title "Photographers in Mumbai" (or "All Vendors").
- **Layout:** 
  - Left Sidebar (25% width on desktop): Filters (Category, Location, Price, Rating).
  - Main Area (75% width): Grid of Vendor Cards (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
- **Pagination:** At the bottom component.

### 5.3 Vendor Details Page
- **Header Banner:** Vendor's cover photo full width, 300px height.
- **Profile Block (Overlapping Banner):** Vendor logo/avatar, Title, Location, Rating.
- **Two-Column Layout:**
  - Left Column (Main): "About" text paragraph, "Portfolio" image grid (lightbox enabled).
  - Right Column (Sticky): "Services & Pricing" summary card, prominent "Request Inquiry" form embedded directly in the sidebar.

### 5.4 Login & Signup Page
- **Layout:** Split screen (Desktop).
  - Left Side: Beautiful wedding aesthetic illustration or photo, full bleed.
  - Right Side: Centered, clean form on plain white background.
- **Form Elements:** Email, Password, "Forgot Password" link, "Sign Up" toggle. Minimalist and distraction-free.

### 5.5 User Dashboard
- **Overview Card:** "Welcome back, [Name]".
- **Recent Inquiries Table:** Columns: Vendor, Date Sent, Status Badge (Pending - Yellow, Responded - Green).
- **Saved Favorites:** A mini horizontal list or grid of saved vendor cards.

## 6. Responsive Design Guidelines

### Mobile (Default, < 768px)
- **Grid:** All grids become `grid-cols-1` (stack vertically).
- **Navbar:** Hamburger menu replacing inline links. Search bar drops below logo.
- **Padding:** Root padding `px-4`. Typography scales down (H1 to `4xl`).
- **Vendor detail:** Sticky right column moves to the bottom or turns into a fixed bottom action bar ("Inquire Now" button hovering over content).

### Tablet (md, 768px - 1024px)
- **Grid:** `grid-cols-2` for most card layouts (Categories, Featured Vendors).
- **Listing Page:** Sidebar filters may become a top slide-down menu or modal to save horizontal space.
- **Padding:** Root padding `px-6`.

### Desktop (lg+, > 1024px)
- **Grid:** `grid-cols-3` or `4` for cards. Left sidebars are visible (Dashboard, Listing Filters).
- **Hover Effects:** Enable all `hover:` pseudo-classes for interactivity (shadows, translate-y on cards).
- **Container:** `max-w-7xl mx-auto`.
