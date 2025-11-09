import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaTrophy, FaUsers, FaGamepad } from 'react-icons/fa';
import { motion, useAnimation, useInView } from 'framer-motion';

export default function Hero() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const stats = [
    { value: '50K+', label: 'Active Players', icon: <FaUsers className="w-6 h-6" /> },
    { value: '500+', label: 'Tournaments', icon: <FaTrophy className="w-6 h-6" /> },
    { value: '10+', label: 'Games', icon: <FaGamepad className="w-6 h-6" /> },
  ];

  return (
    <section className="relative pt-28 md:pt-40 pb-20 md:pb-32 overflow-hidden min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/80 to-gray-900"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-purple-600/30 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -right-20 w-60 h-60 bg-blue-600/30 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-pink-600/30 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            className="text-center lg:text-left pt-16 md:pt-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            ref={ref}
          >
            {/* Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="tracking-widest">LIVE TOURNAMENTS</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              variants={itemVariants}
            >
              Compete,{' '}
              <span className="block sm:inline">
                Connect,{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                  Conquer
                </span>
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              variants={itemVariants}
            >
              Join the ultimate gaming platform for competitive esports tournaments and connect with players worldwide.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 mb-16"
            >
              <Link
                to="/register"
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>Join The Arena</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link
                to="/tournaments"
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>Explore Tournaments</span>
                <FaPlay className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="relative p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-purple-500/50 transition-colors duration-300 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div key={index} className="text-center p-2 sm:p-3 bg-gray-800/50 rounded-lg">
                      <div className="text-purple-400 mb-1 flex justify-center">
                        {React.cloneElement(stat.icon, { className: 'w-4 h-4 sm:w-6 sm:h-6' })}
                      </div>
                      <div className="text-lg sm:text-2xl font-bold text-white leading-tight">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div 
            className="relative h-64 sm:h-80 lg:h-[500px] mt-12 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1 h-2 bg-gray-400 rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
