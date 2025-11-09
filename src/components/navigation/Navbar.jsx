import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaBars, FaTimes, FaGamepad, FaTrophy, FaUsers, FaCalendarAlt, FaChevronDown } from 'react-icons/fa';

const NavLink = ({ to, children, className = '', hasDropdown = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const controls = useAnimation();
  
  return (
    <Link 
      to={to} 
      className={`relative group ${className} flex items-center`}
      onMouseEnter={() => controls.start('hover')}
      onMouseLeave={() => controls.start('initial')}
    >
      <motion.span 
        className="relative z-10 flex items-center"
        variants={{
          initial: { y: 0 },
          hover: { y: -2 }
        }}
        animate={controls}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {children}
        {hasDropdown && (
          <motion.span
            className="ml-1"
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronDown className="w-3 h-3" />
          </motion.span>
        )}
      </motion.span>
      <motion.span 
        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
        initial={{ width: 0, opacity: 0 }}
        animate={{ 
          width: isActive ? '100%' : 0,
          opacity: isActive ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
      <motion.span 
        className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"
      />
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsGamesOpen(false);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [scrolled]);

  const navItems = [
    { name: 'Home', path: '/', icon: <FaGamepad className="mr-2" /> },
    { name: 'Tournaments', path: '/tournaments', icon: <FaTrophy className="mr-2" /> },
    { name: 'Teams', path: '/teams', icon: <FaUsers className="mr-2" /> },
    { name: 'Events', path: '/events', icon: <FaCalendarAlt className="mr-2" /> },
  ];

  const gameItems = [
    { name: 'Valorant', path: '/valorant', color: 'from-red-500 to-pink-500' },
    { name: 'League of Legends', path: '/lol', color: 'from-yellow-500 to-orange-500' },
    { name: 'Apex Legends', path: '/apex', color: 'from-blue-400 to-indigo-600' },
    { name: 'CODM', path: '/codm', color: 'from-green-500 to-emerald-500' },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group ml-0 mr-auto">
            <motion.div 
              className="w-14 h-14 flex-shrink-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -5, 5, -5, 0],
                transition: { 
                  rotate: { 
                    duration: 0.5,
                    ease: 'easeInOut'
                  }
                } 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img 
                src="/Kyros-logo.jpg" 
                alt="KYROS ESPORTS" 
                className="w-full h-full object-contain p-1"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop if both images fail to load
                  e.target.src = '/kyros-logo.png';
                }}
              />
            </motion.div>
            <motion.div className="ml-3 overflow-hidden">
              <motion.span 
                className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-300% animate-gradient"
                style={{ textShadow: '0 2px 10px rgba(168, 85, 247, 0.3)' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  backgroundPosition: '100% 50%'
                }}
                transition={{ 
                  x: { duration: 0.5, ease: 'easeOut' },
                  backgroundPosition: { 
                    duration: 6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'linear'
                  }
                }}
              >
                KYROS ESPORTS
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 flex-wrap">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
              >
                <NavLink
                  to={item.path}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 mx-1"
                >
                  <span className="flex items-center">
                    <span className="mr-2 text-purple-400">{item.icon}</span>
                    {item.name}
                  </span>
                </NavLink>
              </motion.div>
            ))}
            
            {/* Games Dropdown */}
            <motion.div 
              className="relative" 
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => setIsGamesOpen(!isGamesOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-800/30 hover:bg-gray-700/50 rounded-lg transition-all duration-200 mx-1"
              >
                <FaGamepad className="mr-2 text-purple-400" />
                <span>Games</span>
                <motion.span 
                  animate={{ rotate: isGamesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2"
                >
                  <FaChevronDown className="w-3 h-3" />
                </motion.span>
              </motion.button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {isGamesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="absolute right-0 mt-2 w-56 origin-top-right bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl ring-1 ring-white/10 overflow-hidden z-50"
                  >
                    <div className="py-1">
                      {gameItems.map((game) => (
                        <motion.div
                          key={game.name}
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Link
                            to={game.path}
                            className={`group flex items-center px-4 py-3 text-sm transition-all duration-200 ${
                              location.pathname === game.path
                                ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 text-white'
                                : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                            }`}
                            onClick={() => {
                              setIsGamesOpen(false);
                              setIsOpen(false);
                            }}
                          >
                            <span className={`w-2 h-2 rounded-full mr-3 ${game.color.replace('from-', 'bg-').split(' ')[0]}`}></span>
                            {game.name}
                            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </nav>

          {/* Join Now Button */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
          >
            <a 
              href="https://discord.gg/K8ynexKn5f" 
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center px-6 py-3 overflow-hidden text-sm font-medium text-white transition-all duration-300 rounded-xl group"
            >
              {/* Animated gradient background */}
              <motion.span 
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-[length:200%_100%] group-hover:bg-[length:100%_100%] transition-all duration-500"
                initial={{ backgroundPosition: '100% 0%' }}
                animate={{ backgroundPosition: '0% 0%' }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
              />
              
              {/* Shine effect on hover */}
              <motion.span 
                className="absolute top-0 left-0 w-8 h-full -translate-x-12 -skew-x-12 bg-white/20 group-hover:translate-x-[200px] transition-transform duration-700"
                initial={{ x: -100 }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center">
                <span className="mr-2 font-semibold tracking-wide">Join Now</span>
                <motion.span 
                  className="inline-flex items-center justify-center"
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.span>
              </span>
              
              {/* Ripple effect on click */}
              <motion.span 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                }}
              />
            </a>
            
            {/* Subtle shadow */}
            <motion.div 
              className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-purple-700/30 to-blue-700/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0.9, opacity: 0 }}
              whileHover={{ scale: 1.05, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
          </motion.div>

          {/* Mobile menu button */}
          <motion.div className="md:hidden flex items-center z-50" variants={item}>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none transition-colors duration-200"
              aria-expanded="false"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="h-6 w-6" aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="h-6 w-6" aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-40 pt-20 overflow-y-auto"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <motion.div 
              className="px-4 py-2 space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.1 + (index * 0.05),
                    type: 'spring',
                    stiffness: 300,
                    damping: 25
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <NavLink
                    to={item.path}
                    className="block px-4 py-4 rounded-lg text-lg font-medium text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors duration-200 mx-2"
                  >
                    <span className="flex items-center">
                      <span className="mr-4 text-purple-400">{item.icon}</span>
                      {item.name}
                    </span>
                  </NavLink>
                </motion.div>
              ))}
              
              {/* Mobile Games Dropdown */}
              <div className="px-3 py-2">
                <button 
                  onClick={() => setIsGamesOpen(!isGamesOpen)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-md text-base font-medium text-left text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors duration-200"
                >
                  <span className="flex items-center">
                    <FaGamepad className="mr-3 text-purple-400" />
                    Games
                  </span>
                  <motion.span 
                    animate={{ rotate: isGamesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>
                
                <AnimatePresence>
                  {isGamesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 mt-1 space-y-1"
                    >
                      {gameItems.map((game) => (
                        <motion.div
                          key={game.name}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => {
                            setIsGamesOpen(false);
                            setIsOpen(false);
                          }}
                        >
                          <Link
                            to={game.path}
                            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-800/30 hover:text-white transition-colors duration-200 flex items-center"
                          >
                            <span className={`w-2 h-2 rounded-full mr-3 ${game.color.replace('from-', 'bg-').split(' ')[0]}`}></span>
                            {game.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <motion.div 
                className="relative group mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Link 
                  to="/join"
                  className="relative block w-full px-4 py-3 text-base font-medium text-center text-white transition-all duration-300 rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  {/* Gradient background */}
                  <motion.span 
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  />
                  
                  {/* Shine effect */}
                  <motion.span 
                    className="absolute top-0 left-0 w-8 h-full -translate-x-12 -skew-x-12 bg-white/20 group-hover:translate-x-[200px] transition-transform duration-700"
                    initial={{ x: -100 }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  />
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center">
                    <span className="font-semibold">Join Now</span>
                    <motion.span 
                      className="ml-2"
                      animate={{
                        x: [0, 4, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.span>
                  </span>
                </Link>
                
                {/* Subtle shadow */}
                <motion.div 
                  className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-purple-700/30 to-blue-700/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Animated Border Bottom */}
      <motion.div 
        className="h-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
    </motion.header>
  );
};

export default Navbar;
