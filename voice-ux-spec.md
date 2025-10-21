# Voice UX Specification for HISTORIA AI

## Overview
The voice feature enables users to interact with HISTORIA AI through speech input and output, supporting multiple languages to accommodate diverse African users. This spec covers the user experience flow, technical implementation, and privacy considerations.

## User Experience Flow

### 1. Microphone Permission Flow
- **Trigger**: User clicks voice input button in chat interface.
- **Permission Request**: Browser prompts for microphone access.
- **Granted**: Proceed to recording state.
- **Denied**: Display error message: "Microphone access is required for voice input. Please enable it in your browser settings and try again."
- **Fallback**: Offer text input as alternative.

### 2. Language Selector
- **Options**: English, Kiswahili, Arabic, French, Portuguese, Zulu, Yoruba, Amharic (expandable).
- **UI**: Dropdown or toggle buttons in voice modal/sidebar.
- **Default**: English, with auto-detection based on user location if available.
- **Switching**: Language can be changed mid-conversation; STT/TTS update accordingly.

### 3. Recording Interface
- **Start Recording**: Tap-to-talk button turns red/pulsing to indicate active recording.
- **Live Transcription Overlay**: Real-time text appears as user speaks, with visual feedback (e.g., waveform animation).
- **Stop Button**: Prominent "Stop" button to end recording.
- **Timeout**: Auto-stop after 30 seconds to prevent long recordings.
- **Visual Feedback**: Microphone icon with sound waves, recording duration counter.

### 4. Playback and TTS
- **TTS Playback**: AI responses played automatically or on-demand.
- **Speed Controls**: Slider for 0.5x to 2x speed.
- **Pause/Resume**: Controls for long responses.
- **Fallback**: If TTS fails, display text with option to retry or read aloud.

## Technical Implementation

### Recommended APIs
- **Speech-to-Text (STT)**: OpenAI Whisper API
  - Supports multiple languages
  - High accuracy for historical context
  - Handles accents and dialects well
- **Text-to-Speech (TTS)**: ElevenLabs API
  - Natural-sounding voices
  - Multiple language support
  - Customizable voice styles (warm, narrative tone for history)
- **Fallback TTS**: Web Speech API (browser-native) if ElevenLabs fails

### Error Handling
- **Network Issues**: Retry API calls up to 3 times; show "Connection error, please try again."
- **API Limits**: Inform user of rate limits; suggest text input.
- **Unsupported Language**: Fallback to English with warning.
- **Audio Quality**: If audio is too quiet/loud, prompt user to adjust microphone.

### Privacy Notice Copy
"Voice data is processed securely to provide personalized responses. Audio is temporarily stored for transcription and deleted immediately after processing. We do not retain voice recordings. By using voice features, you consent to this processing. Learn more in our Privacy Policy."

## React Hook Example: useVoice()

```typescript
import { useState, useRef, useCallback } from 'react';

interface VoiceState {
  isRecording: boolean;
  isPlaying: boolean;
  transcription: string;
  error: string | null;
  language: string;
}

export const useVoice = () => {
  const [state, setState] = useState<VoiceState>({
    isRecording: false,
    isPlaying: false,
    transcription: '',
    error: null,
    language: 'en',
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const requestPermission = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setState(prev => ({ ...prev, error: null }));
      return true;
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Microphone permission denied' }));
      return false;
    }
  }, []);

  const startRecording = useCallback(async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await sendToSTT(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setState(prev => ({ ...prev, isRecording: true, error: null }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to start recording' }));
    }
  }, [requestPermission]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
      setState(prev => ({ ...prev, isRecording: false }));
    }
  }, [state.isRecording]);

  const sendToSTT = async (audioBlob: Blob) => {
    try {
      // Send to Whisper API
      const formData = new FormData();
      formData.append('file', audioBlob);
      formData.append('model', 'whisper-1');
      formData.append('language', state.language);

      const response = await fetch('/api/stt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('STT failed');

      const result = await response.json();
      setState(prev => ({ ...prev, transcription: result.text }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Transcription failed' }));
    }
  };

  const playTTS = useCallback(async (text: string) => {
    try {
      setState(prev => ({ ...prev, isPlaying: true }));
      // Call ElevenLabs API
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: state.language }),
      });

      if (!response.ok) throw new Error('TTS failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      audio.onended = () => setState(prev => ({ ...prev, isPlaying: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'TTS playback failed' }));
    }
  }, [state.language]);

  const setLanguage = useCallback((language: string) => {
    setState(prev => ({ ...prev, language }));
  }, []);

  return {
    ...state,
    startRecording,
    stopRecording,
    playTTS,
    setLanguage,
  };
};
```

## Acceptance Criteria
- Microphone permission flow handles denied permissions gracefully with clear error messages.
- Language selector updates STT/TTS in real-time without interrupting user flow.
- Recording interface provides clear visual feedback and stops reliably.
- TTS includes speed controls and handles failures by falling back to text display.
- Privacy notice is displayed before first voice use and stored in user preferences.
