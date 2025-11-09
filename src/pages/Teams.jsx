import React from 'react';
import { motion } from 'framer-motion';

export default function Teams() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-12">Teams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Team cards will go here */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
            <div className="w-20 h-20 bg-gray-700 rounded-full mb-4 mx-auto"></div>
            <h3 className="text-xl font-bold text-white text-center mb-2">Team Phoenix</h3>
            <p className="text-gray-400 text-center mb-4">Valorant, Apex Legends</p>
            <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">View Profile</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
