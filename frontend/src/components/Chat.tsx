import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean, timestamp?: Date}>>([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [dailyFact, setDailyFact] = useState("Did you know? The Maasai people have lived in Kenya and Tanzania for over 500 years!");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const userMessage = { text: textToSend, isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, language })
      });
      const data = await response.json();
      const aiMessage = { text: data.response, isUser: false, timestamp: new Date() };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'Sorry, I encountered an error. Please try again.', isUser: false, timestamp: new Date() };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
    if (!isRecording) {
      // Start recording
      console.log('Starting voice recording...');
    } else {
      // Stop recording and process
      console.log('Stopping voice recording...');
      // Simulate voice-to-text
      setTimeout(() => {
        sendMessage("Tell me about the Great Zimbabwe");
      }, 1000);
    }
  };

  const timelineEvents = [
    { year: "3000 BCE", event: "Ancient Egypt rises", location: [31.2333, 30.0333] },
    { year: "500 CE", event: "Axum Kingdom flourishes", location: [38.7333, 14.1167] },
    { year: "1200 CE", event: "Mali Empire at its peak", location: [-8.0, 12.65] },
    { year: "1400 CE", event: "Great Zimbabwe", location: [29.9667, -20.2833] },
    { year: "1800s", event: "Colonial era begins", location: [36.8167, -1.2833] },
    { year: "1963", event: "Kenya independence", location: [36.8167, -1.2833] }
  ];

  return (
    <div className="chat-container">
      <div className="row">
        <div className="col-md-8">
          <div className="chat-card">
            <div className="chat-header">
              <h1>HISTORIA AI</h1>
              <p>Your AI-powered African history companion</p>
            </div>

            <div className="language-selector">
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="sw">Kiswahili</option>
                <option value="fr">Français</option>
                <option value="pt">Português</option>
                <option value="ar">العربية</option>
                <option value="am">አማርኛ</option>
                <option value="ha">Hausa</option>
                <option value="yo">Yorùbá</option>
                <option value="zu">isiZulu</option>
                <option value="ki">Kikuyu</option>
                <option value="lu">Luhya</option>
                <option value="luo">Luo</option>
                <option value="kam">Kamba</option>
                <option value="mer">Meru</option>
              </select>
            </div>

            <div className="daily-fact">
              {dailyFact}
            </div>

            <div className="response-area">
              {messages.length === 0 && (
                <div className="hero-banner">
                  <h2>👋 Karibu! Welcome to HISTORIA AI</h2>
                  <p>Ask me anything about Kenyan and African history! I can speak in 50+ languages.</p>
                </div>
              )}
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={message.isUser ? 'user-message' : 'ai-message'}
                >
                  {message.text}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ai-message"
                >
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    HISTORIA is thinking...
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="input-group">
              <textarea
                className="message-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about African history..."
                rows={1}
              />
              <button
                className={`voice-button ${isRecording ? 'recording' : ''}`}
                onClick={toggleVoiceRecording}
                title="Voice input"
              >
                🎤
              </button>
              <button
                className="send-button"
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="sidebar">
            <h3 className="text-center mb-4" style={{color: '#8B4513'}}>Interactive Timeline</h3>
            <div className="timeline">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className="timeline-item"
                  onClick={() => sendMessage(`Tell me about ${event.event} in ${event.year}`)}
                >
                  <strong>{event.year}</strong><br />
                  {event.event}
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar mt-4">
            <h3 className="text-center mb-4" style={{color: '#8B4513'}}>African Map</h3>
            <div className="map-container" style={{background: '#F5DEB3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B4513'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '3rem', marginBottom: '10px'}}>🗺️</div>
                <p>Interactive map coming soon!</p>
                <p style={{fontSize: '0.9rem', opacity: 0.8}}>Click timeline events to explore history</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
