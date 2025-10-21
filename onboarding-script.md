# HISTORIA AI Onboarding Script

## Overview
The 3-step onboarding process introduces new users to HISTORIA AI's core features within 30 seconds. It uses modals, permission requests, and guided tours to build understanding and engagement. Variations adapt the experience for different user types: students, educators, and casual explorers.

## Step 1: Quick Intro Modal

### Modal Design
- **Trigger**: Appears on first visit or after account creation.
- **Layout**: Centered modal with illustration, headline, subheadline, and CTA button.
- **Timing**: Auto-advance after 10 seconds or user interaction.
- **Skip Option**: "Skip Intro" link in bottom-right.

### Base Copy
**Headline**: Discover Africa's Rich Heritage with AI
**Subheadline**: Journey through time with interactive stories, maps, and AI-powered conversations about African history.
**CTA**: Get Started
**Illustration**: Stylized African storyteller with digital elements (map, chat bubbles).

### Variations

#### Student Variation
**Headline**: Learn African History Interactively
**Subheadline**: Explore timelines, chat with AI historians, and discover stories from ancient kingdoms to modern Africa.
**CTA**: Start Learning

#### Educator Variation
**Headline**: Teach African History with Engaging Tools
**Subheadline**: Use interactive maps, AI chat, and verified stories to bring African history to life in your classroom.
**CTA**: Explore Resources

#### Casual Explorer Variation
**Headline**: Explore Africa's Past at Your Own Pace
**Subheadline**: Dive into fascinating stories, browse maps, and chat with AI about Africa's rich history.
**CTA**: Begin Exploring

## Step 2: Permission Request

### Permission Flow
- **Mic Permission**: "Enable voice chat to ask questions naturally."
- **Notifications**: "Get notified about new stories and features."
- **Privacy Copy**: Displayed below each permission: "We only use this data to enhance your experience. Voice recordings are processed securely and deleted immediately. You can change permissions anytime in settings."
- **Fallback**: If denied, show "You can enable this later in settings" with link.

### Modal Copy
**Headline**: Enhance Your Experience
**Body**: To make HISTORIA AI even better, we'd like to request a few permissions. These are optional and can be changed anytime.
**Permissions List**:
- Microphone: Ask questions with your voice
- Notifications: Stay updated on new content
**CTA**: Allow Selected
**Secondary CTA**: Skip for Now

## Step 3: Guided Tour

### Tour Design
- **Overlay Tooltips**: Semi-transparent overlay with highlighted elements and speech bubbles.
- **Progress Indicator**: Dots at bottom showing 3 steps.
- **Navigation**: Next/Previous buttons, skip option.
- **Auto-Advance**: 5 seconds per step.

### Tour Steps

#### Step 1: Chat Interface
**Highlight**: Chat input area
**Tooltip Copy**:
- **Base**: "Chat with our AI historian! Ask questions about African history and get detailed, sourced answers."
- **Student**: "Ask about historical events, figures, or timelines to deepen your understanding."
- **Educator**: "Use this to generate lesson ideas or explain complex historical concepts."
- **Casual**: "Curious about something? Just type or speak your question here."

#### Step 2: Interactive Map
**Highlight**: Map component
**Tooltip Copy**:
- **Base**: "Explore historical sites and trade routes on our interactive map. Click regions for more info."
- **Student**: "See where historical events happened and how regions changed over time."
- **Educator**: "Show students geographical context for historical events and migrations."
- **Casual**: "Zoom in on places that interest you and discover their stories."

#### Step 3: Stories Section
**Highlight**: Stories feed or featured story
**Tooltip Copy**:
- **Base**: "Read verified stories from historians and community contributors."
- **Student**: "Find detailed narratives to supplement your studies."
- **Educator**: "Access ready-to-use content for lessons and discussions."
- **Casual**: "Browse fascinating tales from Africa's past."

### Completion
**Final Modal**: "You're all set! Start exploring African history."
**CTA**: "Let's Go"
**Secondary**: "Take Tour Again"

## Technical Implementation Notes
- **State Management**: Track onboarding progress in localStorage.
- **Analytics**: Track completion rates and drop-off points.
- **Accessibility**: Keyboard navigation, screen reader support for tooltips.
- **Mobile Adaptation**: Simplified tour for smaller screens.

## Acceptance Criteria
- Users complete the full onboarding in under 30 seconds (measured via analytics).
- Post-onboarding, 80% of users engage with at least one feature (chat, map, or stories).
- Variations increase feature adoption by 15% for targeted user types.
