import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch } from 'react-icons/fi';

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-ivory-sand to-white">
      {/* Semi-transparent gradient overlay to keep imagery visible but text legible */}
      <div className="absolute inset-0 bg-hero-overlay"></div>

      {/* Subtle Kenyan Textile Pattern Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D2691E' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline, Subheadline, CTAs */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1
              className="font-display font-bold text-[var(--color-text-primary)] mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', // 40px to 56px
                lineHeight: 'var(--line-height-tight)'
              }}
            >
              Discover Africa's Rich Heritage
            </h1>

            <p
              className="text-[var(--color-text-secondary)] mb-8 leading-relaxed"
              style={{
                fontSize: 'clamp(1.375rem, 3vw, 1.5rem)', // 22px to 24px
                lineHeight: 'var(--line-height-relaxed)'
              }}
            >
              Journey through time with AI-powered storytelling and immersive experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/chat"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--color-terracotta)] to-[var(--color-clay)] text-white font-semibold rounded-full hover:opacity-90 transition-opacity duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                style={{ transition: 'var(--transition-normal)' }}
              >
                Start Exploring
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                to="/demo"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[var(--color-terracotta)] text-[var(--color-terracotta)] font-semibold rounded-full hover:bg-[var(--color-terracotta)] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                style={{ transition: 'var(--transition-normal)' }}
              >
                Try Demo
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Illustration and Overlayed Search */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            {/* Stylized Illustration of African Storyteller */}
            <div className="relative w-full max-w-md lg:max-w-lg">
              <svg
                viewBox="0 0 400 500"
                className="w-full h-auto drop-shadow-2xl"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Circle */}
                <circle cx="200" cy="250" r="180" fill="url(#storytellerBg)" />

                {/* Storyteller Figure */}
                <g transform="translate(150, 200)">
                  {/* Head */}
                  <circle cx="50" cy="30" r="25" fill="#8B4513" />
                  {/* Eyes */}
                  <circle cx="45" cy="25" r="2" fill="#000" />
                  <circle cx="55" cy="25" r="2" fill="#000" />
                  {/* Mouth */}
                  <path d="M45 35 Q50 40 55 35" stroke="#000" strokeWidth="2" fill="none" />

                  {/* Body */}
                  <rect x="35" y="55" width="30" height="40" fill="#D2691E" rx="5" />

                  {/* Arms */}
                  <rect x="20" y="60" width="15" height="25" fill="#A0522D" rx="7" />
                  <rect x="65" y="60" width="15" height="25" fill="#A0522D" rx="7" />

                  {/* Hands holding a book or scroll */}
                  <rect x="15" y="80" width="10" height="15" fill="#8B4513" rx="2" />
                  <rect x="75" y="80" width="10" height="15" fill="#8B4513" rx="2" />

                  {/* Book/Scroll */}
                  <rect x="25" y="85" width="50" height="8" fill="#FFD700" rx="2" />
                  <line x1="30" y1="89" x2="70" y2="89" stroke="#000" strokeWidth="1" />
                  <line x1="30" y1="91" x2="70" y2="91" stroke="#000" strokeWidth="1" />
                </g>

                {/* Decorative Elements */}
                <circle cx="100" cy="100" r="8" fill="#FFD700" opacity="0.7" />
                <circle cx="300" cy="150" r="6" fill="#D2691E" opacity="0.5" />
                <circle cx="80" cy="400" r="10" fill="#A0522D" opacity="0.6" />

                {/* Gradient Definition */}
                <defs>
                  <radialGradient id="storytellerBg" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F5F5DC" />
                    <stop offset="100%" stopColor="#D2691E" stopOpacity="0.3" />
                  </radialGradient>
                </defs>
              </svg>

              {/* Overlayed Search Input */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-4/5 lg:w-3/4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search African history..."
                    className="w-full px-6 py-4 pr-12 rounded-full border-2 border-white/80 bg-white/90 backdrop-blur-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta)] focus:border-transparent shadow-lg"
                    style={{
                      fontSize: 'var(--font-size-body)',
                      boxShadow: 'var(--shadow-medium)'
                    }}
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-[var(--color-terracotta)] text-white rounded-full hover:bg-[var(--color-clay)] transition-colors duration-300"
                  >
                    <FiSearch className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
