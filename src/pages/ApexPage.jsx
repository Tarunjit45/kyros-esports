import React from 'react';
import { motion } from 'framer-motion';

export default function ApexPage() {
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">APEX LEGENDS</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Battle it out in the Apex Games. Compete in tournaments and prove you're the champion of the Outlands.
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 rounded-2xl transform rotate-6"></div>
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4">Featured Match</h3>
                <div className="aspect-w-16 aspect-h-9 bg-gray-900/50 rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 flex items-center justify-center">
                    <span className="text-gray-400">Match Preview</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Next match in: 2h 30m</span>
                  <button className="text-sm text-blue-400 hover:text-blue-300">Watch Live</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-display font-bold text-white mb-8">Tournaments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl p-6 border border-blue-900/30 hover:border-blue-500/50 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Apex Global Series</h3>
              </div>
              <p className="text-gray-400 mb-6">Monthly championship series with a $75,000 prize pool</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">64 Teams</span>
                <span className="text-sm text-gray-400">Starts in 5d 12h</span>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Register →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
