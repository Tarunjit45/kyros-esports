import React from 'react';
import { motion } from 'framer-motion';

export default function ValorantPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">VALORANT</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Compete in high-stakes VALORANT tournaments and climb the ranks. Join our competitive community today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">Join Tournament</button>
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-colors">
                View Leaderboard
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl transform rotate-6"></div>
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4">Upcoming Matches</h3>
                {/* Match cards will go here */}
                <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-700 rounded-full mr-3"></div>
                      <span className="text-white">Team Alpha</span>
                    </div>
                    <span className="px-3 py-1 bg-gray-700 text-sm rounded">VS</span>
                    <div className="flex items-center">
                      <span className="text-white mr-3">Team Omega</span>
                      <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">Today, 8:00 PM EST</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-display font-bold text-white mb-8">Tournaments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tournament cards will go here */}
            <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 rounded-xl p-6 border border-red-900/30 hover:border-red-500/50 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">VALORANT Champions</h3>
              </div>
              <p className="text-gray-400 mb-6">Monthly championship series with a $50,000 prize pool</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">32 Teams</span>
                <span className="text-sm text-gray-400">Starts in 2d 5h</span>
                <button className="text-red-400 hover:text-red-300 text-sm font-medium">Register →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
