# Analytics Events for HISTORIA AI

## Event Naming Convention
- **Format**: `category_action_descriptor` (e.g., `user_signup_completed`)
- **Categories**: user, chat, voice, story, map, error
- **Actions**: Standard verbs like click, submit, start, complete
- **Descriptors**: Specific details (e.g., `voice_start_recording`)

## Essential Events

### User Events
- `user_signup_started`: User begins signup process
- `user_signup_completed`: Successful account creation
- `user_login`: User logs in
- `user_logout`: User logs out
- `user_onboarding_completed`: User finishes onboarding tour

### Chat Events
- `chat_query_submitted`: User sends a text query
- `chat_response_received`: AI response delivered
- `chat_feedback_rated`: User rates response (1-5 stars)

### Voice Events
- `voice_permission_requested`: Mic permission prompt shown
- `voice_permission_granted`: User allows mic access
- `voice_start_recording`: Recording begins
- `voice_stop_recording`: Recording ends
- `voice_transcription_completed`: STT successful
- `voice_tts_played`: TTS audio played

### Story Events
- `story_submission_started`: User begins submission form
- `story_submission_completed`: Story uploaded successfully
- `story_viewed`: User views a story
- `story_shared`: User shares a story

### Map Events
- `map_region_clicked`: User clicks on a map region
- `map_layer_toggled`: User switches historical layers
- `map_zoom_changed`: User zooms in/out
- `map_timeline_scrubbed`: User drags timeline scrubber

### Error Events
- `error_api_failure`: API call fails (include error code)
- `error_voice_recording_failed`: Mic recording error
- `error_page_load_failed`: Page fails to load

## Recommended Stack
- **Analytics**: PostHog (open-source, privacy-focused) or Mixpanel (robust event tracking)
- **Error Monitoring**: Sentry for real-time error tracking and alerting
- **Performance**: Lighthouse CI for automated audits, Web Vitals for Core Web Vitals monitoring

## Sample Dashboard Layout

### Key Metrics
- **DAU (Daily Active Users)**: Line chart showing user engagement over time
- **Query Success Rate**: Percentage of chat queries with successful responses (target: >95%)
- **Audio Error Rate**: Percentage of voice sessions with errors (target: <1%)
- **Average Response Latency**: Average time for AI responses (target: <2s)

### Dashboard Sections
1. **User Engagement**
   - DAU trend
   - Signup conversion funnel
   - Onboarding completion rate

2. **Content Performance**
   - Most viewed stories
   - Popular map regions
   - Chat query topics (word cloud)

3. **Technical Health**
   - Response latency histogram
   - Error rate by feature
   - API uptime percentage

4. **Voice & Accessibility**
   - Voice usage rate
   - TTS playback success rate
   - Language selection distribution

## Sentry Integration Steps
1. Install Sentry SDK: `npm install @sentry/react @sentry/tracing`
2. Initialize in main app file:
   ```javascript
   import * as Sentry from '@sentry/react';
   Sentry.init({
     dsn: 'your-dsn-here',
     integrations: [new Sentry.BrowserTracing()],
     tracesSampleRate: 1.0,
   });
   ```
3. Wrap app with ErrorBoundary:
   ```javascript
   <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
     <App />
   </Sentry.ErrorBoundary>
   ```
4. Configure alerts for error rates >1% of requests.

## Acceptance Criteria
- Track all essential events with consistent naming.
- Dashboard updates in real-time with <5min delay.
- Alerts trigger for errors >1% of requests, with escalation to dev team.
