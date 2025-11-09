import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create a query for events, ordered by date
    const q = query(
      collection(db, 'events'),
      orderBy('date', 'asc')  // Assuming you have a 'date' field in your events
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push({ id: doc.id, ...doc.data() });
        });
        setUpcomingEvents(events);
        setLoading(false);
      },
      (err) => {
        console.error('Error getting events:', err);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    );

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-12">Upcoming Events</h1>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            <p className="mt-2 text-gray-400">Loading events...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg">
            {error}
          </div>
        ) : upcomingEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No upcoming events found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-colors group"
            >
              <div className="h-48 bg-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-full mb-2">
                    {event.game}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-sm text-gray-400">Date</div>
                    <div className="font-medium text-white">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Time</div>
                    <div className="font-medium text-white">{event.time} EST</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Prize</div>
                    <div className="font-medium text-yellow-400">{event.prize}</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-sm text-gray-400">{event.participants} Teams</span>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Register Now
                  </button>
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-display font-bold text-white mb-4">Want to host your own event?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Join our partner program and host tournaments for your community with our support and infrastructure.
          </p>
          <button className="px-6 py-3 bg-transparent border-2 border-purple-600 text-purple-400 hover:bg-purple-600/20 rounded-lg font-medium transition-colors">
            Become a Partner
          </button>
        </div>
      </div>
    </motion.div>
  );
}
