# Accessibility Checklist & Localization Strategy for HISTORIA AI

## Accessibility Checklist (WCAG AA Compliance)

### Keyboard Navigation
- [ ] All interactive elements (buttons, links, inputs) accessible via Tab key
- [ ] Logical tab order matches visual layout
- [ ] Custom components (chat, map) support keyboard controls (arrow keys, Enter)
- [ ] Skip links provided for main content areas

### ARIA Labels & Roles
- [ ] All images have descriptive alt text
- [ ] Form inputs have associated labels or aria-label attributes
- [ ] Dynamic content (chat responses, map popups) announced to screen readers
- [ ] Custom UI components use appropriate ARIA roles (e.g., role="dialog" for modals)

### Color & Contrast
- [ ] Text meets 4.5:1 contrast ratio against background (7:1 for large text)
- [ ] Color not used as sole differentiator (e.g., error states have icons + text)
- [ ] Focus indicators visible with 3:1 contrast ratio
- [ ] Dark mode option available for user preference

### Typography & Readability
- [ ] Base font size 16px (1rem) with responsive scaling
- [ ] Line height 1.5 minimum for body text
- [ ] Readable fonts: Inter for sans-serif, Playfair Display for serif
- [ ] Text can be resized up to 200% without loss of functionality

### Media & Multimedia
- [ ] All videos have captions and transcripts
- [ ] Audio content (TTS) has text alternatives
- [ ] Animations can be paused/disabled (prefers-reduced-motion)
- [ ] Voice controls have visual feedback and text fallbacks

### Error Handling & Feedback
- [ ] Form errors clearly described and linked to inputs
- [ ] Success/error messages announced to screen readers
- [ ] Loading states indicated (aria-busy, progress bars)
- [ ] Help text available for complex interactions

### Testing Tools
- [ ] Axe DevTools or Lighthouse Accessibility audit run on key pages
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Keyboard-only navigation testing
- [ ] Color blindness simulation testing

## Localization Strategy

### Language Files Structure (i18n JSON)
```
src/locales/
├── en/
│   ├── common.json
│   ├── chat.json
│   ├── map.json
│   └── stories.json
├── sw/
│   ├── common.json
│   ├── chat.json
│   ├── map.json
│   └── stories.json
└── ar/
    ├── common.json
    ├── chat.json
    ├── map.json
    └── stories.json
```

### Sample Language File (en/common.json)
```json
{
  "hero": {
    "headline": "Discover Africa's Rich Heritage",
    "subheadline": "Interactive AI-powered storytelling, community archives, and educational tools.",
    "cta_primary": "Start Exploring",
    "cta_secondary": "Try Demo"
  },
  "navigation": {
    "home": "Home",
    "chat": "Chat",
    "map": "Map",
    "stories": "Stories"
  },
  "accessibility": {
    "skip_to_content": "Skip to main content",
    "open_menu": "Open navigation menu",
    "close_menu": "Close navigation menu"
  }
}
```

### Date/Time Formats
- **ISO Standard**: Store dates as YYYY-MM-DDTHH:mm:ssZ
- **Localized Display**: Use Intl.DateTimeFormat for formatting
  - English: "December 12, 1963"
  - Swahili: "Desemba 12, 1963"
  - Arabic: "12 ديسمبر 1963"
- **Relative Time**: "2 hours ago", "3 days ago" using relative-time-format

### Fallback Language for Low-Resource Languages
- **Primary Fallback**: English for all untranslated strings
- **Regional Fallbacks**: French for West/Central Africa, Arabic for North Africa
- **Implementation**: i18n library with fallback chain (e.g., react-i18next)
- **Missing Translations**: Show English text with [Translate] badge for user contribution

### TTS Voice Localization
- **Voice Selection**: Map languages to appropriate TTS voices
  - English: "en-US-Neural2-D" (Google) or "alloy" (OpenAI)
  - Swahili: "sw-TZ-Standard-A" (Google) or fallback to English
  - Arabic: "ar-XA-Standard-A" (Google) or "alloy" (OpenAI)
- **Fallback Strategy**: If native voice unavailable, use English with accent-neutral voice
- **Quality Check**: Test voice clarity and cultural appropriateness
- **User Override**: Allow users to select preferred voice per language

### Implementation Steps
1. Set up i18n library (react-i18next)
2. Create base English translations
3. Implement date/time localization
4. Add language switcher in settings
5. Integrate TTS voice mapping
6. Test with native speakers for accuracy

## Acceptance Criteria
- Key pages pass Lighthouse Accessibility audit (score >90)
- Localization pipeline supports 5+ languages with <5% untranslated strings
- TTS voices match user language selection with clear audio quality
