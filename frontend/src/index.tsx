import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';
import './index.css';

// Add Inter font to document head
const link = document.createElement('link');
link.href = 'https://rsms.me/inter/inter.css';
link.rel = 'stylesheet';
document.head.appendChild(link);

// Set up smooth scrolling
document.documentElement.style.scrollBehavior = 'smooth';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Set theme based on user preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDark) {
  document.documentElement.classList.add('dark');
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// Log app version and environment
console.log(
  `%cHISTORIA AI %cv1.0.0%c\nA Living History Companion for Africa`,
  'background: #4f46e5; color: white; padding: 4px 8px; border-radius: 4px 0 0 4px; font-weight: bold;',
  'background: #7c3aed; color: white; padding: 4px 8px; border-radius: 0 4px 4px 0; font-weight: bold;',
  'color: #4b5563; margin-left: 8px;'
);
