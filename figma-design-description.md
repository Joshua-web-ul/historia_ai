# Figma Design Description for HISTORIA AI Landing Page Hero

## Overview
This document describes the design for the new landing page hero section of HISTORIA AI. The design features a two-column layout with an earthy color palette, subtle Kenyan textile pattern background, and modern typography. Frames are provided for desktop (1440px) and mobile (375px) variants.

## Color Palette
- Terracotta: #D2691E
- Deep Brown: #3E2723
- Clay: #A0522D
- Gold: #FFD700
- Background: #F5F5DC (Ivory Sand) to #FFFFFF (White) gradient

## Typography
- Font Family: Inter (sans-serif) for body, Playfair Display (serif) for headlines
- H1: 48-56px desktop, 40px mobile (font-weight: 700)
- H2: 24px desktop, 22px mobile (font-weight: 400)
- Body: 16px (font-weight: 400)

## Desktop Frame (1440px width)
### Layout
- Two-column grid: Left column (text + CTAs), Right column (illustration + search)
- Container: Max-width 1200px, centered
- Padding: 96px horizontal, 128px vertical

### Left Column
- Headline: "Discover Africa's Rich Heritage" (H1, deep brown #3E2723)
- Subheadline: "Journey through time with AI-powered storytelling and immersive experiences." (H2, saddle brown #8B4513)
- CTAs:
  - Primary: "Start Exploring" (terracotta to clay gradient button, white text, rounded-full, shadow)
  - Secondary: "Try Demo" (terracotta border, terracotta text, rounded-full, hover fill)

### Right Column
- Illustration: Stylized SVG of African storyteller (400x500 viewBox, earthy colors)
- Overlayed Search: Rounded input field at bottom, with search icon button
- Search placeholder: "Search African history..."

### Background
- Gradient from ivory sand to white
- Subtle Kenyan textile pattern overlay (60x60px repeating SVG, 10% opacity)

## Mobile Frame (375px width)
### Layout
- Single column stack: Text + CTAs on top, Illustration + Search below
- Container: Full width, padding 24px horizontal, 64px vertical

### Adjustments
- Headline: 40px (clamp to fit)
- Subheadline: 22px
- CTAs: Stacked vertically, full width
- Illustration: Centered, max-width 300px
- Search: Full width overlay

## Accessibility
- Contrast ratios: Text on background >= 4.5:1 (deep brown on ivory sand: ~12:1)
- Focus states: Visible rings on interactive elements
- Alt text: Provided for illustration (though SVG)

## Interactive Elements
- CTAs: Hover effects (opacity, shadow, transform)
- Search: Focus ring, submit on enter
- Animations: Fade-in from left/right on load

## Export Notes
- Export as PNG/JPG for review
- Include component variants for different states (hover, focus)
- Use auto-layout for responsive behavior

This design ensures visual prominence of CTAs, accessibility compliance, and responsive variants for desktop and mobile.
