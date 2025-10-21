# HISTORIA AI - Brand Style Guidelines

## 1. Brand Essence

| Element | Description |
|---------|-------------|
| **Brand Name** | HISTORIA AI |
| **Tagline** | Preserving the Past. Empowering the Future. |
| **Core Identity** | A digital griot — blending AI and African storytelling |
| **Brand Personality** | Wise, warm, human-centered, culturally intelligent, modern |
| **Tone of Voice** | Conversational, educational, emotionally resonant, inclusive |

## 2. Color Palette

### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Sunset Amber | `#D97706` | Primary CTA buttons, highlights, icons |
| Savannah Gold | `#F59E0B` | Accent and hover color |
| Deep Charcoal | `#1F2937` | Primary text, dark backgrounds |
| Ivory Sand | `#FFF8E7` | Light background alternative |

### Secondary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Terracotta Earth | `#B45309` | Section backgrounds, secondary CTAs |
| Emerald Green | `#065F46` | Success states, positive highlights |
| Royal Indigo | `#312E81` | Links, accents, shadows |
| Crimson Clay | `#7F1D1D` | Alerts, strong emotion highlights |

### Dark Mode

| Element | Color |
|---------|-------|
| Background | `#111827` |
| Primary Text | `#F3F4F6` |
| Accent | `#F59E0B` |
| Chat Bubbles | `#1E293B` and `#FBBF24` |

## 3. Typography

### Fonts
- **Headings**: Clash Display / DM Serif Display (Bold, elegant with wide letter spacing)
- **Body**: Inter / Poppins (Regular 400-500 weight)
- **Cultural Accent**: Noto Sans African / Ubuntu (for African language support)

### Size Hierarchy
- H1: 48px
- H2: 32px
- H3: 24px
- Body: 16-18px
- Small Text: 14px

## 4. Logo Guidelines

### Logo Variations
1. **Primary Logo**: Symbol + Wordmark
2. **Icon Logo**: Symbol only (for app icon / favicon)
3. **Monochrome Version**: For dark/light mode

### Usage
- Minimum clear space: 20% of logo width
- Minimum size: 24px height for digital, 0.5" for print
- Always maintain aspect ratio

## 5. UI Components

### Buttons
```jsx
<button className="bg-gradient-to-r from-amber-600 to-orange-500 hover:scale-105 
  transition-transform px-6 py-3 text-white font-semibold rounded-xl shadow-lg">
  Explore Stories
</button>
```

### Chat Bubbles
```jsx
<div className="bg-white/80 backdrop-blur-md text-gray-800 
  rounded-2xl px-4 py-2 shadow-md max-w-[70%]">
  I'm Historia — your guide through Africa's timeless stories.
</div>
```

## 6. 3D Elements & Motion

### Implementation
- Use Three.js with React Three Fiber for custom 3D elements
- Implement subtle animations with Framer Motion
- Loading states should use culturally relevant spinners

### Motion Guidelines
- Entry animations: Fade and slide up (duration: 0.3s)
- Hover states: Subtle scale (1.02-1.05)
- Transitions: Smooth easing (cubic-bezier(0.4, 0, 0.2, 1))

## 7. Photography & Imagery

### Style
- Warm, natural lighting
- Authentic representation of African cultures
- Mix of historical and contemporary imagery
- Use of negative space for text overlays

### Usage Guidelines
- Always use high-resolution images
- Maintain consistent color grading
- Add subtle grain for texture
- Use vignette effect for focus

## 8. Voice & Tone Examples

| Scenario | Example |
|----------|---------|
| Greeting | "Karibu! I'm Historia, your guide through Africa's vibrant past." |
| Information | "The Mali Empire thrived between 1235 and 1600 CE, known for its rich trade and culture." |
| Encouragement | "That's a great question — let's uncover the roots of that story together." |
| Educational | "Did you know? The city of Timbuktu housed one of the world's oldest universities." |

## 9. Implementation in Code

### Tailwind Config Snippet
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'sunset-amber': '#D97706',
        'savannah-gold': '#F59E0B',
        'deep-charcoal': '#1F2937',
        'ivory-sand': '#FFF8E7',
        'terracotta': '#B45309',
        'emerald': '#065F46',
        'royal-indigo': '#312E81',
        'crimson': '#7F1D1D'
      },
      fontFamily: {
        'display': ['Clash Display', 'DM Serif Display', 'sans-serif'],
        'body': ['Inter', 'Poppins', 'sans-serif'],
        'cultural': ['Noto Sans African', 'Ubuntu', 'sans-serif']
      }
    }
  }
}
```

### 3D Component Example
```jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const CulturalArtifact = () => (
  <Canvas>
    <ambientLight intensity={0.5} />
    <directionalLight position={[2, 2, 5]} />
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#D97706" metalness={0.5} roughness={0.2} />
    </mesh>
    <OrbitControls enableZoom={false} />
  </Canvas>
);
```

## 10. Accessibility Guidelines

### Text Contrast
- Ensure minimum contrast ratio of 4.5:1 for normal text
- 3:1 for large text (18pt+ or 14pt bold)

### Interactive Elements
- Minimum touch target: 44x44px
- Visible focus states
- Keyboard navigable components

### Alternative Text
- All images require descriptive alt text
- Decorative images should have empty alt=""
- Icons should have meaningful labels

## 11. File Naming Conventions

### Images
- `feature-{name}-{size}.{ext}` (e.g., `feature-timbuktu-large.jpg`)
- `icon-{name}.{ext}` (e.g., `icon-history.svg`)
- `logo-{variant}.{ext}` (e.g., `logo-primary.svg`)

### Components
- `{ComponentName}.tsx` (PascalCase)
- `{component-name}.module.css` (kebab-case)
- `use{Feature}Hook.ts` (camelCase for hooks)

## 12. Resources

### Fonts
- [Clash Display](https://www.1001fonts.com/clash-display-font.html)
- [Inter](https://rsms.me/inter/)
- [Noto Sans African](https://fonts.google.com/noto/specimen/Noto+Sans+Adlam)

### Icons
- [Phosphor Icons](https://phosphoricons.com/)
- [Tabler Icons](https://tabler-icons.io/)

### 3D Assets
- [Sketchfab](https://sketchfab.com/)
- [Poly Haven](https://polyhaven.com/)

---
*Last Updated: October 2025*
*© 2025 HISTORIA AI. All rights reserved.*
