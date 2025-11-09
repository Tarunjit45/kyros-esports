import React from 'react';
import { motion } from 'framer-motion';

export default function Tournaments() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">Tournaments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tournament cards will go here */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors duration-300">
            <h3 className="text-xl font-bold text-white mb-2">Valorant Championship</h3>
            <p className="text-gray-400 mb-4">Join the ultimate Valorant tournament with a $10,000 prize pool.</p>
            <button className="btn-primary">Register Now</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
