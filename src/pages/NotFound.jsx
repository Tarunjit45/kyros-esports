import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-center px-4"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl opacity-20 blur-3xl"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 sm:p-12">
            <div className="text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
              404
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Page Not Found</h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all transform hover:-translate-y-0.5"
              >
                Return Home
              </Link>
              <a 
                href="#" 
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg border border-gray-700 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.back();
                }}
              >
                Go Back
              </a>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-800">
              <p className="text-gray-500 text-sm">
                Need help?{' '}
                <a href="mailto:support@kyrosesports.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
