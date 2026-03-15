import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';

import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Only track sections on the homepage
    if (pathname !== '/') return;

    const observers = [];
    const sections = ['gallery', 'stories', 'home', 'vendors'];

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id === 'home' ? '' : `#${id}`);
            }
          },
          { threshold: 0.5 } // Trigger when 50% of the section is visible
        );
        observer.observe(element);
        observers.push(() => observer.disconnect());
      }
    });

    return () => {
      observers.forEach((disconnect) => disconnect());
    };
  }, [pathname]);

  const handleLogout = () => {
    logout();
    navigate({ to: '/' });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Vendors', path: '/vendors' },
    { name: 'Gallery', path: '/#gallery' },
    { name: 'Stories', path: '/#stories' },
    { name: 'Contact', path: '/#contact' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12 h-16 pointer-events-none"
    >
      <div className="relative w-full h-full flex items-center justify-between">
        {/* Left Logo/Button */}
        <Link 
          to="/"
          className="w-12 h-12 rounded-full lux-glass flex items-center justify-center text-white pointer-events-auto hover:bg-white/10 transition-colors shrink-0"
        >
          <Heart className="w-5 h-5" />
        </Link>
  
        {/* Center Navigation - Absolute positioning ensures perfect centering regardless of side content widths */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-8 lux-glass rounded-full px-8 py-3 pointer-events-auto backdrop-blur-md">
          {navLinks.map((link) => {
            // Check if active: Exact match for home, starts-with for other pages, or matching hash
            const isHashLink = link.path.includes('#');
            const basePath = isHashLink ? link.path.split('#')[0] : link.path;
            const linkHash = isHashLink ? link.path.split('#')[1] : '';
            
            let isActive = false;
            
            if (isHashLink) {
              // If we are clicking, location.hash updates. If we are scrolling, activeSection updates.
              isActive = location.hash === `#${linkHash}` || activeSection === `#${linkHash}`;
            } else if (basePath === '/') {
              isActive = pathname === '/' && !location.hash && !activeSection;
            } else {
              isActive = pathname.startsWith(basePath);
            }
            
            return (
              <Link 
                key={link.name} 
                to={basePath}
                hash={linkHash}
                className={`text-sm font-body transition-colors tracking-wide relative pb-1
                  ${isActive ? 'text-rose-300' : 'text-white/80 hover:text-white'}`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rose-300 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>
  
        {/* Right CTA */}
        <div className="flex items-center gap-4 pointer-events-auto shrink-0">
          {user ? (
            <>
              <Link 
                to="/dashboard"
                className="text-white hover:text-rose-300 font-body transition-colors"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="text-white/60 hover:text-white font-body transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="text-white hover:text-rose-300 font-body transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/signup"
                className="text-white hover:text-rose-300 font-body transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
          <Link 
            to="/vendors"
            className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-3 rounded-full text-sm font-medium font-body transition-colors shadow-lg shadow-rose-500/20"
          >
            Plan Your Wedding
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
