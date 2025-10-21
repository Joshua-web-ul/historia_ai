import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  FiArrowRight as FiArrowRightIcon,
  FiCompass as FiCompassIcon,
  FiBookOpen as FiBookOpenIcon,
  FiGlobe as FiGlobeIcon,
  FiAward as FiAwardIcon,
  FiMap as FiMapIcon,
  FiUsers as FiUsersIcon,
  FiClock as FiClockIcon,
  FiMessageSquare as FiMessageSquareIcon,
  FiCheckCircle as FiCheckCircleIcon
} from 'react-icons/fi';
import Hero from './Hero';
import '../styles/tokens.css';

// Animation variants
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring' as const,
      stiffness: 100,
      damping: 15
    } 
  }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { 
      duration: 0.8, 
      ease: 'easeOut' 
    }
  }
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => (
  <motion.div
    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { 
        opacity: 1, 
        y: 0,
        transition: { 
          delay: index * 0.1, 
          duration: 0.5 
        } 
      }
    }}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sunset-amber to-savannah-gold flex items-center justify-center text-white mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-display font-semibold mb-2 text-deep-charcoal dark:text-white">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
      {description}
    </p>
  </motion.div>
);

const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <FiCompassIcon className="w-8 h-8" />,
      title: 'Interactive Maps',
      description: 'Explore historical sites with our interactive 3D maps and timelines.'
    },
    {
      icon: <FiBookOpenIcon className="w-8 h-8" />,
      title: 'Rich Stories',
      description: 'Discover untold stories from African history and culture.'
    },
    {
      icon: <FiGlobeIcon className="w-8 h-8" />,
      title: 'Global Perspective',
      description: 'Connect with a community of history enthusiasts worldwide.'
    },
    {
      icon: <FiClockIcon className="w-8 h-8" />,
      title: 'Timeline Explorer',
      description: 'Navigate through different historical periods with our interactive timeline.'
    },
    {
      icon: <FiMessageSquareIcon className="w-8 h-8" />,
      title: 'AI Chat',
      description: 'Ask questions and get detailed answers about African history.'
    },
    {
      icon: <FiAwardIcon className="w-8 h-8" />,
      title: 'Educational',
      description: 'Perfect for students, educators, and history buffs of all ages.'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  if (!isVisible) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-sand to-white dark:from-deep-charcoal dark:to-gray-900 font-sans overflow-x-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-sunset-amber/5 to-savannah-gold/5 rounded-full filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-royal-indigo/5 to-emerald/5 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-sunset-amber/5 to-transparent rounded-full"></div>
      </div>

      {/* New Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="text-gradient">Experience History</span> Like Never Before
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with authentic storytelling to bring African history to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-12 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="col-span-12 md:col-span-6 lg:col-span-4">
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sunset-amber/5 to-savannah-gold/5 -z-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Explore African History?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of history enthusiasts and be the first to access exclusive content and features.
            </p>
            
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sunset-amber focus:border-transparent"
                  required
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-sunset-amber to-terracotta text-white font-medium rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Get Started
                  <FiArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </form>
            
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <FiCheckCircleIcon className="w-4 h-4 mr-2 text-emerald-500" />
                No credit card required
              </div>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center">
                <FiCheckCircleIcon className="w-4 h-4 mr-2 text-emerald-500" />
                Free 14-day trial
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-charcoal text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sunset-amber to-savannah-gold flex items-center justify-center text-white font-bold">
                  H
                </div>
                <span className="text-xl font-display font-bold text-white">HISTORIA AI</span>
              </div>
              <p className="text-sm text-gray-400">
                Preserving the past. Empowering the future through the power of AI and storytelling.
              </p>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <h4 className="text-white font-medium mb-4">Explore</h4>
              <ul className="space-y-2">
                {['Home', 'Timeline', 'AR Tour', 'Stories'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Blog', 'Documentation', 'Guides', 'API'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <h4 className="text-white font-medium mb-4">Connect</h4>
              <p className="text-sm text-gray-400 mb-4">
                Follow us on social media for the latest updates and stories.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                    aria-label={social}
                  >
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} HISTORIA AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
